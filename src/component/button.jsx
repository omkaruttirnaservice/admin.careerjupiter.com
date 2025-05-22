import React from "react";

const ButtonComponent = ({ onClick, loading, text, className, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled} // ✅ Handles disabled state correctly
      className={`bg-blue-600 text-white px-4 py-2 mt-8 rounded-lg hover:bg-blue-700 transition-all duration-200
        ${loading || disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      {loading ? "Sending..." : text}
    </button>
  );
};

export default ButtonComponent;
