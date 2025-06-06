import React, { useState, useEffect, useRef } from "react";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";

const MultiSelectDropdown = ({ label, name, options, formik }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Ensure field is always an array (Fix Prefill Issue)
  useEffect(() => {
    if (!Array.isArray(formik.values[name])) {
      try {
        const parsedValue = JSON.parse(formik.values[name] || "[]");
        formik.setFieldValue(name, Array.isArray(parsedValue) ? parsedValue : []);
      } catch {
        formik.setFieldValue(name, []);
      }
    }
  }, [formik.values[name], formik.setFieldValue, name]);

  const selectedValues = Array.isArray(formik.values[name]) ? formik.values[name] : [];

  // ✅ Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // ✅ Handle checkbox selection
  const handleSelect = (option) => {
    if (selectedValues.includes(option)) {
      formik.setFieldValue(name, selectedValues.filter((item) => item !== option));
    } else {
      formik.setFieldValue(name, [...selectedValues, option]);
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Validation Handling
  const getError = () => formik?.errors?.[name];
  const isTouched = formik?.touched?.[name];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-lg font-semibold text-blue-900 mb-2">{label}</label>

      {/* Dropdown Trigger */}
      <div
        className="border border-gray-300 rounded-lg px-4 py-3 bg-white flex justify-between items-center cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
        onClick={toggleDropdown}
      >
        <span className="text-gray-700 font-medium truncate w-[90%]">
          {selectedValues.length > 0 ? selectedValues.join(", ") : "Select Options"}
        </span>
        {isOpen ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown className="text-gray-500" />}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-20 bg-white border border-gray-300 rounded-lg w-full mt-2 shadow-xl max-h-60 overflow-y-auto animate-fadeIn">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleSelect(option)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 flex items-center justify-center border-2 transition-all duration-300 rounded-md ${
                  selectedValues.includes(option)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-400 bg-white"
                }`}
              >
                {selectedValues.includes(option) && <FaCheck className="text-white text-sm" />}
              </div>
              <span className="text-gray-700 font-medium">{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* ✅ Show validation error message when touched & error exists */}
      {isTouched && getError() && (
        <p className="text-red-500 text-sm mt-1 font-semibold">{getError()}</p>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
