// import React from "react";

// const InputField = ({ label, type, name, formik }) => {
//   // ✅ Extract nested values correctly for Formik
//   const getValue = (name) => {
//     return name.split('.').reduce((obj, key) => obj?.[key], formik.values) || "";
//   };

//   return (
//     <div className="mb-2">
//       <label className="text-blue-900 font-semibold block mb-2 text-lg">
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={getValue(name)}
//         className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//       />
//       {formik.touched[name] && formik.errors[name] && (
//         <p className="text-red-500 text-sm">{formik.errors[name]}</p>
//       )}
//     </div>
//   );
// };

// export default InputField;


import React from "react";

const InputField = ({ label, type, name, placeholder, value, onChange, formik }) => {
  // ✅ Ensure Formik is defined before accessing values
  const getValue = () => {
    if (formik && formik.values) {
      return name.split('.').reduce((obj, key) => obj?.[key], formik.values) || "";
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
        className="w-full px-4 py-3 border border-blue-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
      {formik?.touched?.[name] && formik?.errors?.[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default InputField;
