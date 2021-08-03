const db = require('./db');
const gn = require('./apis/addresses_gn');
const googleTrends = require('google-trends-api');
var cfg = require('../../config');
const average = (array) => array.reduce((a, b) => a + b) / array.length;
const unpack = (array,col) => array.map(obj => obj[col]);
const calcDoublingTime = (results,leftovers,val,now,col) => {
    let matches = leftovers.filter(obj => obj["v"]<=val/2);
    if(matches.length>0){
        return Math.floor((now-matches[matches.length-1]["t"])/86400);
    }
    matches = results.filter(obj => obj[col]<=val/2)
    if(matches.length>0){
        return Math.floor((now-matches[matches.length-1]["unix_timestamp"])/86400);
    }
    return 0;
}
const calcHalvingTime = (results,leftovers,val,now,col) => {
    let matches = leftovers.filter(obj => obj["v"]>=val*2);
    if(matches.length>0){
        return Math.floor((now-matches[matches.length-1]["t"])/86400);
    }
    matches = results.filter(obj => obj[col]>=val*2)
    if(matches.length>0){
        return Math.floor((now-matches[matches.length-1]["unix_timestamp"])/86400);
    }
    return 0;
}
function pearson(x, y){
	let avg = (list) => { return list.reduce((s, a) => s + a, 0) / list.length };
	let n = x.length, avg_x = avg(x) , avg_y = avg(y);
	return (x.map( (e, i, r) => (r = {x:e, y:y[i]}) ).reduce( (s, a) => s + a.x * a.y, 0) - n * avg_x * avg_y) / 
	((Math.sqrt(x.reduce( (s, a) => (s + a * a) , 0) - n * avg_x * avg_x)) *
	(Math.sqrt(y.reduce( (s, a) => (s + a * a) , 0) - n * avg_y * avg_y)));
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const update = async () => {
    let now = Math.floor(Date.now()/1000);
    let results = await db.all().catch(err => console.log(err));
    let last = results[results.length-1].unix_timestamp;
    let template = Object.assign({},results[0]);
    const btc_prices = await gn.get("/market/price_usd_close",{
        params: {
            a: 'BTC',
            s: last-(86400*5),
            u: now,
            i: '24h',
            api_key: cfg.api_key
        }
    });
    const eth_prices = await gn.get("/market/price_usd_close",{
        params: {
            a: 'ETH',
            s: last-(86400*5),
            u: now,
            i: '24h',
            api_key: cfg.api_key
        }
    });
    let trends_btc = await googleTrends.interestOverTime({keyword: 'Bitcoin',startTime: new Date(1468713600*1000)})
    .catch(err => {
        console.log(err);
    });
    trends_btc = JSON.parse(trends_btc);
    let trends_eth = await googleTrends.interestOverTime({keyword: 'Ethereum',startTime: new Date(1468713600*1000)})
    .catch(err => {
        console.log(err);
    });
    trends_eth = JSON.parse(trends_eth);
    const new_eth_wallets = await gn.get("/addresses/new_non_zero_count",{
        params: {
            a: 'ETH',
            s: last-(86400*5),
            u: now,
            i: '24h',
            api_key: cfg.api_key
        }
    });
    const active_eth_wallets = await gn.get("/addresses/active_count", {
        params: {
            a: 'ETH',
            s: last-(86400*5),
            u: now,
            i: '24h',
            api_key: cfg.api_key
        }
    });
    const total_eth_wallets = await gn.get("/addresses/count",{
        params: {
            a: 'ETH',
            s: last-(86400*5),
            u: now,
            i: '24h',
            api_key: cfg.api_key
        }
    });
    const eth_supply = await gn.get("/supply/current",{
        params: {
            a: 'ETH',
            s: last-(86400*5),
            u: now,
            i: '24h',
            api_key: cfg.api_key
        }
    });
    //-------------------------------------------------------------------------------------//
    let maxBtcSma = Math.max(...results.map(obj => obj["btc_sma"]));
    let minBtcSma = Math.min(...results.map(obj => obj["btc_sma"]));
    let maxEthSma = Math.max(...results.map(obj => obj["eth_sma"]));
    let minEthSma = Math.min(...results.map(obj => obj["eth_sma"]));
    let maxEthNew = Math.max(...results.map(obj => obj["new_eth_wallets_sma"]));
    let minEthNew = Math.min(...results.map(obj => obj["new_eth_wallets_sma"]));
    let index = 6;
    let rows = [];
    now = eth_prices.data[eth_prices.data.length-1]["t"];
    // console.log(last);
    // console.log(now);
    // console.log(active_eth_wallets.data)
    // console.log(btc_prices.data)
    // console.log(eth_prices.data)
    while(last<now){
        let row = Object.assign({},template);
        last += 86400;
        row.unix_timestamp = last;
        let d = new Date(last*1000);
        let dnum = last + d.getTimezoneOffset()*60;
        d = new Date(last*1000 + d.getTimezoneOffset()*60000);
        row.date = d.toLocaleDateString();

        row.btc_price = btc_prices.data[index]["v"];
        row.btc_sma = average(btc_prices.data.slice(index-6,index+1).map(obj=>obj["v"]));
        row.btc_sma_norm = (row.btc_sma/(Math.max(maxBtcSma,Math.max(...unpack(rows,"btc_sma")))-Math.min(minBtcSma,Math.min(...unpack(rows,"btc_sma")))))*1000;

        row.eth_price = eth_prices.data[index]["v"];
        row.eth_sma = average(eth_prices.data.slice(index-6,index+1).map(obj=>obj["v"]));
        row.eth_sma_norm = (row.eth_sma/(Math.max(maxEthSma,Math.max(...unpack(rows,"eth_sma")))-Math.min(minEthSma,Math.min(...unpack(rows,"eth_sma")))))*1000;

        row.price_ratio = row.btc_price / row.eth_price;
        row.price_ratio_scaled = row.btc_sma / row.eth_sma;
        // console.log((trends_btc.default.timelineData.filter(obj => obj["time"]===(row.unix_timestamp - ((new Date(row.unix_timestamp*1000)).getDay()*86400)-86400).toString()))[0]);
        // console.log(row.unix_timestamp - ((new Date(row.unix_timestamp*1000)).getDay()*86400)-86400);
        // console.log(trends_btc.default.timelineData.slice().reverse());
        console.log((dnum - ((new Date(dnum*1000)).getDay()*86400)).toString());
        row.btc_google_trends_scaled = 
            trends_btc.default.timelineData
            .filter(obj => Math.abs(parseInt(obj["time"])-(dnum - ((new Date(dnum*1000)).getDay()*86400)))<=86400)
            [0]["value"][0] * 10;
        
        row.eth_google_trends_scaled = 
            trends_eth.default.timelineData
            .filter(obj => Math.abs(parseInt(obj["time"])-(dnum - ((new Date(dnum*1000)).getDay()*86400)))<=86400)
            [0]["value"][0] * 10;
        
        row.new_eth_wallets = new_eth_wallets.data[index]["v"];
        row.new_eth_wallets_sma = average(new_eth_wallets.data.slice(index-6,index+1).map(obj=>obj["v"]));
        row.new_eth_wallets_scaled = (row.new_eth_wallets_sma / (Math.max(maxEthNew,Math.max(...unpack(rows,"new_eth_wallets_sma")))-Math.min(minEthNew,Math.min(...unpack(rows,"new_eth_wallets_sma")))))*1000;
        
        row.active_eth_wallets = active_eth_wallets.data[index]["v"];
        row.active_eth_wallets_sma = average(active_eth_wallets.data.slice(index-6,index+1).map(obj=>obj["v"]));

        row.total_eth_wallets = total_eth_wallets.data[index]["v"];
        row.total_eth_wallets_sma = average(total_eth_wallets.data.slice(index-6,index+1).map(obj=>obj["v"]));

        row.active_wallet_ratio = row.active_eth_wallets_sma / row.total_eth_wallets_sma;
        
        row.btc_doubling_time = calcDoublingTime(results,unpack(rows,"btc_sma_norm"),row.btc_sma_norm,row.unix_timestamp,"btc_sma_norm");
        row.btc_halving_time = calcHalvingTime(results,unpack(rows,"btc_sma_norm"),row.btc_sma_norm,row.unix_timestamp,"btc_sma_norm");
        row.btc_velocity_sma = (rows.length===0)?row.btc_sma_norm - results[results.length-1]["btc_sma_norm"]:row.btc_sma_norm - rows[rows.length-1]["btc_sma_norm"];
        row.btc_acceleration_sma = (rows.length===0)?row.btc_velocity_sma - results[results.length-1]["btc_velocity_sma"]:row.btc_velocity_sma - rows[rows.length-1]["btc_velocity_sma"];
        
        row.eth_doubling_time = calcDoublingTime(results,unpack(rows,"eth_sma_norm"),row.eth_sma_norm,row.unix_timestamp,"eth_sma_norm");
        row.eth_halving_time = calcHalvingTime(results,unpack(rows,"eth_sma_norm"),row.eth_sma_norm,row.unix_timestamp,"eth_sma_norm");
        row.eth_velocity_sma = (rows.length===0)?row.eth_sma_norm - results[results.length-1]["eth_sma_norm"]:row.eth_sma_norm - rows[rows.length-1]["eth_sma_norm"];
        row.eth_acceleration_sma = (rows.length===0)?row.eth_velocity_sma - results[results.length-1]["eth_velocity_sma"]:row.eth_velocity_sma - rows[rows.length-1]["eth_velocity_sma"];

        let aw = unpack(results,"active_eth_wallets_sma").concat(unpack(rows,"active_eth_wallets_sma"));
        let p = unpack(results,"eth_sma").concat(unpack(rows,"eth_sma"));
        // if(index==6) {console.log(aw.slice().reverse());console.log("this")}
        // console.log(row.date)
        // console.log(aw.slice(aw.length-7,aw.length).map(val => Math.log10(val)));
        // console.log( p.slice(p.length-7,p.length) );
        // console.log(p.slice(p.length-7,p.length));
        row.eth_awpc = pearson( aw.slice(aw.length-7,aw.length).map(val => Math.log10(val)) , p.slice(p.length-7,p.length));
        
        let nw = unpack(results,"new_eth_wallets_sma").concat(unpack(rows,"new_eth_wallets_sma"));
        // p = unpack(results,"eth_sma").concat(unpack(rows,"eth_sma"));
        row.eth_nwpc = pearson(nw.slice(nw.length-7,nw.length).map(val => Math.log10(val)) , p.slice(p.length-7,p.length));
        row.eth_acp = Math.min(row.eth_nwpc,row.eth_awpc)>0.8? row.eth_sma : 0;
        
        row.eth_supply = eth_supply.data[index]["v"];
        row.eth_supply_sma = average(eth_supply.data.slice(index-6,index+1).map(obj=>obj["v"]));
        row.eth_metcalfe_predicted = 2.71828 * 100 * Math.pow(row.active_eth_wallets_sma,1.5)/row.eth_supply_sma;
        
        m = unpack(results,"eth_metcalfe_predicted").concat(unpack(rows,"eth_metcalfe_predicted"));
        row.eth_metcalfe_sma = average(m.slice(m.length-7,m.length));
        rows.push(row);
        // console.log(index);
        // console.log(last);
        // console.log(index);
        index++;
    }
    // console.log(rows.map(obj => Object.values(obj)));
    // console.log("len");
    // console.log(Object.keys(rows[0]));
    // console.log(Object.keys(rows[0]).length);
    let u = await db.update(rows);
};

module.exports = update;