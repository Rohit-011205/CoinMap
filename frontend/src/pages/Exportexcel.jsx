import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../API";

const Exportexcel = () => {
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        fetchHoldings();
    }, []);

    const fetchHoldings = async () => {
        try {
            setLoading(true);
            const res = await API.get("/portfolio/holdings");
            setHoldings(res.data?.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load holdings");
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            setExporting(true);

            const res = await API.get("/portfolio/export/excel", {
                responseType: "blob",
            });

            const blob = new Blob([res.data], {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");

            a.href = url;
            a.download = `portfolio-${new Date()
                .toISOString()
                .slice(0, 10)}.xlsx`;

            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
            toast.success("Portfolio exported successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to export Excel");
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-slate-200 selection:bg-purple-500/30 font-sans antialiased p-8">
            <div className="max-w-7xl mx-auto">

                {/* Minimalist Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-light tracking-tight text-white mb-1">
                            Portfolio <span className="font-semibold text-purple-500">Analytics</span>
                        </h1>
                        <p className="text-sm text-slate-500 tracking-wide uppercase font-medium">
                            Secure Data Management
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchHoldings}
                            className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 rounded-full transition-all"
                        >
                            Refresh Page
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={exporting || holdings.length === 0}
                            className="px-6 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-purple-50 transition-all shadow-lg shadow-white/5 disabled:opacity-20"
                        >
                            {exporting ? "Exporting..." : "Export to Excel"}
                        </button>
                    </div>
                </header>

                {/* Luxury Stat Cards - Adds that "Dashboard" feel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Total Assets</p>
                        <p className="text-2xl font-light text-white">{holdings.length}</p>
                    </div>
                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Platform Status</p>
                        <p className="text-2xl font-light text-emerald-400">Encrypted</p>
                    </div>
                    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Last Update</p>
                        <p className="text-2xl font-light text-purple-400">Live</p>
                    </div>
                </div>

                {/* Main Data Table */}
                <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Asset Overview</h3>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-[11px] uppercase tracking-[0.15em] text-slate-500 bg-[#0F0F0F]/50">
                                    <th className="px-8 py-4 font-semibold text-left">Asset</th>
                                    <th className="px-6 py-4 font-semibold text-left">Ticker</th>
                                    <th className="px-6 py-4 font-semibold text-right">Holdings</th>
                                    <th className="px-6 py-4 font-semibold text-right">Avg. Entry</th>
                                    <th className="px-6 py-4 font-semibold text-right">Market Price</th>
                                    <th className="px-8 py-4 font-semibold text-right italic text-purple-400">P&L Net</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-white/[0.03]">
                                {holdings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center text-slate-600 italic font-light tracking-wide">
                                            No positions currently active in vault.
                                        </td>
                                    </tr>
                                ) : (
                                    holdings.map((h, idx) => {
                                        const qty = Number(h.quantity ?? 0);
                                        const entry = Number(h.entryPrice ?? 0);
                                        const curr = Number(h.currentPrice ?? 0);
                                        const pnl = (qty * curr) - (qty * entry);

                                        return (
                                            <tr key={idx} className="group hover:bg-white/[0.01] transition-colors">
                                                <td className="px-8 py-6 text-sm font-medium text-white tracking-tight">
                                                    {h.coinName || "-"}
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-800 text-slate-400 tracking-tighter border border-white/5 group-hover:border-purple-500/30 transition-colors">
                                                        {h.symbol?.toUpperCase() || "-"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6 text-right text-sm font-mono text-slate-400">
                                                    {qty.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-6 py-6 text-right text-sm font-mono text-slate-400">
                                                    ${entry.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-6 text-right text-sm font-mono text-white">
                                                    ${curr.toFixed(2)}
                                                </td>
                                                <td className={`px-8 py-6 text-right text-sm font-mono font-semibold ${pnl >= 0 ? "text-emerald-400" : "text-rose-500"
                                                    }`}>
                                                    {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exportexcel;
