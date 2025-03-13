import React from "react";
import UploadExcel from "./UploadExcelTest";
import AddTest from "./AddTest";

const TestDetails = ({ selectedCategory }) => {
  if (!selectedCategory) return <h3>Select a category to view tests</h3>;

  return (
    <div>
      <h2>Tests for {selectedCategory}</h2>
      <UploadExcel />
      <AddTest />
    </div>
  );
};

export default TestDetails;
