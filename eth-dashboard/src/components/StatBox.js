import React from "react";
// import { Grid, Card,CardHeader,CardContent,Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const StatBox = ({stat}) => {
    const renderStat = (stat) => {
        if(stat.length>2){
            if(stat[2]==="$"){
                return `$ ${stat[1]}`
            }
            if(stat[2]==="%"){
                return `${stat[1]} %`
            }
        }
        return `${stat[1]}`
    }
    return(
        <Grid item xs={4}>
            <Card >
                <CardHeader
                    title={stat[0]}
                />
                <CardContent>
                    <Typography variant="h3" style={{color:stat[1]<0?'#f44336':'#4caf50',fontWeight:'bold'}} gutterBottom>
                        {renderStat(stat)}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default StatBox