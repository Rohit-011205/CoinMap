import React from 'react'
import { Chart } from 'chart.js'
// import {TopStatsCard} from 'chart.js'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import TopStatsCard from '../components/TopStatscard'
import PLineChart from '../components/Linechart'
import Piechart from '../components/Piechart'
import Tablehold from '../components/Tablehold'
import API from '../API'
import toast from 'react-hot-toast'
import Barchart from '../components/Barchart'
import { useNavigate } from 'react-router-dom'


// Daisy UI
const Welcome = () => {
  const navigate = useNavigate();
  return(
  <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-2xl mx-auto bg-[#09090B] rounded-[2rem] border border-white/[0.05] relative overflow-hidden shadow-2xl">
  
  {/* Sophisticated Ambient Glows */}
  <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/10 blur-[100px]" />
  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-900/10 blur-[100px]" />

  <div className="relative z-10 flex flex-col items-center px-6">
    {/* Minimalist Glass Icon */}
    <div className="relative group mb-8">
      <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/30 transition-all duration-500" />
      <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-b from-[#1c1c21] to-[#09090b] border border-white/10 rounded-2xl shadow-xl">
        <svg onClick={() => navigate("/Holding")} className="w-8 h-8 text-purple-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>

    {/* Elegant Typography */}
    <h2 className="text-3xl font-medium tracking-tight text-white mb-3">
      Start Your Portfolio
    </h2>
    
    <p className="text-gray-400 text-sm md:text-base mb-10 max-w-[280px] text-center font-light leading-relaxed">
      No assets found. Connect your first holding to begin tracking your wealth in real-time.
    </p>

    {/* Sleek Action Button */}
    <button
      onClick={() => navigate("/Holding")} 
      className="relative flex items-center gap-3 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:scale-95"
    >
      <span>Add Your First Asset</span>
      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </button>
  </div>
</div>
  )
}

const Dashboard = () => {
  const [PortfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
    const interval = setInterval(fetchPortfolioData, 30000);
    return () => clearInterval(interval);
  }, [])

  const fetchPortfolioData = async () => {
    try {

      setLoading(true);
      setError(null);

      const response = await API.get('/portfolio/summary')
      // console.log('Backend response:', response.data);
      console.log('Full response:', response.data);
      console.log('Holdings:', response.data.holdings);

      console.log('First holding details:', response.data.holdings[0]);

      if (response.data.success) {
        setPortfolioData(response.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load portfolio");
      if (err.response?.status === 429) {
        toast.error("Too many requests. Please wait a moment.", { id: "rate-limit" });
        setError("Rate limited by provider");
      } else {
        setError(error.response?.data?.message || "Failed to load portfolio");
      }
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loading && !PortfolioData) {
      toast.loading("Loading portfolio...", { id: "portfolio" });
    }

    if (!loading) {
      toast.dismiss("portfolio");
    }

    if (error) {
      toast.error(error, { id: "portfolio-error" });
    }
  }, [loading, error, PortfolioData]);



  if (loading && !PortfolioData) {
    return (
      <div className="flex justify-center items-center h-screen">

        toast.loading("Loading portfolio...");
      </div>
    );
  }

  const NewUser = !PortfolioData?.holdings || PortfolioData.holdings.length === 0;

  if(NewUser){
    return <Welcome />
  }

  if (error && !PortfolioData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-xl mb-4">Error: {error}</p>
        <button
          onClick={fetchPortfolioData}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }


  const formatNumber = (num, decimals = 2) =>
    typeof num === 'number' ? num.toFixed(decimals) : '0.00';

  const isPositive = (num) => typeof num === 'number' && num >= 0;



  const topStats = [
    {
      title: "Total Portfolio Value",
      value: `$${PortfolioData?.totalPortfoliovalue?.toFixed(2) || '0.00'}`,
      subValue: " ",
    },
    {
      title: "24H Change",
      value: `$${PortfolioData?.Change24h?.amount?.toFixed(2) || '0.00'}`,
      subValue: `${PortfolioData?.Change24h?.percent?.toFixed(2) || '0.00'}%`,
      color:
        PortfolioData?.Change24h?.amount >= 0
          ? "text-green-200"
          : "text-red-400",
    },
    {
      title: "Total Profit / Loss",
      value: `${formatNumber(PortfolioData?.totalPnL?.amount)} $`,
      subValue: `${formatNumber(PortfolioData?.totalPnL?.percent)}%`,
      color: isPositive(PortfolioData?.totalPnL?.amount)
        ? "text-green-400"
        : "text-red-400",
    },
    {
      title: "Top / Worst Performer",
      value: `${PortfolioData?.bestPerformer?.symbol || '-'} ↑ ${formatNumber(
        PortfolioData?.bestPerformer?.pnlPercent,
        1
      )}%`,
      subValue: `${PortfolioData?.worstPerformer?.symbol || '-'} ↓ ${formatNumber(
        Math.abs(PortfolioData?.worstPerformer?.pnlPercent || 0),
        1
      )}%`,
    },
  ];




  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {topStats.map((item, i) => (
          <TopStatsCard key={i} {...item} />
        ))}
      </div>

      <div className=" mt-4 felx flex-wrap flex-row">
        <div className="xl:col-span-2">
          <PLineChart data={PortfolioData?.portfolioHistory || []} />
        </div>

        <div className="bg-[#1E1E2F] rounded-xl xl:col-span-1 mt-4">
          <Piechart data={PortfolioData?.holdings || []} />
        </div>
      </div>

      <div className="tabless mt-2">
        <Tablehold data={PortfolioData?.holdings || []} onDataChange={() => {
          fetchPortfolioData();
          fetchPortfolioHistory();
        }}
        />
      </div>

      <div className="IIchart mt-4">
        <Barchart />
      </div>

    </div>
  )
}

export default Dashboard
