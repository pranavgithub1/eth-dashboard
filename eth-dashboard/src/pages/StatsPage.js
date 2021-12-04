import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Dataset from "../components/Dataset";
import DrawerSelect from "../components/DrawerSelect";
import StatsBoard from "../components/StatsBoard"
import TopBar from "../components/TopBar";
import { useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles(theme=>({
    containerDiv: {
        marginLeft: '121.9px',
        ['@media (max-width:600px)']: { 
            marginLeft: '60px'
        }
    },
    a: {
        color: theme.palette.primary.light
    }
}));
const StatsPage = () => {
    const theme = useTheme();
    const classes = useStyles();
    return(
        <div>
            
            <DrawerSelect/>
            <div 
            className={classes.containerDiv}
            >
                <TopBar title="Ethereum Stats" />
                <StatsBoard/>
                <Dataset/>
            </div>
            <p style={{textAlign:'center',color:'gray'}}>
                Powered by <a href="https://www.coingecko.com/api/documentations/v3" className={classes.a}>CoinGecko</a> and <a href="https://docs.glassnode.com/" className={classes.a} >Glassnode</a> APIs
            </p>
        </div>
    )
}

export default StatsPage