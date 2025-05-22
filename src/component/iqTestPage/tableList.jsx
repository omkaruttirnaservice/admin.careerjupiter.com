import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../constant/constantBaseUrl";
import AddTest from "./addTest";

const TableList = () => {
  const { mainCategoryId, category } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   if (mainCategoryId) {
  //     fetchTests(mainCategoryId);
  //   }
  // }, [mainCategoryId]);

  useEffect(() => {
    console.log("mainCategoryId:", mainCategoryId);
    console.log("category:******************", category);
    if (mainCategoryId) {
      fetchTests(mainCategoryId);
    }
  }, [mainCategoryId, category]);

  const fetchTests = async (mainCategoryId) => {
    setLoading(true);
    setError(null);
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/iqtest/test-list-for-admin`,
        { type: mainCategoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("token: //////", token);
      console.log("API Response:", response.data);
      console.log("Sent Category to API:", mainCategoryId);

      if (response.data && Array.isArray(response.data.data)) {
        setTests(response.data.data);
        console.log(selectedCategory, "**************");
        console.log("*******", response.data.data, "*****");
      } else {
        setTests([]);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
      Swal.fire({
        icon: "Warning",
        title: "Oops...",
        text:
          err.response?.data?.errMsg ||
          "Failed to fetch data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTest = () => {
    setSelectedCategory(category);
    setSelectedId(mainCategoryId);
    setShowModal(true);
  };

  const handleTestAdded = () => {
    fetchTests(mainCategoryId); 
    setShowModal(false); 
  };
  

  const handleDelete = async (testId) => {
    const result = await Swal.fire({
      title: "Are you sure ?",
      text: "Do you want to delete this test ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = Cookies.get("token");
        await axios.delete(`${API_BASE_URL}/api/iqtest/delete-test/${testId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("Deleted!", "Test has been deleted.", "success");
        fetchTests(mainCategoryId);
      } catch (error) {
        Swal.fire(
          "Warning!",
          error.response?.data?.errMsg || "Failed to delete test.",
          "warning"
        );
        console.error("Failed to delete test" || error.response?.data?.errMsg);
      }
    }
  };

  return (
    <div className="max-w-full h-full mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">IQ Tests 🧠</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all cursor-pointer"
          onClick={handleAddTest}
        >
          + Add Test
        </button>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-blue-500 font-semibold">Loading...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {/* Scrollable Table */}
      <div className="overflow-y-auto max-h-155 rounded-lg shadow-lg">
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
                <td className="p-3" style={{ whiteSpace: "nowrap", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>{test.title}</td>
                <td className="p-3">{test.testDuration.minutes || "N/A"}</td>
                {/* <td className="p-3">{test.passingMarks || "--"}</td> */}
                <td className="p-3">{test.totalMarks || "N/A"}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all cursor-pointer"
                    onClick={() => navigate(`/view-excel/${test._id}`)}
                  >
                    📂 View
                  </button>

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all cursor-pointer ml-2"
                    onClick={() => {
                      handleDelete(test._id);
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <AddTest
          onClose={() => setShowModal(false)}
          onTestAdded={handleTestAdded} 
          mainCategoryId={selectedId}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default TableList;
