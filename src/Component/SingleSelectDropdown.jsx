import React from "react";

const SingleSelectDropdown = ({
  label,
  name,
  options = [],
  formik,
  placeholder = "Select an option",
}) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="mb-4 w-full">
      <label className="block text-blue-800 font-semibold mb-2">{label}</label>
      <select
        id={name}
        name={name}
        {...formik.getFieldProps(name)}
        className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all ${
          error
            ? " focus:ring-0"
            : "border-gray-300 focus:ring-2 focus:ring-blue-400"
        }`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[name]}</p>}
    </div>
  );
};

export default SingleSelectDropdown;
