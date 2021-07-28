import React, { useEffect } from "react";
import coingecko from "../apis/coingecko"
const Price = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response  = await coingecko.get("/simple/price",{
                params: {
                    vs_currencies: "usd",
                    ids: "ethereum"
                }
            });
            console.log(response.data);
        }
        fetchData();
    },[]);
    return (
        <div>
            <p>Price</p>
        </div>
    )
}

export default Price