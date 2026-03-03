import React from "react";
import { NavLink } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h1 className="text-2xl font-bold mb-10 text-blue-500 tracking-wide">
          Zenvoco
        </h1>

        <nav className="space-y-3">

          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Guided Practice", path: "/guided-practice" },
            { name: "Progress", path: "/progress" },
            { name: "Profile", path: "/profile" },
            { name: "Viva Simulation", path: "/viva" },
            { name: "Learn Mode", path: "/learn" },
            { name: "Listen Mode", path: "/listen" },
            { name: "Daily Task", path: "/daily-task" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;