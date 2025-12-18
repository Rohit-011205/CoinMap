import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbartwo from "../components/Navbartwo.jsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbartwo expanded={expanded} setExpanded={setExpanded} />
        <main
          className=" pt-20 ml-16 lg:ml-60 transition-all duration-300 px-6">
          <Outlet />  
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
