import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen p-0 gap-2">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          collapsed ? "w-20" : "w-1/5"
        } rounded-lg shadow-md flex-shrink-0`}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Main Area */}
      <div
        className={`flex flex-col ${
          collapsed ? "w-full" : "w-4/5"
        } rounded-md shadow-lg overflow-hidden`}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
