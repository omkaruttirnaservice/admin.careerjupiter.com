import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaUniversity, FaSchool, FaChalkboardTeacher } from "react-icons/fa";
import { FiActivity, FiUserPlus, FiBookOpen, FiCalendar } from "react-icons/fi";
import api from "../api/token_api"; // ✅ Correct Import

const categories = [
  "Diploma",
  "Engineering",
  "Pharmacy",
  "HSC",
  "SSC",
  "Under Graduate",
  "Post Graduate"
];

const AdminDashboard = () => {
  // Stats Data
  const [stats, setStats] = useState({
    universities: 180,
    colleges: 150,
    classes: 30,
  });
  const [iqTestCounts, setIqTestCounts] = useState([]);


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
          error?.response?.data || error.message
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
              console.error(`Error fetching ${category}:`, err?.response?.data || err.message);
              return 0; // Default to 0 if request fails
            }
          })
        );
    
        console.log("Final IQ Test Counts:", responses); // Debugging log
        setIqTestCounts(responses);
      } catch (error) {
        console.error("Error fetching IQ Test data:", error?.response?.data || error.message);
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

  // Histogram Data
  const barData = {
    labels:categories,
    datasets: [
      {
        label: "Total IQ Tests",
        data: iqTestCounts,
        backgroundColor: "rgba(79, 70, 229, 0.8)",
      },
    ],
  };
  console.log("Updated IQ Test Counts:", iqTestCounts);

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
            <Bar data={barData} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
          <FiActivity className="mr-2 text-blue-600" /> Recent Activity
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-700">
            <FiBookOpen className="text-green-500 text-xl mr-2" />
            <span>New IQ Test added for Engineering Category</span>
          </li>
          <li className="flex items-center text-gray-700">
            <FiUserPlus className="text-purple-500 text-xl mr-2" />
            <span>1200 students registered this month</span>
          </li>
          <li className="flex items-center text-gray-700">
            <FaUniversity className="text-indigo-500 text-xl mr-2" />
            <span>New College added: XYZ Institute of Technology</span>
          </li>
          <li className="flex items-center text-gray-700">
            <FiCalendar className="text-orange-500 text-xl mr-2" />
            <span>Admission season starting next week</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
