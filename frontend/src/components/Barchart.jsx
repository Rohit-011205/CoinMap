import React, { useEffect, useState, useMemo } from "react";
import API from "../API";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const formatMoney = (v) => `$${Number(Math.abs(v)).toLocaleString()}`;

const Barchart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolioSummary = async () => {
            try {
                setLoading(true);
                const res = await API.get("/portfolio/summary");
                if (!res.data?.success) throw new Error("API failure");

                const holdings = res.data.holdings ?? [];
                const data = holdings.map((h) => {
                    const invested = Number(h.investedValue) || 0;
                    const current = Number(h.currentValue) || 0;
                    const pnl = current - invested;

                    return {
                        symbol: h.symbol,
                        invested,
                        // These fields are for the stacked bar logic
                        profit: pnl > 0 ? pnl : 0,
                        loss: pnl < 0 ? Math.abs(pnl) : 0,
                        pnl,
                        pnlPercent: invested ? (pnl / invested) * 100 : 0,
                        current,
                    };
                });

                setChartData(data.sort((a, b) => b.current - a.current));
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolioSummary();
    }, []);

    const totals = useMemo(() => {
        const invested = chartData.reduce((s, c) => s + c.invested, 0);
        const current = chartData.reduce((s, c) => s + c.current, 0);
        const pnl = current - invested;
        return { invested, current, pnl, pnlPercent: invested ? (pnl / invested) * 100 : 0 };
    }, [chartData]);

    if (loading || error) {
        return (
            <div className="bg-[#1B1B2E] p-6 rounded-2xl h-[400px] flex items-center justify-center text-gray-400">
                {loading ? "Loading Dashboard..." : error}
            </div>
        );
    }

    return (
        <div className="bg-[#131322] p-8 rounded-3xl shadow-2xl border border-gray-800 font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10 flex-wrap sm:gap-2">
                <div className="flex items-center gap-3 ">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                        <span className="text-blue-400 text-xl">₿</span>
                    </div>
                    <h2 className="text-gray-100 text-xl font-bold tracking-tight">
                        Invested vs Current Value
                    </h2>
                </div>
                <div className="text-right">
                    <p className={`text-2xl font-black ${totals.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {totals.pnl >= 0 ? "+" : "-"}{formatMoney(totals.pnl)}
                        <span className="text-sm ml-2 opacity-80">({totals.pnlPercent.toFixed(2)}%)</span>
                    </p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2D2D44" vertical={false} />
                        <XAxis
                            dataKey="symbol"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748B", fontSize: 11 }}
                            tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
                        />
                        <Tooltip
                            cursor={{ fill: '#ffffff05' }}
                            content={<CustomTooltip />}
                        />
                        {/* The base invested amount */}
                        <Bar dataKey="invested" stackId="a" fill="#475569" radius={[0, 0, 0, 0]} barSize={45} />
                        {/* The Profit part */}
                        <Bar dataKey="profit" stackId="a" fill="#22C55E" radius={[6, 6, 0, 0]} />
                        {/* The Loss part (renders "under" the invested visually in real life, but here we stack to show current value) */}
                        <Bar dataKey="loss" stackId="a" fill="#EF4444" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                {chartData.slice(0, 3).map((coin) => (
                    <div key={coin.symbol} className="bg-[#1E1E30] p-5 rounded-2xl border-l-4 border-green-500 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-white font-bold text-lg">{coin.symbol}</h3>
                            <span className="text-green-400 font-bold">+{coin.pnlPercent.toFixed(2)}%</span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-400"><span>Invested</span><span className="text-gray-200">{formatMoney(coin.invested)}</span></div>
                            <div className="flex justify-between text-gray-400"><span>Current</span><span className="text-gray-200">{formatMoney(coin.current)}</span></div>
                            <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                                <span className="text-gray-400">PnL</span>
                                <span className="text-green-400 font-bold">+{formatMoney(coin.pnl)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                <FooterStat label="Total Invested" value={totals.invested} color="blue" />
                <FooterStat label="Current Value" value={totals.current} color="purple" />
                <FooterStat label="Portfolio PnL" value={totals.pnl} color="green" isPnL />
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#131322]/90 backdrop-blur-md p-4 border border-gray-700 rounded-xl shadow-2xl">
                <p className="text-white font-bold mb-2">{data.symbol}</p>
                <p className="text-gray-400 text-xs">Invested: <span className="text-blue-300">{formatMoney(data.invested)}</span></p>
                <p className="text-gray-400 text-xs">Current: <span className="text-green-400">{formatMoney(data.current)}</span></p>
            </div>
        );
    }
    return null;
};

const FooterStat = ({ label, value, color, isPnL }) => {
    const colors = {
        blue: "border-blue-500 text-blue-400",
        purple: "border-purple-500 text-purple-400",
        green: "border-green-500 text-green-400"
    };
    return (
        <div className={`bg-[#1E1E30] p-6 rounded-2xl border-l-4 ${colors[color]}`}>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-1">{label}</p>
            <p className="text-xl font-black text-white">
                {isPnL && value >= 0 ? "+" : ""}{formatMoney(value)}
            </p>
        </div>
    );
};

export default Barchart;