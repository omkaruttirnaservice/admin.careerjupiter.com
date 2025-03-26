// import React from 'react';
// import { Outlet } from 'react-router-dom'; // Outlet for rendering child routes
// import SideMenu from '../Pages/SideMenu'; // Import the SideMenu component

// const Root = () => {
//   return (
//     <div className="flex">
//       <SideMenu /> {/* Sidebar will be displayed on the left */}
//       <div className="flex-1 p-4 md:pl-64 bg-blue-100 overflow-hidden"> {/* Add left padding to account for the sidebar */}
//         <Outlet /> {/* Only render child routes here */}
//       </div>
//     </div>
//   );
// };

// export default Root;


import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // ✅ Import useLocation
import SideMenu from "../Pages/SideMenu"; // Import the SideMenu component

const Root = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // ✅ Check if the current path is Login page

  return (
    <div className="flex">
      {/* ✅ Hide Sidebar on Login Page */}
      {!isLoginPage && <SideMenu />}  

      <div className={`flex-1 p-4 ${!isLoginPage ? "md:pl-64" : ""} bg-blue-100 overflow-hidden`}>
        <Outlet /> {/* Only render child routes here */}
      </div>
    </div>
  );
};

export default Root;
