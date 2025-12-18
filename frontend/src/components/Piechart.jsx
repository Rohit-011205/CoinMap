import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";



const data = [
    { name: "BTC", value: 40 },
    { name: "ETH", value: 25 },
    { name: "SOL", value: 30 },
    { name: "Others", value: 5 },
];

const COLORS = ["#8B5CF6", "#6366F1", "#A855F7", "#4C1D95"];

const Piechart = () => {
    return (
        <div className="bg-[#1E1E2F] p-4 sm:p-6 rounded-xl shadow-md h-[260px] sm:h-[360px]">

            <div className="heading flex items">
                <h2 className="text-white text-lg font-semibold mb-2">
                    Portfolio Allocation
                </h2>
            </div>

            <div className="charts h-[180px] sm:h-[280px] flex flex-row ">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <div className="bar flex p-4 ">
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={window.innerWidth < 640 ? 35 : 60}
                                outerRadius={window.innerWidth < 640 ? 60 : 90}
                                paddingAngle={3}
                            >
                                {data.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#5e5e96ff",
                                    border: "1px solid #6D28D9",
                                    color: "#c9c1d6ff",
                                }}
                            />
                        </div>

                    </PieChart>
                </ResponsiveContainer>
                <div className="w-full sm:w-1/2 space-y-3">
                    {data.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-gray-300 text-sm">
                                    {item.name}
                                </span>
                            </div>

                            <span className="text-white text-sm font-medium">
                                {item.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Piechart
