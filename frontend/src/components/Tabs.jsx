import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { FaPlus, FaHeart } from "react-icons/fa";
import API from '../API';
import AddHoldingModal from './AddHoldingModal';

const Tabs = (onHoldingAdded) => {
  const [coins, setCoins] = useState([]);
  const [selectedcoin,setSelectedCoin] = useState(null)
  const [ModalOpen,setModalOpen] = useState(false)
  const [authenticate, setAuthenticate] = useState(false)

  

  useEffect(() => {
    const fetchMarketCoins = async() =>{
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

    // ✅ Handle Add Holdings Click
  const handleAddHolding = (coin) => {


    setSelectedCoin(coin);
    setModalOpen(true);
  };

  // ✅ Handle Modal Close
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCoin(null);
  };

  return (
    <>
    {/* Background changed to a neutral deep carbon grey */}
    <div className="min-h-screen  p-8 text-gray-100">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Market Overview
        </h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Real-time cryptocurrency statistics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coins.map((item) => {
          const priceChange = item.price_change_percentage_24h;
          const isUp = priceChange >= 0;
          
       
          const trendClass = isUp ? "text-emerald-400" : "text-rose-500";
          const glowClass = isUp 
            ? "hover:border-emerald-500/50 hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.2)]" 
            : "hover:border-rose-500/50 hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.2)]";

          return (
            <div
              key={item.id}
              className={`group relative bg-[#121214] border border-white/5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${glowClass}`}
            >
    
              <div className="absolute top-4 right-4 flex gap-3 z-20">
                <button title="Watchlist" className="text-gray-600 hover:text-rose-500 transition-colors">
                  <FaHeart size={15} />
                </button>
                <button onClick={() => handleAddHolding(item)} title="Add to Holdings" className="text-gray-600 hover:text-emerald-400 transition-colors">
                  <FaPlus size={15} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className=" p-2.5 rounded-xl shadow-inner">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-9 w-9 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-none mb-1">{item.name}</h3>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{item.symbol}</span>
                </div>
              </div>

  
              <div className="mb-6">
                <div className="text-2xl font-black tracking-tight text-white">
                  ${item.current_price.toLocaleString()}
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${trendClass}`}>
                  {isUp ? <IoIosTrendingUp /> : <IoIosTrendingDown />}
                  {isUp ? "+" : ""}{priceChange?.toFixed(2)}%
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">Market Cap</span>
                  <span className="text-xs text-gray-300 font-medium">${(item.market_cap / 1000000000).toFixed(1)}B</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">Volume</span>
                  <span className="text-xs text-gray-300 font-medium">${(item.total_volume / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <AddHoldingModal 
        coin={selectedcoin}
        isOpen={ModalOpen}
        onClose={handleCloseModal}
        onSuccess={onHoldingAdded}
      />

    </>

  );
};

export default Tabs;
