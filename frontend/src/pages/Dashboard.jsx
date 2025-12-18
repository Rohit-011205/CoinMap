import React from 'react'
import { Chart } from 'chart.js'
// import {TopStatsCard} from 'chart.js'
import TopStatsCard from '../components/TopStatscard'
import PLineChart from '../components/Linechart'
import Piechart from '../components/Piechart'
import Tablehold from '../components/Tablehold'


const topStats = [
  {
    title: "Total Portfolio Value",
    value: "$54,328.25",
  },
  {
    title: "24H Change",
    value: "+$1,256.80",
    subValue: "+2.37%",
    color: "text-green-400",
  },
  {
    title: "Total Profit / Loss",
    value: "+$15,732.68",
    color: "text-green-400",
  },
  {
    title: "Top / Worst Performer",
    value: "SOL ↑ 12.4%",
    subValue: "DOGE ↓ 6.8%",
  },
];

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {topStats.map((item, i) => (
          <TopStatsCard key={i} {...item} />
        ))}
      </div>

      <div className="flex mt-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PLineChart />
        </div>

        <div className="bg-[#1E1E2F] rounded-xl ">
          <Piechart />
        </div>
      </div>

      <div className="tabless">
        <Tablehold />
      </div>

    </div>
  )
}

export default Dashboard
