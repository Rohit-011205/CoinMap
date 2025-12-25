import React, { useEffect, useState } from 'react'
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import API from '../API';
import { Slice } from 'lucide-react';


const HomeTabs = () => {
    const [coins, setCoins] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        const fetchMarketCoins = async () => {
            try {
                const res = await API.get("/market/top")
                if (res.data.success) {
                    setCoins(res.data.data || []);
                }
            } catch (error) {
                console.error("Error fetching market coins:", error.message);
            }
        }
        fetchMarketCoins()
    }, []);

    const displayCoins = show 
  ? (Array.isArray(coins) ? coins : []) 
  : (Array.isArray(coins) ? coins.slice(0, 8) : []);

    return (
        <div className="mt-20 p-6 md:p-10 bg-transparent min-h-screen bg-transparent max-w-screen-2xl container mx-auto md:px-20 px-6">

            {/* <div className="back "> */}

            
<div className="mb-16">
 
  <div className="w-12 h-[1px] bg-purple-600 mb-8"></div>
  
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
    <div className="max-w-2xl">
 
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 px-2 py-1 bg-zinc-900/50 border border-zinc-800 rounded">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">Live Feed</span>
        </div>
        <span className="h-px w-8 bg-zinc-800"></span>
      </div>

      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
        Market <span className="text-zinc-500">Overview</span>
      </h2>

      <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
        A curated selection of high-performing digital assets, updated in real-time to reflect current market volatility.
      </p>
    </div>

 
    <div className="hidden md:block text-right">
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">Active Inventory</p>
        <div className="text-xl font-light text-white tracking-widest">
          {displayCoins.length} <span className="text-zinc-700 mx-1">/</span> {coins.length}
        </div>
      </div>
    </div>
  </div>

  <div className="w-full h-px bg-zinc-900 mt-10"></div>
</div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayCoins.map((item) => {
                    const priceChange = item.price_change_percentage_24h;
                    const isUp = priceChange >= 0;
                    const trendColor = isUp ? "text-green-500" : "text-red-500";
                    const borderColor = isUp ? "hover:border-green-500/50" : "hover:border-red-500/50";

                    return (
                        <div
                            key={item.id}
                            className={`card bg-base-100 shadow-xl border border-white/5 ${borderColor} transition-all duration-500 hover:shadow-purple-500/10 hover:-translate-y-1`}
                        >
                            <figure className="pt-8">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-14 w-14 object-contain grayscale-[0.2] hover:grayscale-0 transition-all"
                                />
                            </figure>

                            <div className="card-body items-center text-center p-6 space-y-1">
                                <h2 className="text-lg font-bold text-white tracking-wide">{item.name}</h2>
                                <p className="uppercase text-xs font-bold text-gray-500 tracking-widest">{item.symbol}</p>

                                <div className="py-2">
                                    <p className="text-2xl font-black text-white">${item.current_price.toLocaleString()}</p>
                                </div>

                                <div className="w-full h-[1px] bg-white/5 my-2"></div>

                                <div className="flex flex-col gap-1 text-[11px] text-gray-500 font-medium">
                                    <p>Vol: {item.total_volume.toLocaleString()}</p>
                                    <p>Cap: ${item.market_cap.toLocaleString()}</p>
                                </div>

                                <div className={`flex items-center gap-2 pt-2 ${trendColor} font-bold text-sm`} >
                                    {isUp ? <IoIosTrendingUp /> : <IoIosTrendingDown />}
                                    <span>{priceChange != null ? priceChange.toFixed(2) : "0.00"}%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center mt-16">
                <button
                    onClick={() => setShow(!show)}
                    className="group flex flex-col items-center gap-2"
                >
                    <span className="px-10 py-3 rounded-full border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 font-bold uppercase text-xs tracking-[0.2em] shadow-lg shadow-purple-500/10">
                        {show ? "Show Less" : "Explore More Assets"}
                    </span>
                    {!show && <span className="text-[10px] text-gray-600 animate-bounce mt-2 uppercase tracking-tighter">Click to expand</span>}
                </button>
            </div>
        </div>
        // </div>
    )
}

export default HomeTabs