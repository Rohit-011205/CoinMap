import React from "react";
import { useNavigate } from "react-router-dom";
import logo4 from '../assets/final.png'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 z-10 flex fixed top-4 left-0 right-0 items-center justify-between">
      
      {/* Left Section: Logo and Title */}
      <div className="flex items-center gap-2">
        <div className="w-12 md:w-16 flex items-center">
          <img 
            src={logo4} 
            className="w-full h-auto cursor-pointer" 
            alt="logo"
            onClick={() => navigate("/")} 
          />
        </div>
        <div className="head flex items-center">
          <a 
            className="btn btn-ghost text-2xl md:text-3xl p-0 min-h-0 h-auto hover:bg-transparent"
            onClick={() => navigate("/")}
          >
            Coinmap
          </a>
        </div>
      </div>

      {/* Right Section: Login Button */}
      <div className="flex items-center">
        <button 
          className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-300 hover:text-white border border-zinc-800 hover:border-purple-500 px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-300 bg-transparent"
          onClick={() => navigate("/Login")}
        >
          Login
        </button>
      </div>

    </div>
  );
};

export default Navbar;