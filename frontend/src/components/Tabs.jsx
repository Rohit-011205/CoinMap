import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";


const Tabs = () => {
  const [coins, setCoins] = useState([])
  useEffect(() => {

    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")

      .then((response) => {
        console.log(response.data)
        setCoins(response.data);
      })
      .catch((error) => {
        console.log(error.message)

      })

  }, [])

  return (
    <div className="mt-10 p-4 bg-base-200">
      {/* <h2 className="text-xl font-bold mb-4">Market Coins</h2> */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {coins.map((item) => {
          const priceChange = item.price_change_percentage_24h;
          const isUp = priceChange >= 0;
          const trendColor = isUp ? "text-green-500" : "text-red-500";
          const borderColor = isUp ? "hover:border-green-500" : "hover:border-red-500";

          return (
            <div
              key={item.id}
              className={`card bg-base-100 shadow-md border border-transparent ${borderColor} transition-all duration-300`}
            >
              {/* Coin Image */}
              <figure className="pt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-contain"
                />
              </figure>

              {/* Content */}
              <div className="card-body items-center text-center p-4 space-y-2">
                {/* Name */}
                <h2 className="card-title text-base font-semibold">
                  {item.name}
                </h2>

                {/* Symbol */}
                <p className="uppercase text-sm text-gray-400">
                  {item.symbol}
                </p>

                {/* Price */}
                <p className="text-lg font-bold">
                  ${item.current_price}
                </p>
                <p className="total-volume text-white">
                  Total Volume : {item.total_volume.toLocaleString()}
                </p>
                <p className="total-volume text-white">
                  Market_cap : ${item.market_cap.toLocaleString()}
                </p>


                {/* Price Change */}
                <div className={`flex items-center gap-3 ${trendColor} font-medium`} >
                  <span>
                    {priceChange != null ? priceChange.toFixed(2) : "N/A"}%
                  </span>
                  <span className='text-3xl'>
                  {isUp ? <IoIosTrendingUp /> : <IoIosTrendingDown />}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default Tabs
