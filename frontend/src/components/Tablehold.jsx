import React, { useEffect, useState } from "react";
import { Trash2, Edit3, TrendingUp, TrendingDown } from "lucide-react";
import toast from "react-hot-toast";
import API from "../API";

const Tablehold = ({ data = [], onDataChange }) => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editid, setEditid] = useState(null)
  const [edit, setEdit] = useState({
    quantity: "",
    buyPrice: "",
    buyDate: "",
  })


  useEffect(() => {
    setHoldings(Array.isArray(data) ? data : []);
  }, [data]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this holding?")) return;
    try {
      setLoading(true);
      const res = await API.delete(`/portfolio/holdings/${id}`);
      if (res.data.success) {
        toast.success("Holding deleted");
        onDataChange?.();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = async (holding) => {
    setEditid(holding._id)
    setEdit({
      quantity: holding.quantity,
      buyPrice: holding.buyPrice,
      buyDate: holding.buyDate?.split('T')[0] || '',
    })
  }
  const closeedit = async () => {
    setEditid(null)
    setEdit({ quantity: "", buyPrice: "", buyDate: "" })
  }

  const handleSaveEdit = async (id) => {
    if (!edit.quantity || !edit.buyPrice) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true)

      const res = await API.put(`/portfolio/holdings/update/${id}`, {
        quantity: Number(edit.quantity),
        buyPrice: Number(edit.buyPrice),
        buyDate: edit.buyDate,
      })
      if (res.data.success) {
        toast.success("Holding updated successfully");
        closeedit();
        onDataChange?.();
      }


    } catch (error) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false)
    }
  }
    if (!holdings.length) {
      return (
        <div className="bg-[#1E1E2F] p-8 rounded-[2rem] border border-white/5 mt-6 shadow-2xl">
          <h2 className="text-white text-xl font-bold mb-4 tracking-tight">My Holdings</h2>
          <p className="text-gray-500 text-center py-10 uppercase tracking-widest text-xs font-bold">
            No holdings found. Start by adding an asset.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-[#1E1E2F] p-6 sm:p-8 rounded-[2rem] border border-white/5 mt-6 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Portfolio Assets</p>
            <h2 className="text-white text-3xl font-bold tracking-tight">My Holdings</h2>
          </div>
          <div className="bg-[#131322] px-4 py-2 rounded-xl border border-white/5">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Assets: </span>
            <span className="text-purple-400 text-sm font-black">{holdings.length}</span>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-500 text-[10px] uppercase tracking-[0.15em] font-bold">
                <th className="pb-4 px-4 text-left">Asset</th>
                <th className="pb-4 px-4 text-right">Quantity</th>
                <th className="pb-4 px-4 text-right">Buy Price</th>
                <th className="pb-4 px-4 text-right">Market Price</th>
                <th className="pb-4 px-4 text-right">Holdings Value</th>
                <th className="pb-4 px-4 text-right">P&L</th>
                <th className="pb-4 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {holdings.map((h) => {
                const pnl = h.pnl || 0;
                const isPositive = pnl >= 0;
                const isEditing = editid === h._id;

                return (
                  <tr
                    key={h._id}
                    className="group bg-[#161625] hover:bg-[#1c1c30] transition-all duration-300"
                  >
                    <td className="py-4 px-4 rounded-l-2xl border-l-2 border-transparent group-hover:border-purple-500">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-black text-xs">
                          {/* {h.symbol.charAt(0)} */}
                          <img src= {h.image} />
                        </div>
                        <div>
                          <div className="text-white font-bold tracking-wide">{h.symbol}</div>
                          <div className="text-[10px] text-gray-500 font-medium uppercase">{h.name}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right text-gray-300 font-medium">{isEditing ? (
                      <input
                        type="number"
                        value={edit.quantity}
                        onChange={(e) => setEdit({ ...edit, quantity: e.target.value })}
                        className="w-16 bg-purple-500/20 border border-purple-500 text-white rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      <span className="text-gray-300 font-medium">{h.quantity}</span>
                    )}
                    </td>

                    <td className="py-4 px-4 text-right text-gray-400 font-medium">
                      {isEditing ? (
                        <input
                          type="number"
                          value={edit.buyPrice}
                          onChange={(e) => setEdit({ ...edit, buyPrice: e.target.value })}
                          className="w-20 bg-purple-500/20 border border-purple-500 text-white rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-gray-300 font-medium">{h.buyPrice}</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right text-gray-400 font-medium">${h.currentPrice?.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-white font-black tracking-tight">${h.currentValue?.toLocaleString()}</td>

                    <td className="py-4 px-4 text-right">
                        <div className={`flex flex-col items-end ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                        <span className="text-sm font-black">{isPositive ? "+" : "-"}${Math.abs(pnl).toLocaleString()}</span>
                        <span className="text-[10px] font-bold opacity-80">{h.pnlPercent?.toFixed(2)}%</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 rounded-r-2xl">
                      <div className="flex justify-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(h._id)}
                              className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg"
                            >
                              Save
                            </button>
                            <button
                              onClick={closeedit}
                              className="p-2 text-gray-400 hover:bg-white/5 rounded-lg"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => openEdit(h)} className="p-2 text-gray-500 hover:text-white">
                              <Edit3 size={16} />
                            </button>
                            <button onClick={() => handleDelete(h._id)} className="p-2 text-gray-500 hover:text-rose-400">
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

       
        <div className="md:hidden space-y-4">
        {holdings.map((h) => {
          const isEditing = editid === h._id;
          const isPositive = h.pnl >= 0;
          
          return (
            <div key={h._id} className="bg-zinc-900/40 rounded-3xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">{h.symbol.image}
                  <img src= {h.image}/>
                  </div>
                  <span className="font-bold text-lg text-white">{h.symbol}</span>
                </div>
                <div className={`text-right font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  <p className="text-lg">${h.pnl?.toFixed(2)}</p>
                  <p className="text-[10px] opacity-60 uppercase tracking-tighter">{h.pnlPercent?.toFixed(2)}%</p>
                </div>
              </div>

        
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">Quantity</p>
                  {isEditing ? (
                    <input type="number" value={edit.quantity} onChange={(e) => setEdit({...edit, quantity: e.target.value})} className="w-full bg-black border border-purple-500/50 rounded p-1 text-sm"/>
                  ) : (
                    <p className="text-white font-medium">{h.quantity}</p>
                  )}
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">Entry Price</p>
                  {isEditing ? (
                    <input type="number" value={edit.buyPrice} onChange={(e) => setEdit({...edit, buyPrice: e.target.value})} className="w-full bg-black border border-purple-500/50 rounded p-1 text-sm"/>
                  ) : (
                    <p className="text-white font-medium">${h.buyPrice}</p>
                  )}
                </div>
              </div>

  
              <div className="flex gap-2 pt-4">
                {isEditing ? (
                  <>
                    <button onClick={() => handleSaveEdit(h._id)} className="flex-1 bg-emerald-500 text-black py-3 rounded-2xl font-bold text-xs">Save Changes</button>
                    <button onClick={closeedit} className="flex-1 bg-zinc-800 text-white py-3 rounded-2xl font-bold text-xs">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => openEdit(h)} className="flex-1 bg-white/5 text-zinc-300 py-3 rounded-2xl font-bold text-xs">Modify</button>
                    <button onClick={() => handleDelete(h._id)} className="flex-1 bg-rose-500/10 text-rose-500 py-3 rounded-2xl font-bold text-xs">Delete</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    );
  };

export default Tablehold;
