
import React from "react";

const CheckboxGroup = ({ label, name, options, formik }) => {
  const handleChange = (event) => {
    const { value, checked } = event.target;
    let updatedValues = [...formik.values[name]];
    console.log(formik.values[name])

    if (checked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter((item) => item !== value);
    }
    //console.log(name,updatedValues)
  formik.setFieldValue(name, updatedValues);
  };

  return (
    <div className="mb-5 p-4 border border-blue-300 rounded-xl shadow-lg bg-white">
      <label className="text-blue-900 font-semibold block mb-3 text-lg">{label}</label>
      <div className="flex gap-3 flex-wrap">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 shadow-md hover:bg-blue-100 transition-all duration-200"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={formik.values[name].includes(option)}
              onChange={handleChange}
              className="accent-blue-500 w-5 h-5"
            />
            <span className="text-gray-700 font-medium">{option}</span>
          </label>
        ))}
      </div>

      {/* Validation Error Message */}
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-600 mt-2 text-sm font-semibold">
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};

export default CheckboxGroup;

