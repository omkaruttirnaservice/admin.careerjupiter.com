import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { getCookie } from "../utlis/cookieHelper";
import {
  HomeIcon,
  ClipboardCheckIcon,
  CogIcon,
  LogoutIcon,
  UserCircleIcon,
  MenuIcon,
  UserAddIcon,
} from "@heroicons/react/solid"; // ✅ HeroIcons
import { FaUserGraduate } from "react-icons/fa";
import { clearAuthCookies } from "../utlis/cookieHelper";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", emoji: "🌞", color: "#facc15" }; // yellow
  if (hour < 16)
    return { text: "Good Afternoon", emoji: "☀️", color: "#fb923c" }; // orange
  return { text: "Good Evening", emoji: "🌙", color: "#60a5fa" }; // blue
};

const navigation = [
  {
    name: "Dashboard",
    href: "/vendor-class/class-dashboard",
    icon: HomeIcon,
    color: "text-blue-400",
  },
  {
    name: "Manage Class",
    href: "/vendor-class/edit-vendor-class",
    icon: ClipboardCheckIcon,
    color: "text-green-400",
  },
  //  { name: "Faculty", href: "/vendor-class/class-faculty", icon: UserAddIcon, color: "text-yellow-400" },
  // { name: "Course", href: "/vendor-class/class-courses", icon: BookAIcon, color: "text-teal-400" },
];

const ClassVendorSideMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [classDetails, setClassDetails] = useState(null);
  const [classId, setClassId] = useState(null); // ✅ State for classId
  const greeting = getGreeting();

  // ✅ Update activeLink when URL changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

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

  useEffect(() => {
    const storedClassId = getCookie("classId"); // ✅ Use getCookie function

    if (storedClassId) {
      setClassId(storedClassId);
      console.log("Class ID retrieved from cookies-------:", storedClassId);
    } else {
      console.warn("Class ID not found in cookies!");
    }
  }, []);

  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classId}`
        );
        console.log("Class details fetched:", response.data);

        const classData = response.data?.data?.class; // ✅ Ensure correct path
        console.log("---------- class data", classData);

        setClassDetails({
          ...classData,
        });
      } catch (error) {
        console.error(
          "Error fetching class details:",
          error.response?.data.errMsg || error?.response?.data || error.message
        );
      }
    };

    fetchClassDetails();
  }, [classId]);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg z-50 h-screen transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <div className="flex flex-col pt-5 pb-4 overflow-y-auto h-full">
        {/* ✅ Mobile Menu Close Button */}
        <button
          className="absolute top-4 right-4 text-white md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* <MenuIcon className="w-8 h-8" /> */}
        </button>

        {/* ✅ Profile Section */}
        <div className="flex flex-col items-center text-white mb-6">
          <FaUserGraduate className="h-16 w-16 text-blue-300" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mt-2 text-lg font-semibold flex items-center space-x-2"
          >
            {/* Greeting Text */}
            <motion.span
              className="block"
              style={{ color: greeting.color }}
              animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {greeting.text}
            </motion.span>

            {/* Emoji */}
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
            Ready to make your class shine!
          </motion.p>
        </div>

        {/* ✅ Navigation Links */}
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
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md transform scale-105"
                    : "text-gray-300 hover:bg-blue-600 hover:text-white"
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

export default ClassVendorSideMenu;
