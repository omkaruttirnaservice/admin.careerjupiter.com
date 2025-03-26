// import React from "react";

// const TextAreaField = ({ label, name, formik }) => (
//   <div className="mb-3 col-span-full w-full">
//     <label className="text-blue-900 font-semibold block mb-2 text-lg">{label}</label>
//     <textarea
//       name={name}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       value={formik.values[name]}
//       placeholder="Enter details here..."
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-white text-gray-800 
//         focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none
//         hover:border-blue-400 hover:shadow-lg"
//        rows="5"
//     ></textarea>
//     {formik.touched[name] && formik.errors[name] && (
//       <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
//     )}
//   </div>
// );

// export default TextAreaField;

import React from "react";
import { getIn } from "formik"; // ✅ Import getIn to handle nested fields

const TextAreaField = ({ label, name, formik }) => {
  const minLength = 100;
  const maxLength = 1000;

  // ✅ Get the value safely from Formik
  const fieldValue = getIn(formik.values, name) || "";

  // ✅ Handle Change
  const handleChange = (e) => {
    formik.setFieldValue(name, e.target.value);
  };

  return (
    <div className="mb-3 col-span-full w-full relative">
      {/* ✅ Label */}
      <label className="text-blue-900 font-semibold block mb-2 text-lg">
        {label}
      </label>

      {/* ✅ TextArea Input */}
      <textarea
        name={name}
        value={fieldValue} // ✅ Correctly controlled by Formik
        onChange={handleChange} // ✅ Updates Formik state
        onBlur={formik.handleBlur}
        placeholder={`Enter details (Min: ${minLength} chars, Max: ${maxLength} chars)...`}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-white text-gray-800 
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none
          hover:border-blue-400 hover:shadow-lg"
        rows="5"
        maxLength={maxLength}
      ></textarea>

      {/* ✅ Character Counter (Bottom Right) */}
      <div className="absolute bottom-2 right-4 text-sm text-gray-600">
        {fieldValue.length}/{maxLength}
      </div>

      {/* ✅ Error Message (if any) */}
      {getIn(formik.touched, name) && getIn(formik.errors, name) && (
        <p className="text-red-500 text-sm mt-1">{getIn(formik.errors, name)}</p>
      )}

      {/* ✅ Warning for Minimum Length */}
      {fieldValue.length < minLength && (
        <p className="text-yellow-500 text-sm mt-1">
          Minimum {minLength} characters required.
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
