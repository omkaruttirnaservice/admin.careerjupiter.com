import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaSchool, FaChalkboardTeacher } from "react-icons/fa";
import { FiActivity, FiUserPlus, FiBookOpen, FiCalendar } from "react-icons/fi";
import api from "../api/token_api"; // ✅ Correct Import
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

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const categories = [
  "Diploma",
  "Engineering",
  "Pharmacy",
  "HSC",
  "SSC",
  "Under Graduate",
  "Post Graduate",
  "Begineer",
  "Basic",
];

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
    name: "Analytics",
    href: "/reports",
    icon: GiNetworkBars,
    color: "text-teal-500",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: TbUserSquareRounded,
    color: "text-red-500",
  },
];

const AdminDashboard = () => {
  // Stats Data
  const [stats, setStats] = useState({
    universities: 0,
    colleges: 0,
    classes: 0,
  });
  const [iqTestCounts, setIqTestCounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [collegesRes, universitiesRes, classesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/college/all`),
          axios.get(`${API_BASE_URL}/api/university/all`),
          axios.get(`${API_BASE_URL}/api/class/all`), // Replace with actual API
        ]);

        console.log("Colleges API Response:", collegesRes.data);
        console.log("Universities API Response:", universitiesRes.data);
        console.log("Classes API Response:", classesRes.data);

        setStats({
          universities: Array.isArray(universitiesRes.data.data.universities)
            ? universitiesRes.data.data.universities.length
            : 0,
          colleges: Array.isArray(collegesRes.data.data.colleges)
            ? collegesRes.data.data.colleges.length
            : 0,
          classes: Array.isArray(classesRes.data.data.classes)
            ? classesRes.data.data.classes.length
            : 0,
        });
      } catch (error) {
        console.error(
          "Error fetching stats:",
          error?.response?.data || error.message  || error.response?.data.errMessage 
        );
      }
    };

    const fetchIqTestCounts = async () => {
      try {
        console.log("Fetching IQ Test Counts...");

        const responses = await Promise.all(
          categories.map(async (category) => {
            try {
              const res = await api.get(`/api/iqtest?type=${category}`); // Fetch data per category
              console.log(`API Response for ${category}:`, res.data); // Debug log

              // Check if the data contains an array and return the count
              if (Array.isArray(res.data?.data)) {
                return res.data.data.length;
              } else {
                console.warn(`Unexpected response for ${category}:`, res.data);
                return 0; // Default to 0 if structure is incorrect
              }
            } catch (err) {
              console.error(
                `Error fetching ${category}:`,
                err?.response?.data || err.message ||  err.response?.data.errMessage 
              );
              return 0; // Default to 0 if request fails
            }
          })
        );

        console.log("Final IQ Test Counts:", responses); // Debugging log
        setIqTestCounts(responses);
      } catch (error) {
        console.log(
          "Error fetching IQ Test data:",
          error?.response?.data || error.message ||  error.response?.data.errMessage 
        );
      }
    };

    fetchStats();
    fetchIqTestCounts();
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

  // Data
  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Total IQ Tests",
        data: iqTestCounts,
        backgroundColor: "rgba(79, 70, 229, 0.8)",
      },
    ],
  };

  // Options
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        suggestedMax: 2, // Optional: set higher if needed
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            Data Distribution
          </h2>
          <div className="w-64">
            <Doughnut data={donutData} />
          </div>
        </div>

        {/* Histogram */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            IQ Test Count by Category
          </h2>
          <div className="w-full h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-extrabold text-blue-800 mb-6">
          🚀 Quick Shortcuts
        </h2>

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
