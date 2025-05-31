import { useEffect, useState } from "react";

const OtherField = ({
  triggerValue = "Other", // can be string or array of strings to trigger input field
  watchValue,             // value from Formik field (e.g. formik.values.language)
  onChange,               // handler to send input value to Formik
  error = "",             // optional Formik error message
  touched = false,        // optional Formik touched state
  name = "other",         // input field name
  placeholder = "Please specify",
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Utility to check if watchValue contains any triggerValue
  const checkTrigger = () => {
    if (Array.isArray(watchValue)) {
      // watchValue is array, triggerValue can be string or array
      if (Array.isArray(triggerValue)) {
        return triggerValue.some((trigger) => watchValue.includes(trigger));
      } else {
        return watchValue.includes(triggerValue);
      }
    } else {
      // watchValue is string, triggerValue can be string or array
      if (Array.isArray(triggerValue)) {
        return triggerValue.includes(watchValue);
      } else {
        return watchValue === triggerValue;
      }
    }
  };

  useEffect(() => {
    const triggered = checkTrigger();
    setShowInput(triggered);

    if (!triggered) {
      setInputValue("");
      onChange(""); // clear input on uncheck
    }
  }, [watchValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  if (!showInput) return null;

  return (
    <div className="mt-2">
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={"w-full px-4 py-3 mt-2 border-1 border-blue-300 rounded-lg shadow-md focus:outline-none transition-all duration-200"}
      />
      {touched && error && (
        <p className="text-red-500 text-sm mt-1 font-semibold">{error}</p>
      )}
    </div>
  );
};

export default OtherField;
