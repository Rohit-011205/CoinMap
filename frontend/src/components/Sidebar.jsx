import {
  LayoutDashboard,
  Heart,
  Wallet,
  ChevronFirst,
  Bitcoin,
  ChevronLast, LogOut,
} from "lucide-react";
import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import ph from "../assets/ph.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Exportexcel from "../pages/Exportexcel.jsx";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 const storedUser = localStorage.getItem("user");
  const parsed = storedUser ? JSON.parse(storedUser) : null;
  const user = parsed || { username: "Guest" };


  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/Login");
    }
  }


 
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Holdings", path: "/Holding", icon: Wallet },
    // { name: "Watchlist", path: "/Holdin ", icon: Heart },
    { name: "Market Coins", path: "/MarketCoins", icon: Bitcoin },
    { name: "export", path: "/exportexcel", icon: Bitcoin },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-64px)]
      ${expanded ? "w-60" : "w-16"} transition-all duration-300 z-[99999]`}
    >
      <nav className="h-full flex flex-col bg-transparent border-r border-purple-500/20 shadow-md">

        {/* Toggle */}
        <div className="py-4 my-8 flex items-center justify-between px-4">
          <p
            className={`text-white text-sm font-medium transition-all overflow-hidden
            ${expanded ? "w-auto" : "w-0"}`}
          >
            {user.username  }
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 flex items-center"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Navigation */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2 space-y-1">
            {links.map((link, i) => (
              <SidebarItem
                key={i}
                to={link.path}
                icon={<link.icon size={20} />}
                text={link.name}
              />
            ))}
          </ul>
        </SidebarContext.Provider>


        {/* User */}
        <div className="p-4">
           <button
            onClick={handleLogout}
            className={`group flex items-center gap-3 py-3 px-3 rounded-xl border border-zinc-800 hover:border-red-900/50 hover:bg-red-950/10 transition-all duration-300 
              ${expanded ? "w-full justify-start" : "w-full justify-center"}`}
          >
            <LogOut size={16} className="text-zinc-500 group-hover:text-red-500" />
            {expanded && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-white-500 group-hover:text-red-500">
                Terminate
              </span>
            )}
          </button>
        </div>


      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group relative flex items-center gap-3 py-2 px-3 rounded-md transition
        ${isActive
          ? "bg-purple-500/20 text-purple-400"
          : "text-gray-400 hover:bg-purple-500/10 hover:text-white"
        }`
      }
    >
      {icon}

      <span
        className={`overflow-hidden transition-all
        ${expanded ? "w-40" : "w-0"}`}
      >
        {text}
      </span>

      {!expanded && (
        <span className="absolute left-full ml-3 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
          {text}
        </span>
      )}
    </NavLink>

  );
}
