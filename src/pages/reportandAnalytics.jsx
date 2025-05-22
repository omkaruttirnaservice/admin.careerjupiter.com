import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FaChartLine, FaUniversity, FaSearch } from "react-icons/fa";

const ReportandAnalytics = () => {
  // Line Chart: Student Trends Over Months
  const studentTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Students",
        data: [120, 180, 250, 320, 400, 500],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        fill: true,
      },
    ],
  };

  // Bar Chart: Popular Universities
  const universityData = {
    labels: ["Harvard", "MIT", "Stanford", "Oxford", "Cambridge"],
    datasets: [
      {
        label: "Searches",
        data: [300, 250, 200, 180, 150],
        backgroundColor: ["#2563eb", "#1e40af", "#3b82f6", "#1d4ed8", "#60a5fa"],
      },
    ],
  };

  // Pie Chart: Search Pattern Insights
  const searchPatternData = {
    labels: ["Degree", "Diploma", "Degree", "Diploma", "Degree"],
    datasets: [
      {
        data: [40, 25, 15, 10, 10],
        backgroundColor: ["#2563eb", "#1e40af", "#3b82f6", "#1d4ed8", "#60a5fa"],
      },
    ],
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Reports & Analytics</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Student Trends */}
        <div className="bg-blue-600 text-white p-5 rounded-xl flex items-center shadow-lg">
          <FaChartLine className="text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Student Trends</h2>
            <p className="text-2xl font-bold">+25% Growth</p>
          </div>
        </div>

        {/* Popular Universities */}
        <div className="bg-blue-500 text-white p-5 rounded-xl flex items-center shadow-lg">
          <FaUniversity className="text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Top Universities</h2>
            <p className="text-2xl font-bold">Harvard, MIT, Stanford</p>
          </div>
        </div>

        {/* Search Insights */}
        <div className="bg-blue-400 text-white p-5 rounded-xl flex items-center shadow-lg">
          <FaSearch className="text-4xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Search Insights</h2>
            <p className="text-2xl font-bold">Most Searched: Engineering</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Trends Line Chart */}
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">Student Growth</h2>
          <Line data={studentTrendsData} />
        </div>

        {/* Popular Universities Bar Chart */}
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">Popular Universities</h2>
          <Bar data={universityData} />
        </div>

        {/* Search Pattern Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow-lg col-span-1 md:col-span-2 flex justify-center">
  <div className="w-64 h-75"> {/* Adjust the size */}
    <h2 className="text-xl font-semibold text-blue-700 mb-3 text-center">Search Pattern Insights</h2>
    <Pie data={searchPatternData} />
  </div>
</div>

      </div>
    </div>
  );
};

export default ReportandAnalytics;
