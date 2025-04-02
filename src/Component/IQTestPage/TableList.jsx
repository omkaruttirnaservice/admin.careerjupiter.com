
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AddTest from "./AddTest";
import { API_BASE_URL } from "../../Constant/constantBaseUrl";



const TableList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    if (formattedCategory) {
      fetchTests(formattedCategory);
    }
  }, [formattedCategory]);
  console.log("Category", formattedCategory)

  const fetchTests = async (selectedCategory) => {
    setLoading(true);
    setError(null);

    // Get Token from Cookies
    const token = Cookies.get("token");
    console.log("Token", token);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/iqtest?type=${selectedCategory}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set Auth Header
        },
      });

      console.log("API Response:",response.data);

      if (response.data && Array.isArray(response.data.data)) {
                setTests(response.data.data);
              } else {
                setTests([]);
              }
        // setError("Failed to fetch tests");
      // }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {formattedCategory} IQ Tests 🧠
        </h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Add Test
        </button>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-blue-500 font-semibold">Loading...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {/* Scrollable Table */}
      <div className="overflow-y-auto max-h-120 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white z-20">
            <tr>
              <th className="p-3 text-left">Test Name</th>
              <th className="p-3 text-left">Duration (min)</th>
              {/* <th className="p-3 text-left">Passing Marks</th> */}
              <th className="p-3 text-left">Total Marks</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {tests.map((test, index) => (
              <tr
                key={test._id}
                className={`border-b hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3">{test.title}</td>
                <td className="p-3">{test.testDuration || "N/A"}</td>
                {/* <td className="p-3">{test.passingMarks || "--"}</td> */}
                <td className="p-3">{test.totalMarks || "N/A"}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all cursor-pointer"
                    onClick={() => navigate(`/view-excel/${test._id}`)}
                  >
                    📂 View 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showModal && <AddTest onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TableList;
