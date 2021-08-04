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
            
        </div>
    )
}

export default statsPage