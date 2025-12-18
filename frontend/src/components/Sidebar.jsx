import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Globe,
  Settings,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import ph from "../assets/ph.png";
import { useEffect } from "react";

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

  const user = {
    name: "Rohit Kadam",
    image: ph,
  };

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Market", path: "/market", icon: LineChart },
    { name: "Portfolio", path: "/portfolio", icon: Wallet },
    { name: "Global", path: "/global", icon: Globe },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-64px)]
      ${expanded ? "w-60" : "w-16"} transition-all duration-300`}
    >
      <nav className="h-full flex flex-col bg-transparent border-r border-purple-500/20 shadow-md">

        {/* Toggle */}
        <div className="py-4 my-8 flex items-center justify-between px-4">
          <p
            className={`text-white text-sm font-medium transition-all overflow-hidden
            ${expanded ? "w-auto" : "w-0"}`}
          >
            {user.name}
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
        <div className="border-t border-purple-500/20 flex items-center p-3">
          <img
            src={user.image}
            className="w-10 h-10 rounded-full ring-2 ring-purple-500/40"
            alt="User"
          />

          <div
            className={`overflow-hidden transition-all
            ${expanded ? "w-40 ml-3" : "w-0"}`}
          >
            <p className="text-xs text-gray-400">Crypto User</p>
          </div>
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
