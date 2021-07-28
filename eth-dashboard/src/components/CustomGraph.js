import React, { useEffect,useState } from "react";
import myapi from "../apis/myapi";
import Plot from 'react-plotly.js';

const CustomGraph = ({data,selection}) => {
    console.log(selection);
    const genTraces = (data,selection) => {
        let cols = Object.keys(selection).filter(col => data[col] === true);
        return cols.map((col)=>(
            {
                x: data.date,
                y: data[col],
                mode: 'lines',
                name: col,
            }
        ));
    };
    const renderPlot = () => {
        return (
            <div>
                <Plot
                    data={genTraces(data,selection)}
                    layout={{
                        width:1200,
                        height:400,
                        title:'Custom',
                        // yaxis:{type: 'log',autorange: true},
                    }}
                />
            </div>
        )
    };
    return (
        <div>
            {renderPlot()}
        </div>
    )
};

export default CustomGraph