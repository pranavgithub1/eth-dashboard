import React from "react";
import Dataset from "../components/Dataset";
import StatsBoard from "../components/StatsBoard"
import TopBar from "../components/TopBar";
const statsPage = () => {
    return(
        <div>
            <TopBar title="Ethereum Stats" />
            <div style={{flexGrow:1}}>
            <StatsBoard/>
            <Dataset/>
            </div>
            <p style={{textAlign:'center',color:'gray'}}>
                Powered by <a href="https://www.coingecko.com/api/documentations/v3">CoinGecko</a> and <a href="https://docs.glassnode.com/">Glassnode</a> APIs
            </p>
        </div>
    )
}

export default statsPage