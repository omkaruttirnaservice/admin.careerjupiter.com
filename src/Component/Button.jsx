import React from "react";

const ButtonComponent = ({ onClick, loading, text, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 mt-8 rounded-lg hover:bg-blue-700 ${
        loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      disabled={loading}
    >
      {loading ? "Sending..." : text}
    </button>
  );
};

export default ButtonComponent;
