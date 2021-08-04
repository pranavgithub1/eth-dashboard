import React, { useEffect,useState } from "react";
import myapi from "../apis/myapi";
import { DataGrid } from '@material-ui/data-grid';
const Dataset = () => {
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            const response = await myapi.get("/all").catch(err => console.log(err));
            setData([...response.data].reverse());
            setIsLoading(false);
        }
        fetchData();
    },[]);
    const columns = [];
    
    const renderDataset = () => {
        if(isLoading) {
            return <div>
                Loading...
            </div>
        }
        for(const key in data[0]) {columns.push({field: `${key}`,headerName:`${key}`,width:100})}
        return (
            <div style={{height:675,width:'100%',padding:15}}>
                <DataGrid 
                    rows={data}
                    columns={columns}
                    getRowId={(row)=>(row.unix_timestamp)}
                    pageSize={10}
                    disableColumnMenu
                />
            </div>
        )
    };
    return (
        <div>{renderDataset()}</div>
    )
    
}

export default Dataset
