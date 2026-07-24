
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CollegeTestDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test;

  if (!test) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        <p className="text-lg mb-4">No test data found. Please go back.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:scale-105 transition"
        >
          ← Go Back
        </button>
      </div>
    );
  }

return (
  <div className="max-w-7xl mx-auto sm:px-6">
    <div className="bg-blue-50 rounded-lg shadow-xl pt-12 px-4 lg:p-10 border border-blue-100 h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800">{test.title}</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1 font-medium">Student Test Statistics</p>
        </div>
     <button
  onClick={() => navigate(-1)}
  className="inline-block px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 transition-all duration-200"
>
  ← Back to Tests
</button>

      </div>

{test.collegeWiseTestStats?.length > 0 ? (
  <div className="overflow-auto max-h-[80vh] rounded-lg border border-gray-200 shadow-md ">
    <table className="min-w-full text-sm text-gray-800">
      <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-100 via-purple-200 to-blue-100 shadow-sm">
        <tr className="text-xs uppercase tracking-wider text-blue-900">
          <th className="px-6 py-4 text-left">Student Name</th>
          <th className="px-6 py-4 text-center">Mobile No.</th>
          <th className="px-6 py-4 text-center">Test Count</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {test.collegeWiseTestStats.map((student, idx) => (
          <tr
            key={idx}
            className="hover:bg-gray-50 transition duration-200 ease-in-out"
          >
            <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
              {student.name || (
                <span className="italic text-gray-400">N/A</span>
              )}
            </td>
            <td className="px-6 py-4 text-md text-center text-gray-700">
              {student.mobile_no}
            </td>
            <td className="px-6 py-4 text-center font-bold text-indigo-600">
              {student.testCount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-gray-500 mt-6 text-center italic">
    No students have attempted this test yet.
  </p>
)}


    </div>
  </div>
);

};

export default CollegeTestDetailsPage;
