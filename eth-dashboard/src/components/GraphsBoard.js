import React, { useEffect,useState } from "react";
import myapi from "../apis/myapi";
import CustomGraphConatiner from "./CustomGraphContainer";
import AddIcon from '@material-ui/icons/Add';
import { Button } from "@material-ui/core";
// {col: 'lines' , col2: 'dots'}

const GraphsBoard = () => {
    const [data,setData] = useState([]);
    const [graphs,setGraphs] = useState((localStorage.getItem('graphs')===null)?[
        [0,{btc_sma: 'lines',eth_sma: 'lines',price_ratio: 'lines'},'log','Price'],
        [1,{eth_sma: 'lines',eth_metcalfe_predicted: 'lines',price_ratio: 'lines'},'log','Price (ETH)'],
        [2,{eth_sma: 'lines',eth_acp: 'markers',eth_doubling_time: 'lines',eth_halving_time: 'lines'},'log','Wallets'],
    ]:JSON.parse(localStorage.getItem('graphs')));
    const [isLoading,setIsLoading] = useState(false);
    const [key,setKey] = useState((localStorage.getItem('key')===null)?3:parseInt(localStorage.getItem('key')));
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await myapi.get("/graphs").catch(err => console.log(err));
            setData(response.data);
            setIsLoading(false);
        };
        fetchData();
        
    },[]);
    useEffect(()=>{
        localStorage.setItem('graphs',JSON.stringify(graphs));
    },[])
    useEffect(()=>{
        try {
            localStorage.setItem('key',key.toString());
        } catch(e) {
            if(e.code==="22"||e.code==="1024"){
                alert('Graph Save Limit Reached');
            }
        }
    },[key]);
    const addGraph = () => {
        setGraphs((oldGraphs) => {
            // [key,{},lineMode,title]
            //   0   1   2         3
            
            return [...oldGraphs,[key,{},'linear','Custom']]
        });
        try {
            let g = JSON.parse(localStorage.getItem('graphs'));
            g.push([key,{},'linear','Custom']);
            localStorage.setItem('graphs',JSON.stringify(g));
        } catch(e) {
            if(e.code==="22"||e.code==="1024"){
                alert('Graph Save Limit Reached');
            }
        };
        setKey(key+1);
        
    };
    const deleteGraph = (target) => {
        setGraphs(graphs.filter(val=>val[0]!==target));
        try {
            let g = JSON.parse(localStorage.getItem('graphs'));
            let x = g.filter(val=>val[0]!==target);
            localStorage.setItem('graphs',JSON.stringify(x));
        } catch(e) {
            if(e.code==="22"||e.code==="1024"){
                alert('Graph Save Limit Reached');
            }
        };
    };
    const loadGraphs = () => {
        if(isLoading) {
            return <div>
                Loading ...
            </div>
        };
        return (
            <div>
                <div>
                    {graphs.map((arr)=>(
                        <CustomGraphConatiner data={data} deleteFunc={deleteGraph} id={arr} key={arr[0].toString()+"graph"}/>
                    ))}
                </div>
                <Button startIcon={<AddIcon />} onClick={addGraph}>
                    New Graph
                </Button>
            </div>
        )
    };
    return(
        <div>
            {loadGraphs()}
        </div>
    )
}

export default GraphsBoard