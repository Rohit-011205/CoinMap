import React from "react";

const Navbartwo = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-base-100 bor">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-2 h-16 flex items-center  justify-between">

        {/* Logo */}
        <div className="text-3xl font-bold  cursor-pointer">
          Coin<span className="text-white">Map</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-8">

          {/* Search */}
          <input
            type="text"
            placeholder="   Search coins..."
            className="input input-sm bg-base-200 text-white placeholder-gray-400 border border-purple-500/30 focus:border-purple-500 focus:outline-none w-40 md:w-64 px-2"
          />

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-purple-500/40"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 border border-purple-500/30 rounded-box w-40"
            >
              <li>
                <a className="hover:text-purple-400">Profile</a>
              </li>
              <li>
                <a className="hover:text-purple-400">Settings</a>
              </li>
              <li>
                <a className="text-red-400 hover:bg-red-500/10">Logout</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbartwo;
