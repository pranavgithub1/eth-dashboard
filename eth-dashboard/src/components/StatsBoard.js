import React, { useState, useEffect } from "react";
import coingecko from "../apis/coingecko";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StatBox from "./StatBox";

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
            // console.log(response.data);
            setStats([
                ["Price",response.data.market_data.current_price.usd,"$"],
                ["Mkt Cap",response.data.market_data.market_cap.usd,"$"],
                ["Mkt Cap Rank",response.data.market_data.market_cap_rank],
                ["Total Volume",response.data.market_data.total_volume.usd,"$"],
                ["Price Change 24h",response.data.market_data.price_change_24h_in_currency.usd,"$"],
                ["Price Change % 24h",response.data.market_data.price_change_percentage_24h_in_currency.usd,"%"],
                ["Interest Score",response.data.public_interest_score],
                ["Alexa Rank",response.data.public_interest_stats.alexa_rank],
                ["Avg Reddit Posts (48h)",response.data.community_data.reddit_average_posts_48h]
            ])
            // console.log(stats);
            setIsLoading(false);
        }
        fetchData();
    },[]);
    const renderStats = () => {
        if(isLoading) {
            return <div>Loading ...</div>
        }
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {stats.map((stat) => (
                        <StatBox key={stats.indexOf(stat)} stat={stat} />
                    ))}
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