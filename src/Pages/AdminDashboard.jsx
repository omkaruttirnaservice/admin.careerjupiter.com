// import { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";     //for Line graph
// import "chart.js/auto";
// import { FaUsers, FaUniversity, FaFileUpload } from "react-icons/fa";

// const AdminDashboard = () => {
//   // States management for cards
//   const [stats, setStats] = useState({
//     students: 1200,
//     universities: 250,
//     uploads: 85,
//   });

//   // Recent Activity Section
//   const recentActivity = [
//     { id: 1, action: "New student added: John Doe", time: "5 mins ago" },
//     { id: 2, action: "Excel file uploaded", time: "10 mins ago" },
//     { id: 3, action: "University updated: XYZ College", time: "20 mins ago" },
//   ];

//   // Chat Section Handled
//   const chartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "New College",
//         data: [50, 70, 120, 150, 200, 250],
//         borderColor: "#2563eb",
//         backgroundColor: "rgba(37, 99, 235, 0.5)",
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="p-6 bg-blue-50 min-h-screen">
//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

//           {/* Students Card */}
//           <div className="bg-blue-600 text-white p-5 rounded-xl flex items-center shadow-lg">
//             <FaUsers className="text-4xl mr-4" />
//             <div>
//               <h2 className="text-xl font-semibold">Total College</h2>
//               <p className="text-2xl font-bold">{stats.students}</p>
//             </div>
//           </div>

//           {/* Universities Card */}
//           <div className="bg-blue-500 text-white p-5 rounded-xl flex items-center shadow-lg">
//             <FaUniversity className="text-4xl mr-4" />
//             <div>
//               <h2 className="text-xl font-semibold">Total Universities</h2>
//               <p className="text-2xl font-bold">{stats.universities}</p>
//             </div>
//           </div>

//           {/* Uploads Card */}
//           <div className="bg-blue-400 text-white p-5 rounded-xl flex items-center shadow-lg">
//             <FaFileUpload className="text-4xl mr-4" />
//             <div>
//               <h2 className="text-xl font-semibold">Total Uploads</h2>
//               <p className="text-2xl font-bold">{stats.uploads}</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity & Chart Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* Recent Activity */}
//           <div className="bg-white p-5 rounded-xl shadow-lg">
//             <h2 className="text-xl font-semibold text-blue-700 mb-3">
//               Recent Activity
//             </h2>
//             <ul className="space-y-2">
//               {recentActivity.map((activity) => (
//                 <li key={activity.id} className="border-b pb-2">
//                   <p className="text-gray-700">{activity.action}</p>
//                   <span className="text-sm text-gray-500">{activity.time}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* view all button */}
//             <button className="mt-3 text-blue-600 hover:underline">
//               View All
//             </button>
//           </div>

//           {/* Chart */}
//           <div className="bg-white p-5 rounded-xl shadow-lg">
//             <h2 className="text-xl font-semibold text-blue-700 mb-3">
//               New College Registered
//             </h2>
//             <Line data={chartData} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;

// import { useState } from "react";
// import { Doughnut, Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import { FaUniversity, FaSchool, FaChalkboardTeacher } from "react-icons/fa";

// const AdminDashboard = () => {
//   // Stats Data
//   const stats = {
//     universities: 250,
//     colleges: 1200,
//     classes: 850,
//   };

//   // Donut Chart Data
//   const donutData = {
//     labels: ["Universities", "Colleges", "Classes"],
//     datasets: [
//       {
//         data: [stats.universities, stats.colleges, stats.classes],
//         backgroundColor: ["#2563eb", "#10b981", "#f59e0b"],
//         hoverBackgroundColor: ["#1e40af", "#059669", "#d97706"],
//       },
//     ],
//   };

