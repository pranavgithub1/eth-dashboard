import React, { useState, useEffect } from "react";
import coingecko from "../apis/coingecko";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StatBox from "./StatBox";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import update from "immutability-helper";

// const clean = (obj) => {
//     let res = [];
//     let marketData = false;
//     const cleanHelper = (o) =>{
//         Object.keys(o).forEach(key => {
//             if(typeof o[key] === 'object' && o[key]!=null) {
//                 console.log(key);
//                 if(key==='market_data') marketData=true;
//                 cleanHelper(o[key]);
//             }
//             else {
//                 res.push([key,o[key]]);
//             }
//         });
//     }
//     cleanHelper(obj);
//     return res;
// }

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        background: theme.palette.success.light
    }
}));
const StatsBoard = () => {
    const classes = useStyles();
    const [stats,setStats] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [statList,setStatList] = useState(
        (localStorage.getItem('statList')==null)?
        [
            "current_price","market_cap","market_cap_rank",
            "high_24h","low_24h","price_change_24h",
            "circulating_supply","Alexa Rank","Avg Reddit Posts (48h)"
        ] :
        JSON.parse(localStorage.getItem('statList'))
    );
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    const addStatBox = (value) => {
        setStatList((oldStatList)=>{
            return [...oldStatList,value];
        });
    }
    useEffect(()=>{
        try {
            localStorage.setItem('statList',JSON.stringify(statList))
        } catch(e){
            if(e.code==="22"||e.code==="1024"){
                alert('Local Storage Limit reached');
            }
        }
    },[statList])
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response  = await coingecko.get("/coins/ethereum/",{
                params: {
                    id: "ethereum",
                    localization: "false",
                    tickers: false
                }
            });
            console.log(response.data);
            // let allData = response.data;
            // let allStats = clean(allData);
            // console.log(allStats);
            let marketStats = Object.keys(response.data.market_data).map(key => ([key,response.data.market_data[key]]));
            console.log(marketStats);
            setStats([
                // ["Price",response.data.market_data.current_price.usd,"$"],
                // ["Mkt Cap",response.data.market_data.market_cap.usd,"$"],
                // ["Mkt Cap Rank",response.data.market_data.market_cap_rank],
                // ["Total Volume",response.data.market_data.total_volume.usd,"$"],
                // ["Price Change 24h",response.data.market_data.price_change_24h_in_currency.usd,"$"],
                // ["Price Change % 24h",response.data.market_data.price_change_percentage_24h_in_currency.usd,"%"],
                ["Interest Score",response.data.public_interest_score],
                ["Alexa Rank",response.data.public_interest_stats.alexa_rank],
                ["Avg Reddit Posts (48h)",response.data.community_data.reddit_average_posts_48h],
                ...marketStats,
                // title value unit 
            ])
            setIsLoading(false);
        }
        fetchData();
    },[]);
    // const moveCard = (dragIndex, hoverIndex) => {
    //     const dragCard = statList[dragIndex];
    //     setStatList(
    //       update(statList, {
    //         $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    //       })
    //     );
    // };
    const renderStats = () => {
        if(isLoading) {
            return <div>Loading ...</div>
        }
        return (
            <div className={classes.root}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Open Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {
                        stats.map((stat,idx)=>(
                            <MenuItem onClick={()=>{handleClose();addStatBox(stat[0]);}} key={"menu"+stat[0]+idx}>{stat[0]}</MenuItem>
                        ))
                    }
                </Menu>
                <Grid container spacing={3} >
                    {statList.map((statTitle) => {
                        let statArr = stats.find(elem=>elem[0]===statTitle);
                        if(statArr==null) return;
                        return <StatBox key={statTitle+"statBox"} stat={statArr} />
                    })}
                </Grid>
            </div>
        )
    }
    return(
        <div>
            {renderStats()}   
        </div>
    )
}

export default StatsBoard