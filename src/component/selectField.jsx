import React from "react";

const SelectField = ({ label, name, options, formik, disabled = false, onChange }) => (
  <div className="mb-3">
    <label className="text-blue-900 font-semibold block mb-2 text-lg">{label}</label>
    <div className="relative">
    <select
      name={name}
      onChange={(e) => {
        formik.handleChange(e);
        if (onChange) onChange(e); // ✅ Calls extra function if provided
      }}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      disabled={disabled} // ✅ Disable if needed (for district)
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-white text-gray-800 
        focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all 
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:border-blue-400 hover:shadow-lg"}`}
    >
      <option value="">Select</option>
      {options.map((option, index) => (
        <option key={index} value={option} className="text-gray-700">
          {option}
        </option>
      ))}
    </select>
    </div>

    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
    )}
  </div>
);

export default SelectField;
