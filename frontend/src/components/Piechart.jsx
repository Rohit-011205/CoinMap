import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useMediaQuery } from 'react-responsive';

// High-contrast professional palette
// const COLORS = ["#7C3AED", "#2DD4BF", "#F472B6", "#FB923C", "#6366F1", "#94A3B8"];
const COLORS = [
  "#C084FC", // Electric Orchid
  "#38BDF8", // Cyan Sky
  "#818CF8", // Soft Neon Indigo
  "#FB7185", // Rose Flare
  "#34D399", // Mint Emerald
  "#FBBF24", // Amber Glow
];
const Piechart = ({ data }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  if (!data || data.length === 0) {
    return (
      <div className="bg-[#0B0B15] rounded-3xl border border-white/5 p-6 text-gray-400 text-center h-80 flex items-center justify-center">
        <p>No data to display</p>
      </div>
    );
  }

  // Keeping your working data mapping
  const chartData = data.map((holding) => ({
    name: holding.symbol,
    value: parseFloat(holding.quantity?.toFixed(2) || 0),
  }));

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  const chartDataWithPercent = chartData.map((item, index) => ({
    ...item,
    percent: totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(2) : 0,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className=" p-6 rounded-[24px] border border-white/5 shadow-2xl w-full">
      <div className="flex flex-col mb-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">
          Asset Distribution
        </p>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Portfolio Allocation
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Chart Container */}
        <div className="w-full lg:w-1/2 h-64 sm:h-72 flex items-center justify-center relative">
          {/* Total Value in Center */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Total</span>
            <span className="text-white text-xl font-bold">{totalValue.toFixed(0)}</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartDataWithPercent}
                dataKey="value"
                nameKey="name"
                innerRadius="70%"
                outerRadius="95%"
                paddingAngle={4}
                stroke="none"
                cornerRadius={6}
              >
                {chartDataWithPercent.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    style={{ filter: `drop-shadow(0 0 8px ${entry.color}44)` }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full lg:w-1/2 space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {chartDataWithPercent.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-6 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-200 text-sm font-bold tracking-tight">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-white text-sm font-bold block">{item.percent}%</span>
                <span className="text-gray-500 text-[10px] font-medium">${item.value.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tooltip matching the Line Chart design
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#131322]/95 backdrop-blur-md p-3 border border-white/10 rounded-xl shadow-2xl">
        <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1 font-bold">{data.name}</p>
        <p className="text-white text-base font-bold">
          ${Number(data.value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default Piechart;
// import React from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import { useMediaQuery } from 'react-responsive';

// const COLORS = ["#8B5CF6", "#6366F1", "#A855F7", "#4C1D95", "#EC4899", "#F59E0B"];

// const Piechart = ({ data }) => {
//   if (!data || data.length === 0) {
//     return (
//       <div className="bg-[#1E1E2F] rounded-xl p-6 text-gray-400 text-center h-96 flex items-center justify-center">
//         <p>No data to display</p>
//       </div>
//     );
//   }

//   const chartData = data.map((holding) => ({
//     name: holding.symbol,
//     value: parseFloat(holding.quantity?.toFixed(2) || 0),
//   }));

//   const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

//   const chartDataWithPercent = chartData.map((item, index) => ({
//     ...item,
//     percent: totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : 0,
//     color: COLORS[index % COLORS.length],
//   }));

//   const isDesktop = useMediaQuery({ minWidth: 1024 });

//   return (
//     <div className="bg-[#1E1E2F] p-4 sm:p-6 rounded-xl shadow-md w-full">
//       <h2 className="text-white text-lg font-semibold mb-4">
//         Portfolio Allocation
//       </h2>

//       <div className="flex flex-col lg:flex-row gap-4">
//         {/* Chart */}
//         <div className="w-full lg:w-2/3 h-52 sm:h-72 md:h-80 flex items-center justify-center">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={chartDataWithPercent}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius="60%"
//                 outerRadius="85%"
//                 paddingAngle={2} // reduces slice spacing
//                 label={isDesktop ? ({ name, percent }) => `${name} ${percent}%` : false}
//                 labelLine={false}
//                 stroke={0} // removes white borders
//               >
//                 {chartDataWithPercent.map((entry, index) => (
//                   <Cell
//                     key={index}
//                     fill={entry.color}
//                     style={{ transition: "all 0.3s ease" }}
//                   />
//                 ))}
//               </Pie>

//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#707082ff",
//                   border: "1px solid #6D28D9",
//                   borderRadius: "8px",
//                   color: "#fff",
//                 }}
//                 formatter={(value) => `$${Number(value).toFixed(2)}`}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Legend */}
//         <div className="w-full lg:w-1/3 space-y-2 max-h-64 overflow-y-auto">
//           {chartDataWithPercent.map((item) => (
//             <div
//               key={item.name}
//               className="flex items-center justify-between px-2 py-1 rounded hover:bg-[#2A2A40] transition cursor-pointer"
//             >
//               <div className="flex items-center gap-2 flex-1 min-w-0">
//                 <span
//                   className="w-3 h-3 rounded-full flex-shrink-0"
//                   style={{ backgroundColor: item.color }}
//                 />
//                 <span className="text-gray-300 text-sm truncate">{item.name}</span>
//               </div>
//               <div className="text-right flex-shrink-0 ml-2">
//                 <span className="text-white text-sm font-medium block">{item.percent}%</span>
//                 <span className="text-gray-400 text-xs">${item.value.toFixed(0)}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Piechart;
