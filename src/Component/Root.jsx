import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet for rendering child routes
import SideMenu from '../Pages/SideMenu'; // Import the SideMenu component

const Root = () => {
  return (
    <div className="flex">
      <SideMenu /> {/* Sidebar will be displayed on the left */}
      <div className="flex-1 p-4 md:pl-64 bg-blue-100 overflow-hidden"> {/* Add left padding to account for the sidebar */}
        <Outlet /> {/* Only render child routes here */}
      </div>
    </div>
  );
};

export default Root;
