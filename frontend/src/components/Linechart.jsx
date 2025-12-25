// import { useEffect, useMemo, useState } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import API from "../API";

// const PLineChart = () => {
//   const [range, setRange] = useState("1D");
//   const [chartData, setChartData] = useState([]);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await API.get(`/portfolio/history?range=${range}`);
//         setChartData(res.data.data || []);
//       } catch (err) {
//         console.error("Failed to load portfolio history", err);
//         setChartData([]);
//       }
//     };
//     fetchHistory();
//   }, [range]);

//   const currentData = useMemo(() => {
//     return chartData.map((item) => ({
//       ...item,
//       time:
//         range === "1D"
//           ? new Date(item.timestamp).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : new Date(item.timestamp).toLocaleDateString([], {
//               month: "short",
//               day: "numeric",
//             }),
//     }));
//   }, [chartData, range]);

//   const yDomain = useMemo(() => {
//     if (!currentData.length) return [0, "auto"];
//     const values = currentData.map((d) => d.value);
//     const min = Math.min(...values);
//     const max = Math.max(...values);
//     const padding = (max - min) * 0.15 || 100;
//     return [Math.max(0, min - padding), max + padding];
//   }, [currentData]);

//   return (
//     <div className="bg-[#1E1E2F] p-6 rounded-2xl shadow-xl border border-white/5 h-[300px] sm:h-[400px] flex flex-col">
//       {/* Header with Range Selectors */}
//       <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
//         <div>
//           <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-1">
//             Performance
//           </p>
//           <h2 className="text-white text-xl font-bold tracking-tight">Portfolio Value</h2>
//         </div>

//         <div className="flex bg-[#131322] p-1 rounded-xl border border-white/5">
//           {["1D", "7D", "1M", "1Y"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setRange(item)}
//               className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
//                 range === item
//                   ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
//                   : "text-gray-500 hover:text-gray-300"
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="flex-grow">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={currentData}>
//             <defs>
//               <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
//             <XAxis
//               dataKey="time"
//               stroke="#4B5563"
//               tick={{ fontSize: 11, fontWeight: 500 }}
//               axisLine={false}
//               tickLine={false}
//               dy={10}
//             />
//             <YAxis
//               domain={yDomain}
//               hide={isMobile} // Cleaner on mobile
//               tickCount={6}
//               tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`}
//               stroke="#4B5563"
//               fontSize={11}
//               axisLine={false}
//               tickLine={false}
//             />
//             <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#8B5CF6", strokeWidth: 1 }} />
//             <Area
//               type="monotone"
//               dataKey="value"
//               stroke="#A78BFA"
//               strokeWidth={3}
//               fillOpacity={1}
//               fill="url(#colorValue)"
//               animationDuration={1500}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// // Custom Tooltip Matching your Purple/Dark theme
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-[#131322]/90 backdrop-blur-md p-4 border border-white/10 rounded-xl shadow-2xl">
//         <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1 font-bold">{label}</p>
//         <p className="text-white text-lg font-bold">
//           ${Number(payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// export default PLineChart;
import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import API from "../API";

const PLineChart = () => {
  const [range, setRange] = useState("1D");
  const [chartData, setChartData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(`/portfolio/history?range=${range}`);
        setChartData(res.data.data || []);
      } catch (err) {
        console.error("Failed to load portfolio history", err);
        setChartData([]);
      }
    };

    fetchHistory();
  }, [range]);

  const currentData = useMemo(() => {
    return chartData.map((item) => ({
      ...item,
      time:
        range === "1D"
          ? new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
          : new Date(item.timestamp).toLocaleDateString([], {
            month: "short",
            day: "numeric",
          }),
    }));
  }, [chartData, range]);


  const yDomain = useMemo(() => {
    if (!currentData.length) return ["auto", "auto"];

    const values = currentData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    // const padding = (max - min) * 0.1 || 100; // fallback padding
    const spread = (max - min)  // fallback padding

    const padding = spread === 0 ? min * 0.01 : spread * 0.05;

    return [min - padding, max + padding];
  }, [currentData]);


  console.log("Chart data:", chartData);

  return (
    <div className="bg-[#1E1E2F] pb-4 p-6 rounded-xl shadow-md h-[260px] sm:h-[360px]">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h2 className="text-white text-lg font-semibold">Portfolio Value</h2>

        <div className="flex gap-2">
          {["1D", "7D", "1M", "1Y"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`px-3 py-1 text-sm rounded-md transition ${range === item
                ? "bg-purple-600 text-white"
                : "bg-[#2A2A40] text-gray-400 hover:text-white"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[180px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData}>
            <CartesianGrid stroke="#323277" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis
              domain={yDomain}
              allowDataOverflow={true}
              tickCount={5}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              allowDecimals={false}
              stroke="#A3B2CB"
            />
            <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)}`, "Value"]} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              fillOpacity={0.2}
              fill="#8B5CF6"
            />

            <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PLineChart;
