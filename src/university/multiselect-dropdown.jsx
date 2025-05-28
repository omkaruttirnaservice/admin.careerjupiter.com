

// import { useState } from "react"

// const MultiSelectDropdown = ({ label, name, options = [], formik, placeholder = "Select options" }) => {
//   const [showOtherInput, setShowOtherInput] = useState(false)
//   const error = formik.touched[name] && formik.errors[name]
//   const selectedValues = formik.values[name] || []

//   const handleCheckboxChange = (option, isChecked) => {
//     let newValues = [...selectedValues]

//     if (isChecked) {
//       if (!newValues.includes(option)) {
//         newValues.push(option)
//       }
//     } else {
//       newValues = newValues.filter((value) => value !== option)
//     }

//     formik.setFieldValue(name, newValues)

//     // Check if "Other" is selected
//     setShowOtherInput(newValues.includes("Other"))
//     if (!newValues.includes("Other")) {
//       formik.setFieldValue(`${name}Other`, "")
//     }
//   }

//   const handleOtherInputChange = (e) => {
//     formik.setFieldValue(`${name}Other`, e.target.value)
//   }

//   return (
//     <div className="mb-4 w-full">
//       <label className="block text-blue-800 font-semibold mb-2">{label}</label>

//       <div className={`border rounded-lg p-3 max-h-48 overflow-y-auto ${error ? "border-red-500" : "border-gray-300"}`}>
//         {options.map((option, index) => (
//           <div key={index} className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               id={`${name}-${index}`}
//               checked={selectedValues.includes(option)}
//               onChange={(e) => handleCheckboxChange(option, e.target.checked)}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label htmlFor={`${name}-${index}`} className="ml-2 text-gray-700">
//               {option}
//             </label>
//           </div>
//         ))}

//         {/* Other option */}
//         <div className="flex items-center mb-2">
//           <input
//             type="checkbox"
//             id={`${name}-other`}
//             checked={selectedValues.includes("Other")}
//             onChange={(e) => handleCheckboxChange("Other", e.target.checked)}
//             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//           />
//           <label htmlFor={`${name}-other`} className="ml-2 text-gray-700">
//             Other
//           </label>
//         </div>
//       </div>

//       {error && <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[name]}</p>}

//       {showOtherInput && (
//         <input
//           type="text"
//           name={`${name}Other`}
//           placeholder={`Enter other ${label.toLowerCase()}`}
//           value={formik.values[`${name}Other`] || ""}
//           onChange={handleOtherInputChange}
//           onBlur={formik.handleBlur}
//           className="mt-3 w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       )}

//       {formik.touched[`${name}Other`] && formik.errors[`${name}Other`] && (
//         <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[`${name}Other`]}</p>
//       )}
//     </div>
//   )
// }

// export default MultiSelectDropdown
import { useState, useEffect } from "react";

const MultiSelectDropdown = ({ 
  label, 
  name, 
  options = [], 
  formik, 
  placeholder = "Select options" 
}) => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const error = formik.touched[name] && formik.errors[name];
  const selectedValues = formik.values[name] || [];

  // Initialize other input value if there's a custom value already
  useEffect(() => {
    const customValue = selectedValues.find(val => !options.includes(val));
    if (customValue) {
      setOtherInputValue(customValue);
      setShowOtherInput(true);
    }
  }, []);

  const handleCheckboxChange = (option, isChecked) => {
    let newValues = [...selectedValues];
    
    if (option === "Other") {
      // Handle "Other" checkbox
      setShowOtherInput(isChecked);
      if (!isChecked) {
        // Remove any custom value when "Other" is unchecked
        newValues = newValues.filter(val => options.includes(val));
        setOtherInputValue("");
      }
    } else {
      // Handle regular options
      if (isChecked) {
        if (!newValues.includes(option)) {
          newValues.push(option);
        }
      } else {
        newValues = newValues.filter(value => value !== option);
      }
    }

    formik.setFieldValue(name, newValues);
  };

  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    setOtherInputValue(value);
    
    // Update the form values
    const currentValues = [...formik.values[name]];
    const existingCustomIndex = currentValues.findIndex(val => !options.includes(val));
    
    if (value.trim()) {
      if (existingCustomIndex >= 0) {
        currentValues[existingCustomIndex] = value; // Update existing custom value
      } else {
        currentValues.push(value); // Add new custom value
      }
    } else if (existingCustomIndex >= 0) {
      currentValues.splice(existingCustomIndex, 1); // Remove empty custom value
    }
    
    formik.setFieldValue(name, currentValues);
  };

  const handleOtherInputBlur = () => {
    if (!otherInputValue.trim() && showOtherInput) {
      // If other input is empty, uncheck the "Other" option
      const checkboxes = document.querySelectorAll(`input[type="checkbox"][name^="${name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox.value === "Other") {
          checkbox.checked = false;
        }
      });
      setShowOtherInput(false);
      
      // Remove any empty custom value
      const currentValues = [...formik.values[name]].filter(val => val.trim() !== "");
      formik.setFieldValue(name, currentValues);
    }
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-blue-800 font-semibold mb-2">{label}</label>

      <div className={`border rounded-lg p-3 max-h-48 overflow-y-auto ${error ? "border-red-500" : "border-gray-300"}`}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`${name}-${index}`}
              name={`${name}[${index}]`}
              value={option}
              checked={selectedValues.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={`${name}-${index}`} className="ml-2 text-gray-700">
              {option}
            </label>
          </div>
        ))}

        {/* Other option */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`${name}-other`}
            name={`${name}-other`}
            value="Other"
            checked={showOtherInput}
            onChange={(e) => handleCheckboxChange("Other", e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={`${name}-other`} className="ml-2 text-gray-700">
            Other
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[name]}</p>}

      {showOtherInput && (
        <div className="mt-3">
          <input
            type="text"
            name={`${name}Other`}
            placeholder={`Please specify other ${label.toLowerCase()}`}
            value={otherInputValue}
            onChange={handleOtherInputChange}
            onBlur={handleOtherInputBlur}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched[`${name}Other`] && formik.errors[`${name}Other`] && (
            <p className="text-red-500 text-sm mt-2 font-semibold">
              {formik.errors[`${name}Other`]}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;