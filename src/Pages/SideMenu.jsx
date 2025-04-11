import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  ChartBarIcon,
  AcademicCapIcon,
  OfficeBuildingIcon,
  LibraryIcon,
  PlusCircleIcon,
  BookOpenIcon,
  ClipboardListIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
} from "@heroicons/react/solid"; // Using solid icons
import { useState } from "react";

// Navigation Items with Custom Colors
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, color: "text-blue-400" },
  { name: "Manage Colleges", href: "/colleges", icon: LibraryIcon, color: "text-green-400" },
  { name: "Manage University", href: "/university-details", icon: OfficeBuildingIcon, color: "text-purple-400" },
  { name: "Add New College", href: "/add-college", icon: PlusCircleIcon, color: "text-yellow-400" },
  { name: "Add New University", href: "/university", icon: AcademicCapIcon, color: "text-red-400" },
  { name: "Manage Classes", href: "/class-list", icon: BookOpenIcon, color: "text-blue-500" },
  // { name: "Add Class", href: "/register-class", icon: ClipboardListIcon, color: "text-orange-400" },
  { name: "IQ Test", href: "/iq-test", icon: PresentationChartBarIcon, color: "text-indigo-400" },
  { name: "Reports & Analytics", href: "/reports", icon: ChartBarIcon, color: "text-teal-400" },
  { name: "View Profile", href: "/profile", icon: UserCircleIcon, color: "text-pink-400" },
];

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0 px-4 mb-4">
          <img
            className="h-12 w-12 rounded-full border-2 border-white shadow-lg"
            src="https://cdn-icons-png.flaticon.com/128/4345/4345672.png"
            alt="Logo"
          />
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = activeLink === item.href;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveLink(item.href);
                  navigate(item.href);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300  cursor-pointer
                ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md transform scale-105"
                    : "text-gray-300 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    isActive ? "text-white" : `${item.color}`
                  }`}
                />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;


