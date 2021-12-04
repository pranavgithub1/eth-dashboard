import React, { useState, useEffect } from "react";
// import { Grid, Card,CardHeader,CardContent,Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme =>({
    headerTitle: {
      fontSize: '1.5vw'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 'auto',
      },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row'
    },
    fullCardHeight: {
        height:'100%',
        position: 'relative',
    },
    delIco : {
        position: "relative",
        bottom: "5px",
        right: "5px",
    }
}));
const StatBox = ({stat,delFunc}) => {
    const defaultValue = (
        (typeof stat[1]==='object'&&stat[1]!==null) &&
        ( stat[1]['usd'] ? 'usd': Object.keys(stat[1])[0] )
    );
    const [value,setValue] = useState(
        (typeof stat[1]==='object'&&stat[1]!==null)? 
        stat[1][defaultValue] : 
        stat[1]
    );
    const [currency,setCurrency] = useState(defaultValue);
    const classes = useStyles();

    const handleChange = (event) => {
        setCurrency(event.target.value);
        setValue(stat[1][event.target.value]);
    };
    const renderStat = (stat) => {
        if(stat.length>2){
            if(stat[2]==="$"){
                // if(stat[1]>1000000000) return `$ ${new Intl.NumberFormat('en-US',{style: 'decimal',maximumFractionDigits: 3,notation:"compact"}).format(stat[1])}`
                return `$ ${new Intl.NumberFormat('en-US',{style: 'decimal',maximumFractionDigits: 3,}).format(value)}`
            }
            if(stat[2]==="%"){
                return `${value} %`
            }
        }
        if(typeof value === 'string'){
            return new Date(value).toLocaleDateString('en-US');
        }
        // if(typeof stat[1]==='object'&&stat[1]!==null){
        //     return `${new Intl.NumberFormat('en',{style:'currency',currency:currency,maximumFractionDigits:2}).format(value)}`
        // }
        return `${new Intl.NumberFormat('en-US',{style: 'decimal',maximumFractionDigits: 2,}).format(value)}`
    }
    return(
        <Grid item md={4} xs={6}>
            <Card className={classes.fullCardHeight}>
                <CardHeader
                    title={
                        <Typography>
                            {stat[0]}
                        </Typography>
                    }
                    action={
                        <div>
                            {(typeof stat[1]==='object'&&stat[1]!==null) && <div>
                                <FormControl className={classes.formControl}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currency}
                                    onChange={handleChange}
                                    >
                                    {
                                        Object.keys(stat[1]).map(key => (
                                            <MenuItem value={key} key={stat[1]+key}>{key}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                            </div>}
                            
                        </div>
                    }
                    // classes={{
                    //     title: classes.headerTitle
                    // }}
                    
                />
                
                <CardContent className={classes.cardContent}>
                    <Typography variant="h3" style={{color:stat[1]<0?'#f44336':'#4caf50',fontWeight:'bold',fontSize: '2.75vw'}} gutterBottom>
                        {renderStat(stat)}
                    </Typography>
                    
                </CardContent>
                <div style={{position:"absolute",bottom:'5px',right:'5px'}}>
                    <IconButton onClick={()=>{delFunc(stat[0])}}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
                
            </Card>
        </Grid>
    )
}

export default StatBox