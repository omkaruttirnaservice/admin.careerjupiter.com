import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import CollegeVendorSideMenu from "./collegeVendorSideMenu";

const VendorCollegeLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Toggle menu button for mobile view */}
      <button
        className="fixed top-5 left-4 p-3 rounded-full shadow-md md:hidden transition-all duration-300 transform hover:scale-110 active:scale-95
                   bg-gradient-to-r from-blue-500 to-blue-700 opacity-60 hover:opacity-100 text-white z-80 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle sidebar menu
      >
        <MdMenu size={24} />
      </button>

      {/* Sidebar menu component */}
      <CollegeVendorSideMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main content area */}
      <div className="flex-1 min-h-screen bg-gray-100 transition-all duration-300 md:p-0">
        <Outlet /> {/* Loads current page content */}
      </div>

      {/* Dark overlay for mobile when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-70 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)} // Close menu when clicking outside
        ></div>
      )}
    </>
  );
};

export default VendorCollegeLayout;
