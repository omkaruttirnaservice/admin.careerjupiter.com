import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { getCookie, clearAuthCookies } from "../utlis/cookieHelper";
import { HomeIcon, ClipboardCheckIcon, LogoutIcon, AcademicCapIcon } from "@heroicons/react/solid";
import { FaUniversity } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { BookOpenIcon, BookOpenTextIcon, BriefcaseIcon, ChartBarIcon } from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", emoji: "🌞", color: "#facc15" };
  if (hour < 16) return { text: "Good Afternoon", emoji: "☀️", color: "#fb923c" };
  return { text: "Good Evening", emoji: "🌙", color: "#60a5fa" };
};

const navigation = [
  {
    name: "Dashboard",
    href: "/vendor-college/college-dashboard",
    icon: HomeIcon,
    color: "text-blue-400",
  },
  {
    name: "Manage College",
    href: "/vendor-college/edit-college",
    icon: AcademicCapIcon,
    color: "text-green-400",
  },
  {
    name: "Manage Courses",
    href: "/vendor-college/add-college-courses",
    icon:  BookOpenTextIcon,
    color: "text-pink-400",
  },
  {
    name: "Manage infrastructure",
    href: "/vendor-college/add-college-infrastructure",
    icon:   ChartBarIcon,
    color: "text-purple-400",
  },
  {
    name: "Manage Placement",
    href: "/vendor-college/add-college-placement",
    icon: BriefcaseIcon,
    color: "text-gray-400",
  },
];

const CollegeVendorSideMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [collegeId, setCollegeId] = useState(null);
  const greeting = getGreeting();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

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
        window.location.href = "/"; 
      }
    });
  };

  // useEffect(() => {
  //   const storedCollegeId = getCookie("collegeId");
  //   if (storedCollegeId) {
  //     setCollegeId(storedCollegeId);
  //   } else {
  //     console.warn("College ID not found in cookies!");
  //   }
  // }, []);

  // useEffect(() => {
  //   const fetchCollegeDetails = async () => {
  //     if (!collegeId) return;

  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/api/college/${collegeId}`);
  //       const collegeData = response.data?.data?.college;
  //       setCollegeDetails({ ...collegeData });
  //     } catch (error) {
  //       console.error("Error fetching college details:", error?.response?.data || error.message);
  //     }
  //   };

  //   fetchCollegeDetails();
  // }, [collegeId]);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-lg z-50 h-screen transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <div className="flex flex-col pt-5 pb-4 overflow-y-auto h-full">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-white mb-6">
          <FaUniversity className="h-16 w-16 text-blue-300" />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mt-2 text-lg font-semibold flex items-center space-x-2"
          >
            <motion.span
              className="block"
              style={{ color: greeting.color }}
              animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {greeting.text}
            </motion.span>
            <motion.span
              className="text-2xl inline-block"
              animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {greeting.emoji}
            </motion.span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-blue-200 mt-1"
          >
            Ready to build your college profile!
          </motion.p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-2 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = activeLink === item.href;
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md transform scale-105"
                    : "text-gray-300 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${isActive ? "text-white" : item.color}`}
                />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          className="flex items-center px-4 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
          onClick={handleLogout}
        >
          <LogoutIcon className="h-6 w-6 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default CollegeVendorSideMenu;