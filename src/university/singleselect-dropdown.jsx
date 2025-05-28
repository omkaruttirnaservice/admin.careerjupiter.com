

import { useEffect, useState } from "react"

const SingleSelectDropdown = ({ label, name, options = [], formik, placeholder = "Select an option" }) => {
  const [showOtherInput, setShowOtherInput] = useState(false)
  const error = formik.touched[name] && formik.errors[name]

  useEffect(() => {
    if (formik.values[name] === "Other") {
      setShowOtherInput(true)
    } else {
      setShowOtherInput(false)
      formik.setFieldValue(`${name}Other`, "")
    }
  }, [formik.values[name]])

  return (
    <div className="mb-4 w-full">
      <label className="block text-blue-800 font-semibold mb-2">{label}</label>

      <select
        id={name}
        name={name}
        {...formik.getFieldProps(name)}
        className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all ${
          error ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-400"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        <option value="Other">Other</option>
      </select>

      {error && <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[name]}</p>}

      {showOtherInput && (
        <input
          type="text"
          name={`${name}Other`}
          placeholder={`Enter other ${label.toLowerCase()}`}
          value={formik.values[`${name}Other`] || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-3 w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      {/* Show error for Other input if needed */}
      {formik.touched[`${name}Other`] && formik.errors[`${name}Other`] && (
        <p className="text-red-500 text-sm mt-2 font-semibold">{formik.errors[`${name}Other`]}</p>
      )}
    </div>
  )
}

export default SingleSelectDropdown
