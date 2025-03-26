// import React from "react";


// const CurrentLocationButton = ({ onGetLocation }) => {
//   // const handleGetLocation = () => {
//   //   if (navigator.geolocation) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       (position) => {
//   //         onGetLocation({ lat: position.coords.latitude, lan: position.coords.longitude }); // ✅ Corrected keys
//   //       },
//   //       (error) => {
//   //         console.error("Error fetching current location:", error);
//   //       }
//   //     );
//   //   }
//   // };
  
//   const handleGetLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newPosition = { lat: position.coords.latitude, lan: position.coords.longitude };
//           console.log("📌 Current Location:", newPosition);
  
//           onGetLocation(newPosition);
//         },
//         (error) => {
//           console.error("❌ Error fetching current location:", error);
//         }
//       );
//     }
//   };
  

//   return (
//     <button
//     onClick={handleGetLocation}
//     className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 font-semibold rounded-lg shadow-md flex items-center gap-2 
//                hover:scale-105 hover:shadow-lg transition-all active:scale-95"
//   >
//     📍 Current Location
//   </button>
  
//   );
// };

// export default CurrentLocationButton;


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
      className="bg-green-500 text-white px-4 py-2 font-medium rounded shadow-lg hover:scale-105 transition-all cursor-pointer"
    >
      📍 Use Current Location
    </button>
  );
};

export default CurrentLocationButton;
