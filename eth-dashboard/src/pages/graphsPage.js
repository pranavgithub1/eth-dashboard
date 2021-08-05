import React from "react";
import DrawerSelect from "../components/DrawerSelect";
import GraphsBoard from "../components/GraphsBoard";
import TopBar from "../components/TopBar";
const graphsPage = () => {
    
    return(
        <div>
            <DrawerSelect/>
            <div style={{width:'90%',marginLeft:'10%'}}>
                <TopBar title="Ethereum Graphs" />
                <GraphsBoard/>
            </div>
        </div>
    )
}

export default graphsPage