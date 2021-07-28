import React from "react";
import { Grid, Card,CardHeader,CardContent,Typography } from "@material-ui/core";

const StatBox = ({stat}) => {
    const renderStat = (stat) => {
        if(stat.length>2){
            if(stat[2]=="$"){
                return `$ ${stat[1]}`
            }
            if(stat[2]=="%"){
                return `${stat[1]} %`
            }
        }
        return `${stat[1]}`
    }
    return(
        <Grid item xs={4}>
            <Card>
                <CardHeader
                    title={stat[0]}
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {renderStat(stat)}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default StatBox