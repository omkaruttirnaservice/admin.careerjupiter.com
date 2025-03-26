import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const MultiSelectField = ({ label, name, formik }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // ✅ Prevent form submission
      handleAddItem();
    }
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      formik.setFieldValue(name, [...(formik.values[name] || []), inputValue.trim()]);
      setInputValue(""); // ✅ Clear input
    }
  };

  const handleRemove = (index) => {
    if (formik.values[name]) {
      const updatedValues = formik.values[name].filter((_, i) => i !== index);
      formik.setFieldValue(name, updatedValues);
    }
  };

  return (
    
    <div className="mb-3">
      <label className="text-blue-700 font-semibold block mb-2 text-lg">{label}</label>
      
      <div className="border border-blue-300 p-4 rounded-lg shadow-lg bg-white transition-all">
        {/* Input + Add Button */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Press Enter to add"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="button"
            onClick={handleAddItem} // ✅ Use separate function
            className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>

        {/* Added Items */}
        <div className="flex flex-wrap gap-3 mt-3">
          {formik.values[name]?.map((item, index) => (
            <span 
              key={index} 
              className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full shadow-md hover:scale-105 transition-all"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-2 text-white hover:text-gray-300 transition-all cursor-pointer"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
   
  );
};

export default MultiSelectField;
