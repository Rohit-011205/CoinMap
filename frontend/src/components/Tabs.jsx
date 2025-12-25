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
          
          // Performance-based Glow and Border colors
          const trendClass = isUp ? "text-emerald-400" : "text-rose-500";
          const glowClass = isUp 
            ? "hover:border-emerald-500/50 hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.2)]" 
            : "hover:border-rose-500/50 hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.2)]";

          return (
            <div
              key={item.id}
              className={`group relative bg-[#121214] border border-white/5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${glowClass}`}
            >
              {/* Quick Action Icons */}
              <div className="absolute top-4 right-4 flex gap-3 z-20">
                <button title="Watchlist" className="text-gray-600 hover:text-rose-500 transition-colors">
                  <FaHeart size={15} />
                </button>
                <button onClick={() => handleAddHolding(item)} title="Add to Holdings" className="text-gray-600 hover:text-emerald-400 transition-colors">
                  <FaPlus size={15} />
                </button>
              </div>

              {/* Coin Info */}
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

              {/* Price Section */}
              <div className="mb-6">
                <div className="text-2xl font-black tracking-tight text-white">
                  ${item.current_price.toLocaleString()}
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${trendClass}`}>
                  {isUp ? <IoIosTrendingUp /> : <IoIosTrendingDown />}
                  {isUp ? "+" : ""}{priceChange?.toFixed(2)}%
                </div>
              </div>

              {/* Minimalist Stats Footer */}
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
// import React, { useEffect, useState } from 'react'
// import axios, { Axios } from 'axios'
// import { IoIosTrendingUp } from "react-icons/io";
// import { IoIosTrendingDown } from "react-icons/io";


// const Tabs = () => {
//   const [coins, setCoins] = useState([])
//   useEffect(() => {

//     axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")

//       .then((response) => {
//         console.log(response.data)
//         setCoins(response.data);
//       })
//       .catch((error) => {
//         console.log(error.message)
        

//       })

//   }, [])

//   return (
//     <div className="mt-10 p-4 bg-base-200">
//       {/* <h2 className="text-xl font-bold mb-4">Market Coins</h2> */}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         {coins.map((item) => {
//           const priceChange = item.price_change_percentage_24h;
//           const isUp = priceChange >= 0;
//           const trendColor = isUp ? "text-green-500" : "text-red-500";
//           const borderColor = isUp ? "hover:border-green-500" : "hover:border-red-500";

//           return (
//             <div
//               key={item.id}
//               className={`card bg-base-100 shadow-md border border-transparent ${borderColor} transition-all duration-300`}
//             >
//               {/* Coin Image */}
//               <figure className="pt-6">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="h-16 w-16 object-contain"
//                 />
//               </figure>

//               {/* Content */}
//               <div className="card-body items-center text-center p-4 space-y-2">
//                 {/* Name */}
//                 <h2 className="card-title text-base font-semibold">
//                   {item.name}
//                 </h2>

//                 {/* Symbol */}
//                 <p className="uppercase text-sm text-gray-400">
//                   {item.symbol}
//                 </p>

//                 {/* Price */}
//                 <p className="text-lg font-bold">
//                   ${item.current_price}
//                 </p>
//                 <p className="total-volume text-white">
//                   Total Volume : {item.total_volume.toLocaleString()}
//                 </p>
//                 <p className="total-volume text-white">
//                   Market_cap : ${item.market_cap.toLocaleString()}
//                 </p>


//                 {/* Price Change */}
//                 <div className={`flex items-center gap-3 ${trendColor} font-medium`} >
//                   <span>
//                     {priceChange != null ? priceChange.toFixed(2) : "N/A"}%
//                   </span>
//                   <span className='text-3xl'>
//                   {isUp ? <IoIosTrendingUp /> : <IoIosTrendingDown />}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//       </div>
//     </div>
//   )
// }

// export default Tabs
