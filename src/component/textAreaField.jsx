
import React from "react";
import { getIn } from "formik"; 

const TextAreaField = ({ label, name, formik }) => {
  const minLength = 100;
  const maxLength = 1000;

  // ✅ Get the value from Formik (no nested object)
  const fieldValue = getIn(formik.values, name) || "";

  // ✅ Handle Change (update value correctly)
  const handleChange = (e) => {
    formik.setFieldValue(name, e.target.value); // ✅ Store plain text
  };

  return (
    <div className="mb-3 col-span-full w-full relative">
      <label className="text-blue-900 font-semibold block mb-2 text-lg">
        {label}
      </label>

      <textarea
        name={name}
        value={fieldValue} // ✅ Directly bind plain text value
        onChange={handleChange} // ✅ Updates Formik state correctly
        onBlur={formik.handleBlur}
        placeholder={`Enter details (Min: ${minLength} chars, Max: ${maxLength} chars)...`}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-white text-gray-800 
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none
          hover:border-blue-400 hover:shadow-lg"
        rows="5"
        maxLength={maxLength}
      ></textarea>

      <div className="absolute bottom-2 right-4 text-sm text-gray-600">
        {fieldValue.length}/{maxLength}
      </div>

      {formik.touched[name] && formik.errors[name] ? (
  <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[name]}</p>
) : fieldValue.length < minLength ? (
  <p className="text-red-500 text-sm mt-2 font-semibold">
    Minimum {minLength} characters required.
  </p>
) : null}

    </div>
  );
};

export default TextAreaField;

