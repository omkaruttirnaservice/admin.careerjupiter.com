// import React from "react";
// import { useParams } from "react-router-dom";

// const ViewExcelPage = () => {
//   const { testId } = useParams();

//   const questions = [
//     { 
//       id: 1, 
//       question: "What is React?", 
//       options: ["Library", "Framework", "Language", "None"], 
//       answer: "Library", 
//       marks: 2 
//     },
//     { 
//       id: 2, 
//       question: "What is JSX?", 
//       options: ["JS", "XML", "Both", "None"], 
//       answer: "Both", 
//       marks: 3 
//     },
//   ];

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-blue-100 to-purple-100 shadow-xl rounded-lg">
//       <h3 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
//         📄 Test ID: {testId}
//       </h3>

//       {questions.map((q, index) => (
//         <div key={q.id} className="mb-6 p-6 bg-white border-l-8 border-blue-500 shadow-md rounded-lg">
//           <p className="text-lg font-semibold text-gray-900">
//             {index + 1}. {q.question}
//           </p>
//           <div className="mt-3 space-y-2">
//             {q.options.map((option, i) => (
//               <p key={i} 
//                  className="ml-6 p-2 border rounded-md cursor-pointer transition-all duration-300 
//                             hover:bg-blue-200 hover:text-blue-800">
//                 {String.fromCharCode(65 + i)}) {option}
//               </p>
//             ))}
//           </div>
//           <p className="mt-4 font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-lg inline-block">
//             ✅ Correct Answer: {q.answer}
//           </p>
//           <p className="mt-1 text-gray-600 text-sm">🎯 Marks: {q.marks}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewExcelPage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../api/token_api";
import { API_BASE_URL } from "../../Constant/constantBaseUrl";

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

  const fetchTestDetails = async (testId) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.get(`/api/iqtest/${testId}`);
      console.log("Test Details:", response.data);
  
      if (response.data.success && response.data.data) {
        setTest(response.data.data);
      } else {
        setError("No test found.");
      }
    } catch (err) {
      console.error("Error fetching test details:", err);
      setError("Failed to fetch test details");
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
                  q.correctAns === optionLetter || q.correctAns === optionValue;

                  return(
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
