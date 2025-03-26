
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import AddTest from "./AddTest";

// const TableList = () => {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const tests = [
//     { id: 1, name: "React Basics", duration: 30, passingMarks: 20, totalMarks: 50 },
//     { id: 2, name: "JS Fundamentals", duration: 40, passingMarks: 25, totalMarks: 60 },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto text-center">
//       <h2 className="text-2xl font-bold mb-4">Tests for {category}</h2>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600" onClick={() => setShowModal(true)}>Add Test</button>

//       <table className="w-full border-collapse border border-gray-300 shadow-lg">
//         <thead>
//           <tr className="bg-blue-200">
//             <th className="border border-gray-300 px-4 py-2">Test Name</th>
//             <th className="border border-gray-300 px-4 py-2">Duration (min)</th>
//             <th className="border border-gray-300 px-4 py-2">Passing Marks</th>
//             <th className="border border-gray-300 px-4 py-2">Total Marks</th>
//             <th className="border border-gray-300 px-4 py-2">View Excel</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tests.map((test) => (
//             <tr key={test.id} className="hover:bg-gray-100">
//               <td className="border border-gray-300 px-4 py-2">{test.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{test.duration}</td>
//               <td className="border border-gray-300 px-4 py-2">{test.passingMarks}</td>
//               <td className="border border-gray-300 px-4 py-2">{test.totalMarks}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button onClick={() => navigate(`/view-excel/${test.id}`)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">View</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && <AddTest onClose={() => setShowModal(false)} />}
//     </div>
//   );
// };

// export default TableList;


// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import AddTest from "./AddTest";

// const TableList = () => {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const tests = [
//     { id: 1, name: "React Basics", duration: 30, passingMarks: 20, totalMarks: 50 },
//     { id: 2, name: "JS Fundamentals", duration: 40, passingMarks: 25, totalMarks: 60 },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto text-center">
//       <h2 className="text-2xl font-bold mb-4">Tests for {category}</h2>
//       <button 
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-all"
//         onClick={() => setShowModal(true)}
//       >
//         Add Test
//       </button>

//       <table className="w-full border-collapse border border-gray-300 shadow-lg">
//         <thead>
//           <tr className="bg-blue-200">
//             <th className="border border-gray-300 px-4 py-2">Test Name</th>
//             <th className="border border-gray-300 px-4 py-2">Duration (min)</th>
//             <th className="border border-gray-300 px-4 py-2">Passing Marks</th>
//             <th className="border border-gray-300 px-4 py-2">Total Marks</th>
//             <th className="border border-gray-300 px-4 py-2">View Excel</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tests.map((test) => (
//             <tr key={test.id} className="hover:bg-gray-100">
//               <td className="border border-gray-300 px-4 py-2">{test.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{test.duration}</td>
//               <td className="border border-gray-300 px-4 py-2">{test.passingMarks}</td>
//               <td className="border border-gray-300 px-4 py-2">{test.totalMarks}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button 
//                   onClick={() => navigate(`/view-excel/${test.id}`)} 
//                   className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal Popup */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
//             <button 
//               onClick={() => setShowModal(false)} 
//               className="absolute top-2 right-3 text-gray-600 text-lg font-bold hover:text-red-500"
//             >
//               ✖
//             </button>
//             <AddTest onClose={() => setShowModal(false)} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableList;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../../Constant/constantBaseUrl";
// import AddTest from "./AddTest";
// import api from "../../api/token_api";

// const TableList = () => {
//     const { category } = useParams(); // Get category from URL
//     const navigate = useNavigate();
//     const [tests, setTests] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [showModal, setShowModal] = useState(false); // State for popup


//     useEffect(() => {
//         if (category) {
//             fetchTests(category);
//         }
//     }, [category]);

    
//     const fetchTests = async (selectedCategory) => {
//       setLoading(true);
//       setError(null);
    
//       try {
//         const response = await api.get(`/api/iqtest?type=${selectedCategory}`);
//         console.log("Data:", response.data);
    
//         if (response.data && Array.isArray(response.data.data)) {
//           setTests(response.data.data);
//         } else {
//           setTests([]);
//         }
//       } catch (error) {
//         console.error("Error fetching tests:", error);
//         setError("Failed to fetch tests");
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     // Fetch data when component mounts
//     useEffect(() => {
//       fetchTests("someCategory"); // Replace 'someCategory' with actual category
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             {/* Header with Add Test Button */}
//             <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold mb-4">{category} IQ Tests</h2>
//             <button
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                     onClick={() => setShowModal(true)}
//                 >
//                     + Add Test
//                 </button>
//             </div>

//             {loading && <p className="text-blue-500">Loading...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {tests.length === 0 ? (
//                 <p className="text-gray-500">No tests available</p>
//             ) : (
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border border-gray-300 p-2">Test Name</th>
//                             <th className="border border-gray-300 p-2">Duration (min)</th>
//                             <th className="border border-gray-300 p-2">Passing Marks</th>
//                             <th className="border border-gray-300 p-2">Total Marks</th>
//                             <th className="border border-gray-300 p-2">View Excel</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tests.map((test) => (
//                             <tr key={test._id} className="hover:bg-gray-100">
//                                 <td className="border border-gray-300 p-2">{test.title}</td>
//                                 <td className="border border-gray-300 p-2">{test.testDuration || "N/A"}</td>
//                                 <td className="border border-gray-300 p-2">{test.passingMarks || "--"}</td>
//                                 <td className="border border-gray-300 p-2">{test.totalMarks || "N/A"}</td>
//                                 <td className="border border-gray-300 p-2">
//                                     <button
//                                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                         onClick={() => navigate(`/view-excel/${test._id}`)}
//                                     >
//                                         View Excel
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//              {/* Show AddTest Component as a Popup */}
//              {showModal && (
//                 <AddTest onClose={() => setShowModal(false)} />
//             )}
//         </div>
//     );
// };

// export default TableList;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/token_api";
import AddTest from "./AddTest";

const TableList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (category) {
      fetchTests(category);
    }
  }, [category]);

  const fetchTests = async (selectedCategory) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/iqtest?type=${selectedCategory}`);
      console.log("Data:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setTests(response.data.data);
      } else {
        setTests([]);
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
      setError("Failed to fetch tests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {category} IQ Tests 🧠
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
              <th className="p-3 text-left">Passing Marks</th>
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
                <td className="p-3">{test.passingMarks || "--"}</td>
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
      {showModal && (
        
            <AddTest onClose={() => setShowModal(false)} />
         
      )}
    </div>
  );
};

export default TableList;

