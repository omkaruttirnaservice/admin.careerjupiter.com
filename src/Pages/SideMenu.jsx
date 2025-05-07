import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  LibraryIcon,
  OfficeBuildingIcon,
  BookOpenIcon,
  ClipboardListIcon,
  PresentationChartBarIcon,
  ChartBarIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Puzzle,
  Landmark,
  GraduationCap,
  FilePlus,
  LibraryBig,
  Building2,
} from "lucide-react";
import { clearAuthCookies } from "../Utlis/cookieHelper"; // adjust path as needed
import Swal from "sweetalert2";

// Sidebar items
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    color: "text-blue-400",
  },
  {
    name: "College",
    icon: GraduationCap,
    color: "text-green-400",
    children: [
      {
        name: "Manage Colleges",
        href: "/colleges",
        icon: Building2,

        color: "text-blue-400",
      },
      // {
      //   name: "Add New College",
      //   href: "/add-college",
      //   icon: FilePlus,
      //   color: "text-green-400",
      // },
    ],
  },
  {
    name: "University",

    icon: LibraryBig,

    color: "text-purple-400",
    children: [
      {
        name: "Manage University",
        href: "/university-details",

        icon: Building2,
        color: "text-blue-400",
      },
      {
        name: "Add New University",
        href: "/university",

        icon: FilePlus,
        color: "text-green-400",
      },
    ],
  },
  {
    name: "Manage Classes",
    href: "/class-list",
    icon: BookOpenIcon,
    color: "text-blue-500",
  },
  {
    name: "Add Categories",
    icon: ClipboardListIcon,
    color: "text-orange-400",
    children: [
      {
        name: "Add Class Category",
        href: "/add-class-category",
        icon: Puzzle,
        color: "text-blue-400",
      },
      {
        name: "Add College Category",
        href: "/add-college-category",
        icon: Landmark,
        color: "text-green-400",
      },
      {
        name: "Add University Category",
        href: "/add-university-category",
        icon: GraduationCap,
        color: "text-purple-400",
      },
    ],
  },
  {
    name: "IQ Test",
    href: "/iq-test",
    icon: PresentationChartBarIcon,
    color: "text-indigo-400",
  },
  {
    name: "Reports & Analytics",
    href: "/reports",
    icon: ChartBarIcon,
    color: "text-teal-400",
  },
  {
    name: "View Profile",
    href: "/profile",
    icon: UserCircleIcon,
    color: "text-pink-400",
  },
  // {
  //   name: "Logout",
  //   href: "/",
  //   icon: LogoutIcon,
  //   color: "text-red-800",
  // },
];

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdown = (itemName) => {
    setDropdownStates((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };
    const handleLogout = () => {
      Swal.fire({
        title: "👋 Ready to logout?",
        text: "See you soon! Want to log out now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",  // Blue
        cancelButtonColor: "#d33",      // Red
        confirmButtonText: "Yes, logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          clearAuthCookies();
           window.location.href = "/"; // 🔁 Hard reload + redirect
          // navigate("/");
         
        }
      });
    };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900 shadow-xl z-10">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img
            className="h-12 w-12 rounded-full border-2 border-white shadow-lg"
            src="https://cdn-icons-png.flaticon.com/128/4345/4345672.png"
            alt="Logo"
          />
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = activeLink === item.href;

            if (item.children) {
              const isDropdownOpen = dropdownStates[item.name] || false;

              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-white transition cursor-pointer"
                  >
                    <span className="flex items-center">
                      <item.icon className={`mr-3 h-5 w-5 ${item.color}`} />
                      {item.name}
                    </span>
                    {isDropdownOpen ? (
                      <ChevronUpIcon className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 mt-1 rounded-md shadow-inner p-2"
                      >
                        {item.children.map((child) => {
                          const isChildActive = activeLink === child.href;
                          return (
                            <button
                              key={child.name}
                              onClick={() => {
                                setActiveLink(child.href);
                                navigate(child.href);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm rounded-md transition duration-200 cursor-pointer ${
                                isChildActive
                                  ? "bg-blue-500 text-white font-semibold shadow"
                                  : "text-gray-100 hover:bg-blue-700"
                              }`}
                            >
                              <div className="flex flex-row gap-2">
                                <child.icon
                                  className={`h-5 w-5 ${child.color}`}
                                />
                                {child.name}
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Normal Items

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveLink(item.href);
                  navigate(item.href);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 cursor-pointer ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md transform scale-105"
                    : "text-gray-200 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    isActive ? "text-white" : item.color
                  }`}
                />
                {item.name}
              </button>
            );

            // Normal Items
          //   if (item.name === "Logout") {
          //     return (
          //       <button
          //         key={item.name}
          //         onClick={() => {
          //           clearAuthCookies(); // 🔹 Clear cookies
          //           setActiveLink(item.href); // Optional UI state
          //           navigate(item.href); // 🔹 Redirect to home or login
          //         }}
          //         className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 cursor-pointer text-gray-200 hover:bg-red-600 hover:text-white`}
          //       >
          //         <item.icon className={`mr-3 h-6 w-6 text-red-800`} />
          //         {item.name}
          //       </button>
          //     );
          //   } else {
          //     return (
          //       <button
          //         key={item.name}
          //         onClick={() => {
          //           setActiveLink(item.href);
          //           navigate(item.href);
          //         }}
          //         className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-300 cursor-pointer ${
          //           isActive
          //             ? "bg-blue-500 text-white shadow-md transform scale-105"
          //             : "text-gray-200 hover:bg-blue-600 hover:text-white"
          //         }`}
          //       >
          //         <item.icon
          //           className={`mr-3 h-6 w-6 ${
          //             isActive ? "text-white" : item.color
          //           }`}
          //         />
          //         {item.name}
          //       </button>
          //     );
          //   }
          })}
        </nav>
        {/* ✅ Logout Button */}
        <button
          className="flex items-center px-4 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
          onClick={handleLogout} // Implement logout logic
        >
          <LogoutIcon className="h-6 w-6 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
