import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "../pages/sideMenu";

const Root = () => {

  const location = useLocation();

  const isLoginPage =
    location.pathname === "/" ||
    location.pathname === "/add-admin" ||
    location.pathname === "/add-college" ||
    location.pathname === "/university" ||
    location.pathname === "/login";


  return (

    <div className="flex min-h-screen">


      {/* Sidebar */}

      {!isLoginPage && <SideMenu />}



      {/* Main Content */}

      <div

        className={`
        flex-1
        min-h-screen
        overflow-x-hidden
        bg-gradient-to-br
        from-blue-50
        via-white
        to-indigo-50

        ${
          !isLoginPage
          ? "md:ml-80"
          : ""
        }

        `}

      >

        <Outlet />

      </div>



    </div>

  );
};


export default Root;