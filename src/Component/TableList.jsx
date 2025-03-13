import React, { useState } from "react";
import UploadExcelTest from "./UploadExcelTest";

const TestList = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  // Hardcoded test data (Replace with API call in future)
  const tests = [
    { testName: "Math Test", category: "Engineering", duration: "60 min", passingMarks: 40, totalMarks: 100 },
    { testName: "Physics Test", category: "Diploma", duration: "45 min", passingMarks: 30, totalMarks: 80 },
    { testName: "Chemistry Test", category: "Pharmacy", duration: "50 min", passingMarks: 35, totalMarks: 90 },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">Test List</h3>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Test Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Passing Marks</th>
            <th className="border p-2">Total Marks</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{test.testName}</td>
              <td className="border p-2">{test.category}</td>
              <td className="border p-2">{test.duration}</td>
              <td className="border p-2">{test.passingMarks}</td>
              <td className="border p-2">{test.totalMarks}</td>
              <td className="border p-2">
                <button
                  onClick={() => setSelectedTest(test)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  View Excel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Upload Excel component when a test is selected */}
      {selectedTest && (
      <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Excel Data for {selectedTest.testName}</h3>
      <UploadExcelTest test={selectedTest} />
    </div>
     )}
    </div>
  );
};

export default TestList;
