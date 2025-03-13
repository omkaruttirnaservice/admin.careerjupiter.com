import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";     //for Line graph
import "chart.js/auto";
import { FaUsers, FaUniversity, FaFileUpload } from "react-icons/fa";

const AdminDashboard = () => {
  // States management for cards
  const [stats, setStats] = useState({
    students: 1200,
    universities: 250,
    uploads: 85,
  });

  // Recent Activity Section
  const recentActivity = [
    { id: 1, action: "New student added: John Doe", time: "5 mins ago" },
    { id: 2, action: "Excel file uploaded", time: "10 mins ago" },
    { id: 3, action: "University updated: XYZ College", time: "20 mins ago" },
  ];

  // Chat Section Handled
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New College",
        data: [50, 70, 120, 150, 200, 250],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <>
      <div className="p-6 bg-blue-50 min-h-screen">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Students Card */}
          <div className="bg-blue-600 text-white p-5 rounded-xl flex items-center shadow-lg">
            <FaUsers className="text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total College</h2>
              <p className="text-2xl font-bold">{stats.students}</p>
            </div>
          </div>

          {/* Universities Card */}
          <div className="bg-blue-500 text-white p-5 rounded-xl flex items-center shadow-lg">
            <FaUniversity className="text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total Universities</h2>
              <p className="text-2xl font-bold">{stats.universities}</p>
            </div>
          </div>

          {/* Uploads Card */}
          <div className="bg-blue-400 text-white p-5 rounded-xl flex items-center shadow-lg">
            <FaFileUpload className="text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total Uploads</h2>
              <p className="text-2xl font-bold">{stats.uploads}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity & Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Recent Activity */}
          <div className="bg-white p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Recent Activity
            </h2>
            <ul className="space-y-2">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="border-b pb-2">
                  <p className="text-gray-700">{activity.action}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </li>
              ))}
            </ul>

            {/* view all button */}
            <button className="mt-3 text-blue-600 hover:underline">
              View All
            </button>
          </div>

          {/* Chart */}
          <div className="bg-white p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              New College Registered
            </h2>
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
