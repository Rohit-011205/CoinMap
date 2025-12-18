import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"

const Tablehold = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", {
            params: {
                params: {
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: 10,
                    page: 1,
                }
            }
        }
        )


            .then((response) => {
                console.log(response.data)
                setCoins(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("Failed to fetch market data");
                setLoading(false)
            })

    }, [])

    const holdings = {
        bitcoin: 0.45,
        ethereum: 2.1,
        solana: 15,
    };

    return (

        <div className="bg-[#1E1E2F] w-full p-4 rounded-xl shadow-md mt-6 overflow-x-auto">
            <h2 className="text-white text-lg font-semibold mb-4">
                My Holdings
            </h2>
            <div className=" min-w-[700]  ">
                <table className="min-w-full table-auto text-sm text-left ">
                    <thead className="text-gray-400 border-b border-purple-500/20  ">
                        <tr>
                            <th className="py-2">Asset</th>
                            <th>Price</th>
                            <th>24h %</th>
                            <th>Holdings</th>
                            <th>Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        {coins.filter((coin) => holdings[coin.id])
                            .map((coin) => {
                                const quantity = holdings[coin.id];
                                const value = quantity * coin.current_price;
                                const isUp = 
                                coin.price_change_percentage_24h>= 0;

                                return (
                                    <tr
                                        key={coin.id}
                                        className="border-b border-purple-500/10 "
                                    >
                                        <td className="py-3 flex items-center gap-2 text-white">
                                            <img src={coin.image} alt="" className="w-6 h-6" />
                                            {coin.symbol.toUpperCase()}
                                        </td>

                                        <td className="text-gray-300">
                                            ${coin.current_price.toLocaleString()}
                                        </td>

                                        <td
                                            className={
                                                isUp ? "text-green-400" : "text-red-400"
                                            }
                                        >
                                            {coin.price_change_percentage_24h.toFixed(2)}%
                                        </td>

                                        <td className="text-gray-300">
                                            {quantity}
                                        </td>

                                        <td className="text-white">
                                            ${value.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tablehold
