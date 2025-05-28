import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Link, useNavigate } from "react-router-dom";
import { FaUniversity, FaSchool, FaChalkboardTeacher } from "react-icons/fa";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { TbSmartHome, TbUserSquareRounded } from "react-icons/tb";
import {
  GiGraduateCap,
  GiSchoolBag,
  GiTeacher,
  GiNotebook,
  GiNetworkBars,
} from "react-icons/gi";
import { GraduationCap, Landmark, Puzzle, RouteIcon } from "lucide-react";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

//Quick Shortcuts Routes
const navigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: TbSmartHome,
    color: "text-blue-500",
  },
  {
    name: "Universities",
    href: "/university-details",
    icon: GiGraduateCap,
    color: "text-purple-600",
  },
  {
    name: "Colleges",
    href: "/colleges",
    icon: GiSchoolBag,
    color: "text-green-500",
  },
  {
    name: "Classes",
    href: "/class-list",
    icon: GiTeacher,
    color: "text-yellow-500",
  },
  {
    name: "IQ Tests",
    href: "/iq-test",
    icon: GiNotebook,
    color: "text-pink-500",
  },
  {
    name: "Road Map",
    href: "/manage-roadmap",
    icon: RouteIcon,
    color: "text-blue-500",
  },
  {
    name: "Analytics",
    href: "/reports",
    icon: GiNetworkBars,
    color: "text-red-500",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: TbUserSquareRounded,
    color: "text-purple-500",
  },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    universities: 0,
    colleges: 0,
    classes: 0,
  });
  const navigate = useNavigate();

  //Stats Data for College, Class, University
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [collegesRes, universitiesRes, classesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/college/all`),
          axios.get(`${API_BASE_URL}/api/university/all`),
          axios.get(`${API_BASE_URL}/api/class/all`),
        ]);

        setStats({
          universities: universitiesRes?.data?.data?.universities?.length || 0,
          colleges: collegesRes?.data?.data?.colleges?.length || 0,
          classes: classesRes?.data?.data?.classes?.length || 0,
        });
      } catch (error) {
        console.error(
          "Error fetching stats:",
          error?.response?.data || error.message || error.response?.data.errMsg
        );
      }
    };

    fetchStats();
  }, []);

  // Donut Chart Data
  const donutData = {
    labels: ["Universities", "Colleges", "Classes"],
    datasets: [
      {
        data: [stats.universities, stats.colleges, stats.classes],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
        hoverBackgroundColor: ["#4338CA", "#059669", "#D97706"],
      },
    ],
  };

  // To move the donut colour instruction at bottom
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 min-h-screen">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* University Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-5 rounded-lg flex items-center shadow-lg">
          <FaUniversity className="text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Universities</h2>
            <p className="text-3xl font-bold">{stats.universities}</p>
          </div>
        </div>

        {/* College Card */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-5 rounded-lg flex items-center shadow-lg">
          <FaSchool className="text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Colleges</h2>
            <p className="text-3xl font-bold">{stats.colleges}</p>
          </div>
        </div>

        {/* Classes Card */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-5 rounded-lg flex items-center shadow-lg">
          <FaChalkboardTeacher className="text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Classes</h2>
            <p className="text-3xl font-bold">{stats.classes}</p>
          </div>
        </div>
      </div>

      {/* Donut Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-extrabold text-blue-800 mb-3 tracking-wide">
            Data Distribution
          </h2>

          <div className="w-72 h-72 p-4 bg-blue-50 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-500 ease-in-out hover:scale-105">
            <Doughnut data={donutData} options={options} />
          </div>
        </div>

        {/* Added Categories Shortcut Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-extrabold text-blue-800 mb-6">
            🗂️ Add Categories
          </h2>

          {/* Added Class Category */}
          <Link
            to="/add-class-category"
            className="flex items-center bg-blue-50 p-4 rounded-lg shadow hover:bg-blue-100 cursor-pointer"
          >
            <div
              className={`w-10 h-10 text-blue-400 mr-4 flex items-center justify-center rounded-full bg-blue-200`}
            >
              <Puzzle className="w-6 h-6" />
            </div>
            <span className="font-semibold text-blue-700">
              Add Class Category
            </span>
          </Link>

          {/* Added College Category */}
          <Link
            to="/add-college-category"
            className="flex items-center bg-green-50 p-4 rounded-lg shadow hover:bg-green-100 cursor-pointer"
          >
            <div
              className={`w-10 h-10 text-green-400 mr-4 flex items-center justify-center rounded-full bg-green-200`}
            >
              <Landmark className="w-6 h-6" />
            </div>
            <span className="font-semibold text-green-700">
              Add College Category
            </span>
          </Link>

          {/* Added University Category */}
          <Link
            to="/add-university-category"
            className="flex items-center bg-purple-50 p-4 rounded-lg shadow hover:bg-purple-100 cursor-pointer"
          >
            <div
              className={`w-10 h-10 text-purple-400 mr-4 flex items-center justify-center rounded-full bg-purple-200`}
            >
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-semibold text-purple-700">
              Add University Category
            </span>
          </Link>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-extrabold text-blue-800 mb-6">
          🚀 Quick Shortcuts
        </h2>

        {/* Shortcut Cards Design  */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {navigation.map((item, idx) => {
            const baseColor = item.color?.split("-")[1] ?? "blue";
            const hoverFrom = `hover:from-${baseColor}-300`;
            const hoverBorder = `hover:border-${baseColor}-600`;
            const iconBg = `bg-${baseColor}-200`;
            const textHover = `group-hover:text-${baseColor}-800`;

            return (
              <button
                key={idx}
                onClick={() => navigate(item.href)}
                className={`group p-6 rounded-2xl bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300
 ${hoverFrom} hover:to-white shadow-md hover:shadow-2xl border border-gray-200 ${hoverBorder} transition duration-300 flex flex-col items-center justify-center transform hover:-translate-y-1`}
              >
                <div
                  className={`p-4 rounded-full ${iconBg} group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                >
                  <item.icon className={`h-10 w-10 ${item.color}`} />
                </div>
                <span
                  className={`mt-4 text-base font-semibold text-gray-800 ${textHover} transition-all`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
