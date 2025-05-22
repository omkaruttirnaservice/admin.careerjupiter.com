
import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // ✅ Import useLocation
import SideMenu from "../pages/sideMenu";

const Root = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/add-admin" || location.pathname === "/add-college" || location.pathname === "/university";


  return (
    <div className="flex">
      {/* ✅ Hide Sidebar on Login Page */}
      {!isLoginPage && <SideMenu />}  

      <div className={`flex-1  ${!isLoginPage ? "md:pl-64" : ""} bg-blue-100 overflow-hidden min-h-lvh`}>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Root;
