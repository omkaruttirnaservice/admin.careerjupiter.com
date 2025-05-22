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
      let currentValues = formik.values[name] || [];
      let newValue = inputValue.trim();

      // ✅ Prevent duplicates (case-insensitive)
      if (
        !currentValues
          .map((val) => val.toLowerCase())
          .includes(newValue.toLowerCase())
      ) {
        formik.setFieldValue(name, [...currentValues, newValue]);
      }

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
    <div className="mb-3 w-full">
      <label className="text-blue-900 font-semibold block mb-2 text-lg">
        {label}
      </label>

      <div className="border border-blue-300 p-4 rounded-lg shadow-lg bg-white transition-all">
        {/* Input + Add Button */}
        <div className="flex flex-wrap lg:flex-nowrap sm:flex-nowrap items-center gap-2">
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Press Enter to add"
              className="w-full px-4 py-2 focus:outline-none text-base"
            />
          </div>
          <button
            type="button"
            onClick={handleAddItem} // ✅ Use separate function
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all cursor-pointer 
          flex justify-center items-center gap-2 w-full sm:w-auto "
          >
            <FaPlus className="text-lg" />
          </button>
        </div>

        {/* Added Items */}
        <div className="flex flex-wrap gap-3 mt-3">
          {formik.values[name]?.map((item, index) => (
            <span
              key={index}
              className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-2 rounded-full shadow-md 
                 hover:scale-105 transition-all text-sm sm:text-base max-w-full"
            >
              {/* ✅ Ensure proper text wrapping */}
              <span className="truncate max-w-[150px] sm:max-w-none">
                {item}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-2 text-white hover:text-gray-300 transition-all cursor-pointer flex items-center"
              >
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </span>
          ))}
        </div>
        {/* ✅ Display validation 
         below the added subjects */}
        {formik.touched[name] && formik.errors[name] && (
          <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[name]}</p>
        )}
      </div>
    </div>
  );
};

export default MultiSelectField;
