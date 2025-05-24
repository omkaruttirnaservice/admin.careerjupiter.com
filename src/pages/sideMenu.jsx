import mainLogo from "../assets/mainLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
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
  LibraryBig,
  Building2,
  Map,
  Settings2,
  RouteIcon,
} from "lucide-react";
import { clearAuthCookies } from "../utlis/cookieHelper";
import Swal from "sweetalert2";

//SideMenu Navigation Routes
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
    name: "Roadmap",
    icon: Map,
    color: "text-red-400",
    children: [
      {
        name: "Manage Type ",
        href: "/manage-type",
        icon: Settings2,
        color: "text-blue-400",
      },
      {
        name: "Manage Roadmap",
        href: "/manage-roadmap",
        icon: RouteIcon,
        color: "text-green-400",
      },
    ],
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuthCookies();
        window.location.href = "/"; // Hard reload + redirect
      }
    });
  };

  return (
    <div className="hidden md:flex md:w-64 flex-col md:fixed md:inset-y-0 bg-gray-900 shadow-xl z-10">
      {/* Fixed Logo Section */}
      <div className="flex flex-col items-center justify-center mb-2 mt-5 px-4 py-2 border-b border-gray-700 bg-gray-900 z-20">
        <div className="bg-blue-100 rounded-full border-4 border-white shadow h-20 w-20 flex items-center justify-center">
          <img className="h-16 w-16" src={mainLogo} alt="Logo" />
        </div>
        <h4 className="text-lg font-extrabold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mt-2">
          CAREER JUPITER
        </h4>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto pt-2">
        <nav className="px-4 space-y-2 mb-6">
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

            // Navigates to the specified route on click.
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
          })}
        </nav>
      </div>

      {/* Fixed Logout Button */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <button
          className="flex items-center w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
          onClick={handleLogout}
        >
          <LogoutIcon className="h-6 w-6 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
