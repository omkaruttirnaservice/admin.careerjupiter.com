
import React from "react";

const RadioGroup = ({ label, name, options, formik }) => {
  // ✅ Get 
  //  and touched state for validation
  const getError = () => formik?.errors?.[name];
  const isTouched = formik?.touched?.[name];

  return (
    <div className="mb-5 p-5 border border-blue-200 rounded-xl shadow-md bg-gradient-to-r from-blue-50 to-white">
      <label className="text-blue-900 font-semibold block mb-3 text-lg">{label}</label>
      <div className="lg:flex lg:flex-wrap gap-3 flex-row">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center space-x-2 px-3 py-3 rounded-xl shadow-md transition-all cursor-pointer mb-2 
              ${
                formik.values[name] === option
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105"
                  : "bg-white border border-gray-300 hover:bg-blue-100 hover:shadow-lg"
              }`}
          >
            <input
              type="radio" 
              name={name}
              value={option}
              checked={formik.values[name] === option}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // ✅ Handle blur event for validation
              className="hidden"
            />
            <span
              className={`w-6 h-6 flex items-center justify-center border-2 rounded-full transition-all 
                ${
                  formik.values[name] === option
                    ? "bg-white border-white shadow-md"
                    : "border-gray-400"
                }`}
            >
              {formik.values[name] === option && (
                <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
              )}
            </span>
            <span className="font-medium text-lg">{option}</span>
          </label>
        ))}
      </div>

      {/* ✅ Show validation error message when touched & error exists */}
      {isTouched && getError() && (
        <p className="text-red-500 text-sm mt-2 font-semibold">{getError()}</p>
      )}
    </div>
  );
};

export default RadioGroup;
