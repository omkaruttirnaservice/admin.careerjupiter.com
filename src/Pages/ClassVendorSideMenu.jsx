import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HomeIcon,
  ClipboardCheckIcon,
  CogIcon,
  LogoutIcon,
  UserCircleIcon,
  MenuIcon
} from "@heroicons/react/solid"; // ✅ HeroIcons

const navigation = [
  { name: "Dashboard", href: "/vendor-class/class-dashboard", icon: HomeIcon, color: "text-blue-400" },
  { name: "Manage Class", href: "/vendor-class/edit-vendor-class", icon: ClipboardCheckIcon, color: "text-green-400" },
  // { name: "Settings", href: "/settings", icon: CogIcon, color: "text-yellow-400" },
];

const ClassVendorSideMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);

  // ✅ Update activeLink when URL changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
         window.location.href = "/"; // ✅ Redirect to login
      };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg z-50 h-screen transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <div className="flex flex-col pt-5 pb-4 overflow-y-auto h-full">
        
                {/* ✅ Mobile Menu Close Button */}
                <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <MenuIcon className="w-8 h-8" />
        </button>

        {/* ✅ Profile Section */}
        <div className="flex flex-col items-center text-white mb-6">
          <UserCircleIcon className="h-16 w-16 text-white" />
          <h2 className="mt-2 text-lg font-semibold">Vendor Name</h2>
          <p className="text-sm text-gray-300">Class Vendor</p>
        </div>

        {/* ✅ Navigation Links */}
        <nav className="mt-2 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = activeLink === item.href;

            return (
              <button
                key={item.name}
                onClick={() => {navigate(item.href);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300
                ${isActive ? "bg-blue-500 text-white shadow-md transform scale-105" : "text-gray-300 hover:bg-blue-600 hover:text-white"}`}
              >
                <item.icon className={`mr-3 h-6 w-6 ${isActive ? "text-white" : item.color}`} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* ✅ Logout Button */}
        <button
          className="flex items-center px-4 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          onClick={handleLogout} // Implement logout logic
        >
          <LogoutIcon className="h-6 w-6 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClassVendorSideMenu;
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MdMenu, MdDashboard, MdClass, MdLogout } from "react-icons/md"; // ✅ Modern Icons

// const navigation = [
//   { name: "Dashboard", href: "/vendor-class/class-dashboard", icon: MdDashboard, color: "text-blue-400" },
//   { name: "Manage Class", href: "/vendor-class/edit-vendor-class", icon: MdClass, color: "text-green-400" },
// ];

// const ClassVendorSideMenu = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false); // ✅ Controls sidebar open/close

//   const handleLogout = () => {
//     window.location.href = "/"; // ✅ Redirect to login
//   };

//   return (
//     <>
//       {/* ✅ Mobile Menu Button
//       <button
//         className="fixed top-4 left-4 z-50 bg-blue-600 text-white rounded-full shadow-lg md:hidden"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <MdMenu size={24} />
//       </button> */}

//       {/* ✅ Sidebar */}
//       <div className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-800 shadow-lg transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
//         <div className="flex flex-col pt-5 pb-4 h-full">
//           {/* ✅ Close Button (Mobile Only) */}
//           <button
//             className="text-white self-end mr-4 md:hidden cursor-pointer"
//             onClick={() => setIsOpen(false)}
//           >
//             ✖
//           </button>

//           {/* ✅ Profile Section */}
//           <div className="flex flex-col items-center text-white mb-6">
//             <MdClass className="h-16 w-16 text-white" />
//             <h2 className="mt-2 text-lg font-semibold">Vendor Name</h2>
//             <p className="text-sm text-gray-300">Class Vendor</p>
//           </div>

//           {/* ✅ Navigation Links */}
//           <nav className="mt-2 flex-1 px-4 space-y-2">
//             {navigation.map((item) => {
//               const isActive = location.pathname.startsWith(item.href);
//               return (
//                 <button
//                   key={item.name}
//                   onClick={() => {
//                     navigate(item.href);
//                     setIsOpen(false); // ✅ Close menu after selecting
//                   }}
//                   className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
//                     isActive ? "bg-blue-500 text-white shadow-md transform scale-105" : "text-gray-300 hover:bg-blue-600 hover:text-white"
//                   }`}
//                 >
//                   <item.icon className={`mr-3 h-6 w-6 ${isActive ? "text-white" : item.color}`} />
//                   {item.name}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* ✅ Logout Button */}
//           <button
//             className="flex items-center px-4 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
//             onClick={handleLogout}
//           >
//             <MdLogout className="h-6 w-6 mr-3" />
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* ✅ Overlay (Mobile) */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default ClassVendorSideMenu;