//   // Histogram Data
//   const barData = {
//     labels: ["Diploma", "Engineering", "Pharmacy", "HSC", "SSC", "UG", "PG"],
//     datasets: [
//       {
//         label: "Total IQ Tests",
//         data: [50, 120, 80, 90, 100, 60, 40],
//         backgroundColor: "rgba(37, 99, 235, 0.8)",
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {/* University Card */}
//         <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center shadow-md">
//           <FaUniversity className="text-3xl mr-3" />
//           <div>
//             <h2 className="text-lg font-semibold">Total Universities</h2>
//             <p className="text-2xl font-bold">{stats.universities}</p>
//           </div>
//         </div>

//         {/* College Card */}
//         <div className="bg-green-500 text-white p-4 rounded-lg flex items-center shadow-md">
//           <FaSchool className="text-3xl mr-3" />
//           <div>
//             <h2 className="text-lg font-semibold">Total Colleges</h2>
//             <p className="text-2xl font-bold">{stats.colleges}</p>
//           </div>
//         </div>

//         {/* Classes Card */}
//         <div className="bg-yellow-500 text-white p-4 rounded-lg flex items-center shadow-md">
//           <FaChalkboardTeacher className="text-3xl mr-3" />
//           <div>
//             <h2 className="text-lg font-semibold">Total Classes</h2>
//             <p className="text-2xl font-bold">{stats.classes}</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Donut Chart */}
//         <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center">
//           <h2 className="text-lg font-semibold text-blue-700 mb-3">Data Distribution</h2>
//           <div className="w-64">
//             <Doughnut data={donutData} />
//           </div>
//         </div>

//         {/* Histogram */}
//         <div className="bg-white p-5 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold text-blue-700 mb-3">IQ Test Count by Category</h2>
//           <div className="w-full h-64">
//             <Bar data={barData} />
//           </div>
//         </div>
//         </div>

//         {/* Recent Activity */}
//       <div className="bg-white p-5 rounded-lg shadow-md mt-6">
//         <h2 className="text-lg font-semibold text-blue-700 mb-3">Recent Activity</h2>
//         <ul className="space-y-2 text-gray-700">
//           <li>📌 New IQ Test added for Engineering Category</li>
//           <li>📌 1200 students registered this month</li>
//           <li>📌 New College added: XYZ Institute of Technology</li>
//           <li>📌 Admission season starting next week</li>
//         </ul>
//       </div>
//       </div>
//     // </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl"
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaUniversity, FaSchool, FaChalkboardTeacher } from "react-icons/fa";
import { FiActivity, FiUserPlus, FiBookOpen, FiCalendar } from "react-icons/fi";

const AdminDashboard = () => {
  // Stats Data
  const [stats, setStats] = useState({
    universities: 180,
    colleges: 150,
    classes: 30 ,
  });

  useEffect (() => {
    const fetchStats = async () => {
    try {
      const [collegesRes, universitiesRes, classesRes] = await Promise.all([
        // axios.get(`${API_BASE_URL}/api/college/all`),
        axios.get(`${API_BASE_URL}/api/university/all`),
        // axios.get(`${API_BASE_URL}/api/classes/all`), // Replace with actual API
      ]);

      setStats({
        universities: Array.isArray(universitiesRes.data) ? universitiesRes.data.length : 0,
        colleges: Array.isArray(collegesRes.data) ? collegesRes.data.length : 0,
        classes: Array.isArray(classesRes.data) ? classesRes.data.length : 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error?.response?.data || error.message);
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

  // Histogram Data
  const barData = {
    labels: ["Diploma", "Engineering", "Pharmacy", "HSC", "SSC", "UG", "PG"],
    datasets: [
      {
        label: "Total IQ Tests",
        data: [50, 120, 80, 90, 100, 60, 40],
        backgroundColor: "rgba(79, 70, 229, 0.8)",
      },
    ],
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
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Data Distribution</h2>
          <div className="w-64">
            <Doughnut data={donutData} />
          </div>
        </div>

        {/* Histogram */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">IQ Test Count by Category</h2>
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

