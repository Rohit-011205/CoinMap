import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const chartData = {
    "1D": [
        { time: "10AM", value: 52000 },
        { time: "12PM", value: 52300 },
        { time: "2PM", value: 52100 },
        { time: "4PM", value: 52800 },
    ],
    "7D": [
        { time: "Mon", value: 48000 },
        { time: "Tue", value: 49200 },
        { time: "Wed", value: 48800 },
        { time: "Thu", value: 50000 },
        { time: "Fri", value: 52000 },
        { time: "Sat", value: 53000 },
        { time: "Sun", value: 54328 },
    ],
    "1M": [
        { time: "Week 1", value: 42000 },
        { time: "Week 2", value: 46000 },
        { time: "Week 3", value: 50000 },
        { time: "Week 4", value: 54328 },
    ],
};

const PLineChart = () => {
    const [range, setRange] = useState("1D");
    const isMobile = window.innerWidth < 640;
    return (
        <div className="bg-[#1E1E2F] pb-4 p-6 sm:p-6 rounded-xl shadow-md h-[260px] sm:h-[360px] ">

            {/* Header */}
            <div className="flex justify-between items-center mb-4 flex-wrap">
                <h2 className="text-white text-lg font-semibold">
                    Portfolio Value
                </h2>

                {/* Time Filters */}
                <div className="flex gap-2">
                    {["1D", "7D", "1M", "1Y", "All"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setRange(item)}
                            className={`px-3 py-1 text-sm rounded-md transition ${range === item ? "bg-purple-600 text-white" : "bg-[#2A2A40] text-gray-400 hover:text-white"}`} >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="ch h-[180px] sm:h-[280px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={chartData[range]}>
                        <CartesianGrid stroke="#323277ff" strokeDasharray="3 3" />

                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: isMobile ? 10 : 12 }} />
                        <YAxis stroke="#a3b2cbff" tick={{ fontSize: isMobile ? 10 : 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1E1E2F",
                                border: "1px solid #6D28D9",
                                color: "white",
                            }}
                        />
                         <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8B5CF6"
                            fill="url(#lineGradient)"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8B5CF6"
                            strokeWidth={1}
                            dot={true}
                        />
                       
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default PLineChart;
