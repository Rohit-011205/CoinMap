import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import API from "../API";

const AddHoldingModal = ({ coin, isOpen, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState(coin?.current_price || "");
  const [buyDate, setBuyDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (coin?.current_price) {
      setBuyPrice(coin.current_price);
    }
  }, [coin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || !buyPrice) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(quantity) <= 0 || Number(buyPrice) <= 0) {
      toast.error("Quantity and Buy Price must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/portfolio/holdings/add", {
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        quantity: Number(quantity),
        buyPrice: Number(buyPrice),
        buyDate: buyDate,
        currentPrice: coin.current_price,
      });

      if (res.data.success) {
        toast.success("Holding added successfully!");
        onSuccess?.();
        onClose();
        setQuantity("");
        setBuyPrice(coin.current_price);
      } else {
        toast.error(res.data.message || "Failed to add holding");
      }
    } catch (error) {
      console.error("Error adding holding:", error);
      toast.error(error.response?.data?.message || "Failed to add holding");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !coin) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f0f1e] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Add to Holdings</h2>
            <p className="text-gray-400 text-sm mt-1">{coin.name} ({coin.symbol.toUpperCase()})</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Coin Info */}
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl p-4 mb-6 border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
            <span className="text-white font-semibold">${coin.current_price.toLocaleString()}</span>
          </div>
          <p className="text-gray-400 text-xs">Current Market Price</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quantity Input */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1 block mb-2">
              Quantity
            </label>
            <input
              type="number"
              step="0.00000001"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/40 border border-white/10 focus:border-purple-500/50 text-white rounded-xl px-4 py-3 outline-none transition-all"
            />
          </div>

          {/* Buy Price Input */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1 block mb-2">
              Buy Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/40 border border-white/10 focus:border-purple-500/50 text-white rounded-xl px-4 py-3 outline-none transition-all"
            />
          </div>

          {/* Buy Date Input */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1 block mb-2">
              Purchase Date
            </label>
            <input
              type="date"
              value={buyDate}
              onChange={(e) => setBuyDate(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-purple-500/50 text-white rounded-xl px-4 py-3 outline-none transition-all [color-scheme:dark]"
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-white/5 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Investment:</span>
              <span className="text-white font-semibold">
                ${(Number(quantity) * Number(buyPrice) || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add to Holdings"}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHoldingModal;
