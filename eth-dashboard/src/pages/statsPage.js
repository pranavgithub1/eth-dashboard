import React from "react";
import Dataset from "../components/Dataset";
import DrawerSelect from "../components/DrawerSelect";
import StatsBoard from "../components/StatsBoard"
import TopBar from "../components/TopBar";
const statsPage = () => {
    return(
        <div>
            
            <DrawerSelect/>
            <div style={{width:'90%',marginLeft:'10%'}}>
                <TopBar title="Ethereum Stats" />
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