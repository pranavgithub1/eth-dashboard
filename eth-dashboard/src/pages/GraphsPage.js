import React from "react";
import DrawerSelect from "../components/DrawerSelect";
import GraphsBoard from "../components/GraphsBoard";
import TopBar from "../components/TopBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    containerDiv: {
        marginLeft: '121.9px',
        ['@media (max-width:600px)']: { 
            marginLeft: '60px'
        }
    }
});
const GraphsPage = () => {
    const classes = useStyles();
    return(
        <div>
            <DrawerSelect/>
            <div className={classes.containerDiv}>
                <TopBar title="Ethereum Graphs" />
                <GraphsBoard/>
            </div>
        </div>
    )
}


export default GraphsPage