import React from "react";
import logo4 from "../assets/final.png"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbartwo = () => {

  const navigate = useNavigate()

  const storedUser = localStorage.getItem("user");
  const parsed = storedUser ? JSON.parse(storedUser) : null;
  const user = parsed || { username: "Guest" };

  const firstLetter = user.username?.charAt(0).toUpperCase() ??"G";


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/Login");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-base-100 bor">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-2 h-16 flex items-center  justify-between">

        {/* Logo */}
        {/* <div className="text-3xl font-bold  cursor-pointer">
          Coin<span className="text-white">Map</span>
        </div>   */}

        <div className=" flex flex-1 flex-row">
          <span className="w-20 h-auto flex">
            <img src={logo4} className="w-60 h-auto" />
          </span>
          <div className="head flex items-center">
            <a className="btn btn-ghost text-3xl">Coinmap</a>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap md:gap-2">

          {/* Search */}
          {/* <div className="absolute left-3 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div> */}
          <div className="relative flex items-center group">
            <div className="absolute left-3 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="
        h-9 rounded-xl text-xs bg-[#0A0A0A] text-white placeholder-zinc-600 
        border border-zinc-800 focus:border-purple-600 focus:outline-none 
        transition-all duration-300 pl-10
        w-32 sm:w-48 md:w-64 lg:w-80
      "
            />
          </div>
          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="relative flex items-center justify-center p-0.5 rounded-full hover:bg-white/5 transition-all outline-none"
            >
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 group-hover:from-purple-600/40 group-hover:to-indigo-600/40 transition-all"></div>

              {/* The Avatar */}
              <div className="relative w-9 h-9 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                <span className="text-white font-serif italic text-sm tracking-tighter">
                  {firstLetter}
                </span>
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Luxury Dropdown Menu */}
            <ul
              tabIndex={0}
              className="dropdown-content mt-4 p-2 shadow-2xl bg-[#0A0A0A] border border-zinc-800 rounded-xl w-44 text-zinc-400"
            >
              <li className="px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold border-b border-zinc-900 mb-1">
                User Account
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500/80 hover:text-red-500 hover:bg-red-500/5 py-2.5 text-xs font-semibold transition-colors"
                >
                  Terminate Session
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbartwo;
