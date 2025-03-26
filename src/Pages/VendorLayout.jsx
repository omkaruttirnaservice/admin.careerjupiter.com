import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ClassVendorSideMenu from "./ClassVendorSideMenu";
import { MdMenu } from "react-icons/md";

const VendorLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Mobile menu state

  return (
    <>
    {/* // <div className="flex h-screen"> */}
      {/* ✅ Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden  cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MdMenu size={24} />
      </button>

      {/* ✅ Sidebar (Hidden on Mobile, Visible on Desktop) */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-transform duration-300 z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <ClassVendorSideMenu />
      </div>

      {/* ✅ Main Content (Expands when Sidebar Closes) */}
      {/* <div className={`flex-1 p-6 bg-gray-100 overflow-auto transition-all duration-300 ${isMenuOpen ? "ml-0" : "ml-64"} md:ml-64`}> */}
      <div className=" bg-gray-100 overflow-auto transition-all duration-300 ">

        <Outlet />
      </div>

      {/* ✅ Overlay (For Mobile) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    {/* // </div> */}
    </>
  );
};

export default VendorLayout;
