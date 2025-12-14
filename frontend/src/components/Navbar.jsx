import React from "react";


const Navbar = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto px-2 md:px-20 px-4 z-10 flex fixed top-4 left-0 right-0  gap-12   " >
      <div className="flex-1">
        <a  className="btn btn-ghost text-4xl">Coinmap</a>
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
        <div className="login">
          <button className="btn bg-purple-200 text-black rounded-2xl px-4 sm:px-6">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
