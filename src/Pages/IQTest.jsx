// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';

// const UploadExcel = () => {
//   const [colleges, setColleges] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Fetch default data from API
//   useEffect(() => {
//     axios
//       .get('https://jsonplaceholder.typicode.com/posts')
//       .then(response => {
//         setColleges(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching college data', error);
//       });
//   }, []);

//   // Handle Excel File Upload
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Check if file is an Excel file
//     if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
//       alert('Please upload a valid Excel file (.xlsx or .xls)');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });

//       const sheetName = workbook.SheetNames[0]; // Read the first sheet
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert sheet data to JSON

//       if (jsonData.length > 0) {
//         setColleges(jsonData); // Update table with Excel data
//         setCurrentPage(1); // Reset pagination
//       } else {
//         alert('No data found in the uploaded Excel file.');
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   // Pagination Logic
//   const totalPages = Math.ceil(colleges.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = colleges.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <>
//     <section className='border-4 border-solid border-blue-500'>
//       {/* File Upload Section */}
//       <section className='flex items-center justify-center mt-2'>
//         <div className="border-2 border-dashed w-80 h-50 border-blue-500 p-3 rounded-lg text-center bg-blue-50 cursor-pointer flex flex-col items-center justify-center">
//           <svg
//             className="h-12 w-12 text-blue-400 mb-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               vectorEffect="non-scaling-stroke"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 01-2-2z"
//             />
//           </svg>
//           <h3 className="text-lg font-semibold text-gray-700">Upload an Excel File</h3>
//           <p className="text-sm text-gray-500">Click or drag a file to upload</p>
//           <div className="mt-4">
//             <label htmlFor="fileUpload" className="cursor-pointer">
//               <input
//                 type="file"
//                 id="fileUpload"
//                 className="hidden"
//                 accept=".xlsx,.xls"
//                 onChange={handleFileUpload}
//               />
//               <div className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
//                 Select Excel File
//               </div>
//             </label>
//           </div>
//         </div>
//       </section>

//       {/* Table Section */}
//       <section className="client-details d-flex justify-center items-center  m-4 table-responsive">
//         <table className="table table-bordered w-290  table-hover bg-blue-50 shadow-lg rounded-lg">
//           <thead className="bg-blue-100 text-blue-800 p-6">
//             <tr className='border-2'>
//               {colleges.length > 0 &&
//                 Object.keys(colleges[0]).map((key) => <th className='border-2 p-3' key={key}>{key}</th>)
//               }
//             </tr>
//           </thead>
//           <tbody className="text-blue-800 bg-white text-center">
//             {currentData.length > 0 ? (
//               currentData.map((college, index) => (
//                 <tr className="hover:bg-blue-50 border-2" key={index}>
//                   {Object.values(college).map((value, i) => (
//                     <td className="border-2 p-2" key={i}>{value}</td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center">
//                   No college data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* Pagination Section */}
//       {colleges.length > itemsPerPage && (
//         <div className="flex justify-center items-center my-4">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 mx-1 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 mx-1 border rounded-lg ${
//                 currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-white text-blue-500"
//               } hover:bg-blue-500 hover:text-white`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 mx-1 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>
//       )}
//       </section>
//     </>
//   );
// };

// export default UploadExcel;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   { name: "Diploma", count: 5 },
//   { name: "Engineering", count: 8 },
//   { name: "Pharmacy", count: 3 },
//   { name: "HSC", count: 4 },
//   { name: "SSC", count: 6 },
//   { name: "UG", count: 7 },
//   { name: "PG", count: 2 },
// ];

// const IQTest = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-3xl mx-auto text-center">
//       <h1 className="text-3xl font-bold mb-6">Test Management</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         {categories.map((cat) => (
//           <div
//             key={cat.name}
//             className="bg-white p-4 shadow-md rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer"
//             onClick={() => navigate(`/tests/${cat.name}`)} // Navigate to TableList with category
//           >
//             <h3 className="text-xl font-semibold">{cat.name}</h3>
//             <p className="text-sm">Tests: {cat.count}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IQTest;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaLaptopCode, FaFlask, FaBook, FaSchool, FaUniversity, FaBriefcase } from "react-icons/fa";

const categories = [
  { name: "Diploma", icon: <FaGraduationCap className="text-5xl text-blue-600" /> },
  { name: "Engineering", icon: <FaLaptopCode className="text-5xl text-green-600" /> },
  { name: "Pharmacy", icon: <FaFlask className="text-5xl text-purple-600" /> },
  { name: "HSC", icon: <FaBook className="text-5xl text-yellow-600" /> },
  { name: "SSC", icon: <FaSchool className="text-5xl text-orange-600" /> },
  { name: "UG", icon: <FaUniversity className="text-5xl text-red-600" /> },
  { name: "PG", icon: <FaBriefcase className="text-5xl text-teal-600" /> },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">📚 Select a Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center space-y-3 
                      transition transform hover:scale-105 hover:shadow-2xl cursor-pointer border-t-4 border-blue-500"
            onClick={() => navigate(`/tests/${cat.name}`)}
          >
            {cat.icon}
            <h3 className="text-2xl font-semibold text-gray-800">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
