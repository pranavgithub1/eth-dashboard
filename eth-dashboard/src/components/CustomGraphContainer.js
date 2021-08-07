import React, { useState,useEffect } from "react";
// import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory'
// import { Checkbox, FormControlLabel, makeStyles, Paper, FormGroup, Button, TextField} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Plot = createPlotlyComponent(Plotly);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        // border: '3px solid black'
    },
    graphRow: {
        // padding: theme.spacing(2),
        display: 'flex',
        // flexDirection: 'row',
        width: '100%',
        height: 400,
        // border: '2px solid green'
    },
    colSelect: {
        padding: theme.spacing(2),
        overflow: 'auto',
        // width: '30%',
        // resize: 'horizontal',
        height:'100%',
        // width:'max-content',
        // minWidth:100,
        // float: 'left',
        // border: '1px solid brown'
        minWidth: 'max-content',
        
    },
    plot: {
        // width: '80%',
        // minWidth:'fit-content',
        height: '100%',
        width:'100%',
        // border: '1px solid red',        
    },
    plotDiv: {
        flexGrow: 1,
        // flexShrink: 2,
        // flexGrow: 1,
        minWidth: 0,
        // width: '100%',
        // border: '2px solid purple'
    },
    scaleSelect: {
        padding: theme.spacing(2),
        textAlign: "center",
        width: '100%',
        height: 'auto',
        overflow: 'auto',
        position: 'relative',
        // borderTop: '1px solid LightGray'
    },
    deleteButton: {
        position: 'absolute',
        right: theme.spacing(2),
    },
    colDiv: {
        width: '200px',
        background: 'red'
    },
    titleField: {
        position: 'absolute',
        left: theme.spacing(2),
    }
}));
// const getDefaultState = (data) => {
//     return Object.keys(data).map((col) => (
//         {
//             x: data.date,
//             y: data[col],
//             mode: 'lines',
//             name: col,
//             visible: false,
//             showLegend: true,
//         }
//     ));
// };
// const getDefaultLayout = () => {
//     return {
//         width:980,
//         height:400,
//         title:'Custom',
//         yaxis:{type: 'linear',autorange: true},
//     }
// };
const getDefaultState = (data,params) => {
    return Object.keys(data).map((col) => (
        {
            x: data.date,
            y: data[col],
            mode: (col in params)?params[col]:'lines',
            name: col,
            visible: (col in params),
            showLegend: true,
        }
    ));
};
const getDefaultLayout = (type,title) => {
    return {
        // width:980,
        // height:400,
        autosize: true,
        title:title,
        yaxis:{type: type,autorange: true},
    }
};
const getDefaultMode = (graphData) => {
    return graphData.map(obj => obj["mode"]!=='lines')
}
const getObject = (graphData) => {
    let res = [];
    for(let obj of graphData){
        if(obj["visible"]) res.push([obj["name"],obj["mode"]]);
    }
    return Object.fromEntries(res);
}

