import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../api/token_api";
import { API_BASE_URL } from "../../Constant/constantBaseUrl";
import Swal from "sweetalert2";

const ViewExcelPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (testId) {
      fetchTestDetails(testId);
    }
  }, [testId]);

  const fetchTestDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/iqtest/${testId}`);
      console.log("Test Details:", response.data);

      if (response.data.success && response.data.data) {
        setTest(response.data.data);
      } else {
        setError("No test found.");
        Swal.fire({
          icon: "warning",
          title: "No Tests Available",
          text: "We couldn't find any tests. Please try again later.",
          confirmButtonColor: "#f0ad4e",
        });
      }
    } catch (err) {
      console.error("Error fetching test details:", err);

      const errorMessage =
        err.response?.data?.errMsg ||
        err.response?.data?.usrMsg ||
        err.response?.data?.message ||
        "Failed to fetch test details";

      setError(errorMessage); // Still setting error for UI

      Swal.fire({
        icon: "warning",
        title: "Failed Fetching Test Details",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main content - takes full remaining space */}
      <div className="flex-1 p-6 overflow-auto bg-gradient-to-r from-blue-100 to-purple-100 shadow-xl rounded-lg">
        <h3 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          📄 {test?.title || "Test Details"}
        </h3>

        {loading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {test?.questions?.length > 0 ? (
          test.questions.map((q, index) => (
            <div
              key={q._id}
              className="mb-6 p-6 bg-white border-l-8 border-blue-500 shadow-md rounded-lg"
            >
              <p className="text-lg font-semibold text-gray-900">
                {index + 1}. {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {["optionA", "optionB", "optionC", "optionD"].map((key, i) => {
                  const optionValue = q[key]; // Option value (e.g., "V = IR")
                  const optionLetter = String.fromCharCode(65 + i); // A, B, C, D

                  // Check if correctAns matches the letter (A/B/C/D) OR the value (e.g., "V = IR")
                  const isCorrect =
                    q.correctAns === optionLetter ||
                    q.correctAns === optionValue;

                  return (
                    <p
                      key={i}
                      className={`ml-6 p-2 border rounded-md cursor-pointer transition-all duration-300 
                               ${
                                 isCorrect
                                   ? "bg-green-300 font-bold text-green-900"
                                   : "bg-gray-100"
                               }`}
                    >
                      {optionLetter}. {optionValue}
                    </p>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No questions available</p>
        )}
      </div>
    </div>
  );
};

export default ViewExcelPage;
