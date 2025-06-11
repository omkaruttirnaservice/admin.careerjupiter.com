import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';

const RoadmapMultiSelect = ({ formik }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const name = "roadmap";
  
  // Sample roadmap options - you can replace with your actual data
  const roadmapOptions = [
    { _id: "1", type: "Beginner" },
    { _id: "2", type: "Intermediate" },
    { _id: "3", type: "Advanced" },
  ];

  // Ensure field is always an array
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    const value = option._id;
    if (selectedValues.includes(value)) {
      formik.setFieldValue(
        name,
        selectedValues.filter((item) => item !== value)
      );
    } else {
      formik.setFieldValue(name, [...selectedValues, value]);
    }
  };

  // Prepare labels for display based on selectedValues
  const selectedLabels = selectedValues
    .map((val) => {
      const found = roadmapOptions.find((opt) => opt._id === val);
      return found ? found.type : null;
    })
    .filter(Boolean);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getError = () => formik?.errors?.[name];
  const isTouched = formik?.touched?.[name];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block font-medium text-blue-800 mb-1">
        Roadmap Category
      </label>

      <div
        className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium truncate">
            {selectedLabels.length > 0 ? selectedLabels.join(", ") : "Select Roadmap Categories"}
          </span>
          {isOpen ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown className="text-gray-500" />}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-20 bg-white border-2 border-blue-200 rounded-xl w-full mt-1 shadow-lg max-h-60 overflow-y-auto">
          {roadmapOptions.map((option, index) => {
            const checked = selectedValues.includes(option._id);

            return (
              <label
                key={index}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleSelect(option)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center border-2 transition-all duration-300 rounded-md ${
                    checked ? "bg-blue-600 border-blue-600 text-white" : "border-gray-400 bg-white"
                  }`}
                >
                  {checked && <FaCheck className="text-white text-sm" />}
                </div>
                <span className="text-gray-700 font-medium">{option.type}</span>
              </label>
            );
          })}
        </div>
      )}

      {isTouched && getError() && (
        <p className="text-red-500 text-sm mt-1">{getError()}</p>
      )}
    </div>
  );
};


export default RoadmapMultiSelect;