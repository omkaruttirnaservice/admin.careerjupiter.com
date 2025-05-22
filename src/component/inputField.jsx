import React from "react";

const InputField = ({ label, type, name, placeholder, value, onChange, formik, disabled }) => {
  
  // ✅ Function to safely access nested values
  const getNestedValue = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

  // ✅ Ensure Formik is defined before accessing values
  const getValue = () => {
    if (formik && formik.values) {
      return getNestedValue(formik.values, name) || "";
    }
    return value || ""; // ✅ Fallback to manually passed value
  };

  const handleChange = (e) => {
    if (formik && formik.handleChange) {
      formik.handleChange(e);
    } else if (onChange) {
      onChange(e); // ✅ Fallback to manually passed onChange
    }
  };

  // ✅ Fix for handling validation errors
  const getError = () => getNestedValue(formik?.errors, name);
  const isTouched = getNestedValue(formik?.touched, name);

  return (
    <div className="mb-2">
      <label className="text-blue-900 font-semibold block mb-2 text-lg">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}  // ✅ Uses either Formik or manual onChange
        onBlur={formik?.handleBlur}  // ✅ Avoids error if formik is undefined
        value={getValue()}  // ✅ Uses either Formik or manual value
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none transition-all duration-200
          ${disabled ? "bg-gray-200 cursor-not-allowed" : "border-blue-300 focus:ring-2 focus:ring-blue-500"}`}
      />
      {isTouched && getError() && (
        <p className="text-red-500 text-sm mt-2 font-semibold">{getError()}</p>
      )}
    </div>
  );
};

export default InputField;
