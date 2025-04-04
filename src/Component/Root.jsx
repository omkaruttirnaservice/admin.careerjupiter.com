
import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // ✅ Import useLocation
import SideMenu from "../Pages/SideMenu"; // Import the SideMenu component

const Root = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/add-admin";


  return (
    <div className="flex">
      {/* ✅ Hide Sidebar on Login Page */}
      {!isLoginPage && <SideMenu />}  

      <div className={`flex-1  ${!isLoginPage ? "md:pl-64" : ""} bg-blue-100 overflow-hidden`}>
        <Outlet /> {/* Only render child routes here */}
      </div>
    </div>
  );
};

export default Root;
