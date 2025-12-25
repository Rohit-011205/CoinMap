import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../API";

const Holding = () => {
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [buyDate, setBuyDate] = useState("");
    const [name, setName] = useState(""); 
    const [currentPrice, setCurrentPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [MarketCoins, setMarketCoins] = useState([])

    // Calculations
    const totalInvestment = (Number(quantity) * Number(buyPrice)) || 0;
    const currentValue = (Number(quantity) * (currentPrice || 0)) || 0;
    const profitLoss = currentValue - totalInvestment;
    const isProfit = profitLoss >= 0;

    useEffect(() => {
        const fetchMarketCoins = async () => {
            try {
                const res = await API.get("/market/top")
                if (res.data.success) {
                    setMarketCoins(res.data.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch market coins:", error);
                toast.error("Failed to load coins");
                console.log(error.message)
            }
        }
        fetchMarketCoins()
    }, [])

    useEffect(() => {
        if (!symbol) {
            setCurrentPrice(null);
            setName("");
            return;
        }

        const coin = MarketCoins.find((c) => c.symbol.toUpperCase() === symbol);
        if (coin) {
            setCurrentPrice(coin.current_price);
            setName(coin.name);
        }
    }, [symbol, MarketCoins]);


    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setBuyDate(today);
    }, []);

    const addHolding = async (e) => {
        e.preventDefault()

        if (!symbol || !quantity || !buyPrice) {
            toast.error("Please fill all required fields");
            return;
        }

        if (Number(quantity) <= 0 || Number(buyPrice) <= 0) {
            toast.error("Quantity and Buy Price must be greater than 0");
            return;
        }

        setLoading(true)

        try {
            const res = await API.post("/portfolio/holdings/add", {
                symbol: symbol.toUpperCase(),
                name: name || symbol,
                quantity: Number(quantity),
                buyPrice: Number(buyPrice),
                buyDate: buyDate || new Date(),
                currentPrice: currentPrice || Number(buyPrice),
            })
            if (res.data.success) {
                toast.success("Holding added successfully!");

                // ✅ Reset form
                setSymbol("");
                setName("");
                setQuantity("");
                setBuyPrice("");
                setBuyDate(new Date().toISOString().split("T")[0]);
                setCurrentPrice(null);
            } else {
                toast.error(res.data.message || "Failed to add holding");
            }
        } catch (error) {
            console.error("Error adding holding:", error);
            toast.error(error.response?.data?.message || "Failed to add holding");
        }
        finally {
            setLoading(false)
        }
    }

    return (
        // Container stretches to fill the screen minus sidebar width (lg:pl-64)
        <div className="min-h-screen bg-transparent text-white pt-24 pb-12 px-6 lg:ml-20 transition-all">
            {/* Subtle Aesthetic Accents */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-purple-900/10 blur-[140px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                
                {/* --- LEFT: Editorial Header --- */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-px bg-purple-500"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Asset Management</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none">
                            Entry <span className="font-serif italic text-purple-500">Terminal</span>
                        </h1>
                        <p className="text-zinc-500 text-sm md:text-base max-w-sm font-light leading-relaxed">
                            Initialize a new position. Our engine cross-references real-time exchange data to calculate projected delta and liquidation metrics.
                        </p>
                    </div>

                    {/* Dynamic Stats for Luxury Feel */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="border-l border-white/5 pl-4 py-2">
                            <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">Status</p>
                            <p className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Encrypted
                            </p>
                        </div>
                        <div className="border-l border-white/5 pl-4 py-2">
                            <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">Latency</p>
                            <p className="text-xs font-mono text-zinc-300">24ms</p>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: The Form & Summary --- */}
                <div className="lg:col-span-7">
                    <form onSubmit={addHolding} className="space-y-8">
                        
                        {/* Input Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 bg-zinc-900/20 border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-md">
                            
                            <div className="md:col-span-2 group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block transition-colors group-focus-within:text-purple-400">Select Asset</label>
                                <select
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-lg font-light focus:border-purple-500 focus:outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-zinc-950">Choose cryptocurrency...</option>
                                    {MarketCoins.map((coin) => (
                                        <option key={coin.id} value={coin.symbol.toUpperCase()} className="bg-zinc-950">
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block group-focus-within:text-purple-400">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-lg font-light focus:border-purple-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block group-focus-within:text-purple-400">Buy Price (USD)</label>
                                <input
                                    type="number"
                                    value={buyPrice}
                                    onChange={(e) => setBuyPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-lg font-light focus:border-purple-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-2 group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block group-focus-within:text-purple-400">Transaction Date</label>
                                <input
                                    type="date"
                                    value={buyDate}
                                    onChange={(e) => setBuyDate(e.target.value)}
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-lg font-light focus:border-purple-500 focus:outline-none transition-all [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* --- Summary Bar --- */}
                        <div className="flex flex-col md:flex-row items-center gap-6 bg-zinc-900/40 p-6 rounded-2xl border border-white/5">
                            <div className="flex-1 space-y-1">
                                <p className="text-[9px] uppercase tracking-widest text-zinc-500">Market Valuation</p>
                                <p className="text-2xl font-light">${currentValue.toLocaleString()}</p>
                            </div>
                            
                            <div className="hidden md:block w-px h-10 bg-zinc-800"></div>

                            <div className="flex-1 space-y-1">
                                <p className="text-[9px] uppercase tracking-widest text-zinc-500">Unrealized P/L</p>
                                <p className={`text-2xl font-light ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                    {isProfit ? '↑' : '↓'} ${Math.abs(profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            <button
                                type="submit" 
                                disabled={loading}
                                className="w-full md:w-auto px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-purple-500 hover:text-white transition-all duration-500 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "Processing..." : "Commit Transaction"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Holding;