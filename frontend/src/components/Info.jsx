import React from 'react'
import iphone from "../assets/iphone.png"
import { useNavigate } from 'react-router-dom'

function Info() {
    const navigate = useNavigate();
    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-6 flex flex-col lg:flex-row items-center justify-between mt-10 lg:mt-20 mb-2 lg:mb-24  gap-16 lg:gap-0">

            
            <div className='w-full lg:w-[55%] flex flex-col text-center lg:text-left items-center lg:items-start order-2 lg:order-1'>

                <div className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-medium tracking-wider text-purple-400 uppercase bg-purple-400/10 border border-purple-400/20 rounded-full">
                    Real-Time Crypto Insights
                </div>

                <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white'>
                    Analyze the Market <br />
                    <span className='bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent'>
                        With Precision.
                    </span>
                </h1>

                <p className="mt-6 lg:mt-8 text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl">
                    Experience a cleaner way to track your portfolio. CoinMap provides live data feeds and professional-grade tools designed for the modern trader.
                </p>

               
                <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button onClick={() => navigate("/Signup")} className="px-8 lg:px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all transform active:scale-95 hover:scale-105 shadow-xl shadow-purple-500/20">
                        Try CoinMap Now
                    </button>
                    
                </div>
            </div>

          
            <div className="mt-16 w-full lg:w-[30%] flex justify-center items-center order-1 lg:order-2">

                <div className="relative mt-10 lg:mt-10 w-[200px] sm:w-[260px] md:w-[300px] lg:w-[360] max-w-[380px]">

                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-600/15 blur-[60px] md:blur-[100px] rounded-full -z-10"></div>

                
                    <img
                        src={iphone}
                        alt="Rcart App"
                        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(168,85,247,0.2)] animate-float"
                    />
                </div>
            </div>
        </div>
    )
}

export default Info
