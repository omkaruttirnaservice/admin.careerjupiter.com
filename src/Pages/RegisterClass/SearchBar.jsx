// import React, { useState } from "react";

// const SearchBar = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // const handleSearch = async () => {
//   //   if (!searchQuery) return alert("Please enter a location!");
//   //   const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
//   //   const data = await response.json();
//   //   if (data.length > 0) {
//   //     onSearch({ lat: parseFloat(data[0].lat), lan: parseFloat(data[0].lon) });
//   //   } else {
//   //     alert("Location not found!");
//   //   }
//   // };

//   const handleSearch = async () => {
//     if (!searchQuery) return alert("Please enter a location!");
//     const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
//     const data = await response.json();
    
//     if (data.length > 0) {
//       const newPosition = { lat: parseFloat(data[0].lat), lan: parseFloat(data[0].lon) };
//       console.log("🔍 Location Found:", newPosition);
  
//       onSearch(newPosition);
//     } else {
//       alert("❌ Location not found!");
//     }
//   };
  

//   return (
//     <div className="flex gap-3 mb-3 bg-white p-2 rounded-lg shadow-md border border-gray-300">
//   {/* 🔍 Styled Input Field */}
//   <input
//     type="text"
//     placeholder="🔍 Search location..."
//     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all"
//     value={searchQuery}
//     onChange={(e) => setSearchQuery(e.target.value)}
//   />

//   {/* 🔵 Styled Search Button */}
//   <button
//     onClick={handleSearch}
//     className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2"
//   >
//     🔎 Search
//   </button>
// </div>

//   );
// };

// export default SearchBar;


import React, { useState } from "react";
import axios from "axios";
import CurrentLocationButton from "./CurrentLocationButton";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationData, setLocationData] = useState(null);

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();  // ✅ Prevent form submission
      e.stopPropagation(); // ✅ Stop event bubbling
    }
  
    if (!searchQuery) return alert("Please enter a location!");
  
    axios
      .get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const newPosition = {
            lat: parseFloat(data[0].lat),
            lan: parseFloat(data[0].lon),
            display_name: data[0].display_name
          };
          setLocationData(newPosition);
          onSearch(newPosition);
        } else {
          alert("❌ Location not found!");
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  };
  

  // Prevent form submission on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white p-3 rounded-lg shadow-md border border-gray-300">
      {/* 🔍 Search Input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="🔍 Search location..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // ✅ Prevent Enter from submitting form
        />

        {/* 🔵 Search Button */}
        <button
        type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          🔎 Search
        </button>

         {/* 📍 Current Location Button INSIDE Search Bar */}
         <CurrentLocationButton onGetLocation={onSearch} />
      </div>

      {/* 🌍 Display Latitude, Longitude, and Area */}
      {locationData && (
        <div className="text-gray-700 text-sm p-2 bg-gray-100 rounded-lg shadow-sm">
          <strong>Latitude:</strong> {locationData.lat} | <strong>Longitude:</strong> {locationData.lan} <br />
          <strong>Area:</strong> {locationData.display_name}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
