// import React from "react";

// const InputField = ({ label, type, name, placeholder, value, onChange, formik, disabled }) => {
  
//   // ✅ Ensure Formik is defined before accessing values
//   const getValue = () => {
//     if (formik && formik.values) {
//       return name.split('.').reduce((obj, key) => obj?.[key], formik.values) || "";
//     }
//     return value || ""; // ✅ Fallback to manually passed value
//   };

//   const handleChange = (e) => {
//     if (formik && formik.handleChange) {
//       formik.handleChange(e);
//     } else if (onChange) {
//       onChange(e); // ✅ Fallback to manually passed onChange
//     }
//   };

//    // ✅ Fix for showing validation errors correctly
//   //  const getError = () => {
//   //   return name.split('.').reduce((obj, key) => obj?.[key], formik?.errors);
//   // };
  
//   // const isTouched = name.split('.').reduce((obj, key) => obj?.[key], formik?.touched);


//   return (
//     <div className="mb-2">
//       <label className="text-blue-900 font-semibold block mb-2 text-lg">
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         onChange={handleChange}  // ✅ Uses either Formik or manual onChange
//         onBlur={formik?.handleBlur}  // ✅ Avoids error if formik is undefined
//         value={getValue()}  // ✅ Uses either Formik or manual value
//         disabled={disabled}
//         className={`w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none transition-all duration-200
//           ${disabled ? "bg-gray-200 cursor-not-allowed" : "border-blue-300 focus:ring-2 focus:ring-blue-500"}`}
//       />
//       {formik?.touched?.[name] && formik?.errors?.[name] && (
//         <p className="text-red-500 text-sm">{formik.errors[name]}</p>
//       )}
//        {/* {isTouched && getError() && <p className="text-red-500 text-sm">{getError()}</p>} */}
//     </div>
//   );
// };

// export default InputField;

import React from "react";

const InputField = ({ label, type, name, placeholder, value, onChange, formik, disabled }) => {
  // ✅ Function to retrieve nested values safely
  const getNestedValue = (path, obj) => path.split('.').reduce((o, key) => (o ? o[key] : ""), obj);

  // ✅ Function to update nested values properly
  const setNestedValue = (path, obj, value) => {
    const keys = path.split('.');
    let current = obj;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!current[key]) current[key] = {}; // Ensure object structure exists
        current = current[key];
      }
    });
  };

  // ✅ Get the actual value (Formik or manual)
  const getValue = () => {
    return formik ? getNestedValue(name, formik.values) || "" : value || "";
  };

  const handleChange = (e) => {
    if (formik && formik.setFieldValue) {
      // ✅ Properly update nested values
      const updatedValues = { ...formik.values };
      setNestedValue(name, updatedValues, e.target.value);
      formik.setValues(updatedValues);
    } else if (onChange) {
      onChange(e);
    }
  };

  // ✅ Get errors and touched for nested objects
  const error = getNestedValue(name, formik?.errors);
  const isTouched = getNestedValue(name, formik?.touched);

  return (
    <div className="mb-2">
      <label className="text-blue-900 font-semibold block mb-2 text-lg">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={formik?.handleBlur}
        value={getValue()}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none transition-all duration-200
          ${disabled ? "bg-gray-200 cursor-not-allowed" : "border-blue-300 focus:ring-2 focus:ring-blue-500"}`}
      />
      {isTouched && error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;


