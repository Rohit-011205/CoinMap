import React from "react";
import Login from "../pages/Login.jsx"
import { useNavigate } from "react-router-dom";
import logo4 from '../assets/final.png'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-2xl container mx-auto px- md:px-20 px-4 z-10 flex fixed top-4 left-0 right-0  gap-  flex flex-wrap " >
      <div className=" flex flex-1 flex-row">
        <span className="w-20 h-auto flex">
          <img src={logo4} className="w-60 h-auto" />
          </span>
        <div className="head flex items-center">
          <a className="btn btn-ghost text-3xl">Coinmap</a>
        </div>
        {/* <img
          src={logo4}
          alt="Coinmap Logo"
          className="h-20 md:h-24 w-auto object-contain cursor-pointer"
          onClick={() => navigate("/")}
        /> */}
      </div>

      <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-white ">
            Currency
            <svg
              className="ml-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-32 text-white"
          >
            <li><a>USD</a></li>
            <li><a>EUR</a></li>
            <li><a>INR</a></li>
          </ul>
        </div>
        <button 
  className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-300 hover:text-white border border-zinc-800 hover:border-purple-500 px-2 py-2 rounded-lg transition-all duration-300 bg-transparent"
  onClick={() => navigate("/Login")}
>
  Login
</button>
      </div>
    </div>
  );
};

export default Navbar;
