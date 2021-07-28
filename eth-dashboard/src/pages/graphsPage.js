import React from "react";
import GraphsBoard from "../components/GraphsBoard";
import TopBar from "../components/TopBar";
const graphsPage = () => {
    
    return(
        <div>
            <TopBar title="Ethereum Graphs" />
            <GraphsBoard/>
        </div>
    )
}

export default graphsPage