const CustomGraphConatiner = ({data,deleteFunc,id}) => {
    const columns = Object.keys(data)
    const classes = useStyles();
    const [graphData,setGraphData] = useState(getDefaultState(data,id[1]));
    const [layout,setLayout] = useState(getDefaultLayout(id[2],id[3]));
    const [lineMode,setLineMode] = useState(getDefaultMode(getDefaultState(data,id[1])));
    const [count,setCount] = useState(Object.keys(id[1]).length);
    useEffect(()=>{
        // console.log("hello");
        // console.log(getObject(graphData));
        try {
            let graphs = JSON.parse(localStorage.getItem('graphs'));
            let idx = graphs.findIndex(arr=>arr[0]===id[0]);
            // console.log(getObject(graphData));
            graphs[idx][1] = getObject(graphData);
            localStorage.setItem('graphs',JSON.stringify(graphs));
        } catch(e){
            console.log(e);
            if(e.code==="22"||e.code==="1024"){
                alert('Graph Data Limit Reached, Delete Some Graphs');
            }
        }
    },[graphData]);
    useEffect(()=>{
        try {
            let graphs = JSON.parse(localStorage.getItem('graphs'));
            let idx = graphs.findIndex(arr=>arr[0]===id[0]);
            graphs[idx][2] = layout["yaxis"]["type"];
            graphs[idx][3] = layout["title"]
            localStorage.setItem('graphs',JSON.stringify(graphs));
        } catch(e){
            if(e.code==="22"||e.code==="1024"){
                alert('Graph Data Limit Reached, Delete Some Graphs');
            }
        }
    },[layout]);
    const handleChange = (event) => {
        setGraphData((oldData)=>{
            let newData = [...oldData];
            newData[columns.indexOf(event.target.name)].visible=event.target.checked;
            return newData;
        });
        if(event.target.checked){
            setCount((c)=>c+1);
        } else {
            setCount((c)=>Math.max(0,c-1));
        }
    };
    const handlelogChange = (event) => {
        setLayout((oldLayout) => {
            let newLayout = Object.assign({},oldLayout);
            newLayout.yaxis.type = (event.target.checked)?"log":"linear";
            return newLayout;
        });
    };
    const handleTitleChange = (event) => {
        setLayout((oldLayout) => {
            let newLayout = Object.assign({},oldLayout);
            newLayout.title = event.target.value;
            return newLayout;
        });
    };
    const clearSelection = () => {
        setGraphData(getDefaultState(data,{}));
        setLayout(getDefaultLayout('lines','Custom'));
        setLineMode(getDefaultMode(getDefaultState(data,{})));
        setCount(0);
    };
    const changeMode = (col) => {
        setGraphData((oldData)=>{
            let newData = [...oldData];
            newData[columns.indexOf(col)].mode = (newData[columns.indexOf(col)].mode==='lines')?'markers':'lines';
            return newData;
        });
    };
    const toggleIcon = (col) => {
        setLineMode((oldLineMode) => {
            let newLineMode = [...oldLineMode];
            newLineMode[columns.indexOf(col)] = !oldLineMode[columns.indexOf(col)];
            return newLineMode;
        });
    };
    return (
        <div className={classes.root}>
            <Paper style={{width:'100%',height:'100%'}}>
                <div className={classes.graphRow}>
                    <div container className={classes.colSelect}>
                        <FormGroup >
                            {Object.keys(data).map((col,idx) => {
                                if(col==='unix_timestamp' || col==='date'){return;}
                                return (
                                    <div key={col+'wrapper'} style={{display:'flex',flexDirection:'row'}}>
                                        <IconButton disabled={!graphData[columns.indexOf(col)].visible} key={col+'icon'} size="small" onClick={()=>{changeMode(col);toggleIcon(col)}} >
                                            {(lineMode[columns.indexOf(col)])?<MoreHorizIcon/>:<ShowChartIcon/>}
                                        </IconButton>
                                        <FormControlLabel
                                            key={col+'checkbox'}
                                            control={
                                                <Checkbox/>
                                            }
                                            label={
                                                <span style={{fontSize:'clamp(10px,1vw,1vw)'}}>{col}</span>
                                            }
                                            checked={graphData[columns.indexOf(col)].visible}
                                            onChange={handleChange}
                                            name={col}
                                        />
                                        {/* <IconButton disabled={!graphData[columns.indexOf(col)].visible} key={col+'icon'} size="small" onClick={()=>{changeMode(col);toggleIcon(col)}} >
                                            {(lineMode[columns.indexOf(col)])?<MoreHorizIcon/>:<ShowChartIcon/>}
                                        </IconButton> */}
                                       
                                    </div>                          
                                )
                                
                            })}
                            
                        </FormGroup>
                    </div>
                    <div className={classes.plotDiv}>
                        <Plot
                            data={graphData}
                            layout={layout}
                            useResizeHandler
                            className={classes.plot}

                        />
                    </div>
                </div>
                <div className={classes.scaleSelect}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox/>
                            }
                            label={"Log Scale"}
                            checked={layout.yaxis.type==='log'}
                            onChange={handlelogChange}
                            name={"log"}
                            disabled={(count===0)}
                        />
                    </FormGroup>
                    <TextField
                        className={classes.titleField}
                        label="Title"
                        id="standard-size-small"
                        // defaultValue="Custom Title"
                        size="small"
                        onChange={handleTitleChange}
                        inputProps={{
                            maxLength: 100
                        }}
                    />
                    {/* <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Standard" />
                    </form> */}
                    <Button variant="outlined" onClick={clearSelection} disabled={count===0}>
                        Clear Selection
                    </Button>
                    
                    <IconButton aria-label="delete" className={classes.deleteButton} onClick={()=>deleteFunc(id[0])}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Paper>
        </div>
    )
};

export default CustomGraphConatiner
