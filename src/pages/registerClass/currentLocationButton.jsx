
import React from "react";

const CurrentLocationButton = ({ onGetLocation }) => {
  const getCurrentLocation = (e) => {
    if (e) {
      e.preventDefault(); // ✅ Prevent form submission
      e.stopPropagation(); // ✅ Stop event bubbling
    }

    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lan: position.coords.longitude, // ✅ FIXED: Use "lan" instead of "lan"
          display_name: "Current Location",
        };

        console.log("📍 Current Location:", newPosition);
        onGetLocation(newPosition); // ✅ Send data to the parent
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("❌ Location permission denied! Please allow access.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          alert("❌ Location information is unavailable.");
        } else if (error.code === error.TIMEOUT) {
          alert("❌ Location request timed out. Try again.");
        } else {
          alert("❌ Unknown error: " + error.message);
        }
      },
      {
        enableHighAccuracy: true, // ✅ Get precise location
        timeout: 10000, // ⏳ Wait max 10s
        maximumAge: 0, // 🔄 No cached values
      }
    );
  };

  return (
    <button
    type="button"
    onClick={getCurrentLocation}
    className="bg-green-500 text-white font-medium shadow-lg hover:scale-105 transition-all cursor-pointer rounded-lg
               flex items-center justify-center
               px-2 py-2 sm:w-5 sm:h-10 sm:px-0 sm:py-0 lg:rounded-md lg:px-1 lg:py-3 lg:w-sm"
  >
    <span className="hidden lg:inline">📍 Current Location</span>
    <span className="sm:inline lg:hidden">📍</span>
  </button>
  
  

  );
};

export default CurrentLocationButton;
