import React from "react";
// import { Grid, Card,CardHeader,CardContent,Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
    headerTitle: {
      fontSize: '1.5vw'
    }
});
const StatBox = ({stat}) => {
    const classes = useStyles();
    const renderStat = (stat) => {
        if(stat.length>2){
            if(stat[2]==="$"){
                // if(stat[1]>1000000000) return `$ ${new Intl.NumberFormat('en-US',{style: 'decimal',maximumFractionDigits: 3,notation:"compact"}).format(stat[1])}`
                return `$ ${new Intl.NumberFormat('en-US',{style: 'decimal',maximumFractionDigits: 3,}).format(stat[1])}`
            }
            if(stat[2]==="%"){
                return `${stat[1]} %`
            }
        }
        return `${stat[1]}`
    }
    return(
        <Grid item md={4} xs={6}>
            <Card >
                <CardHeader
                    title={stat[0]}
                    classes={{
                        title: classes.headerTitle
                    }}
                />
                <CardContent>
                    <Typography variant="h3" style={{color:stat[1]<0?'#f44336':'#4caf50',fontWeight:'bold',fontSize: '2.75vw'}} gutterBottom>
                        {renderStat(stat)}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default StatBox