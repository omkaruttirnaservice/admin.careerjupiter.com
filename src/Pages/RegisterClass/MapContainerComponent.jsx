// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import LocationMarker from "./LocationMarker"; // ✅ Import the new component

// const ClickHandler = ({ setPosition }) => {
//   useMapEvents({
//     click: (e) => {

//         setPosition({lat: e.latlng.lat, lan: e.latlng.lng}); // Update position on click
      
//     },
//   });

//   return null;
// };

// const MapUpdater = ({ position }) => {
//     const map = useMap();

//     useEffect(() => {
//        if (position?.lat && position?.lan) {
//         map.flyTo([position.lat, position.lan], 5, { duration: 0.8 }); // Step 1: Zoom out first
//         setTimeout(() => {
//           map.flyTo([position.lat, position.lan], 14, { duration: 1.5 }); // Step 2: Zoom in smoothly
//         }, 800); // Delay before zooming in
//       }
//     }, [position, map]);
  
//     return null;
//   };
  

// const MapContainerComponent = ({ position, setPosition, setFieldValue }) => {
//   return (
    
//       <div className="relative w-full overflow-hidden rounded-lg shadow-lg border border-blue-300">
//         <MapContainer
//           center={position}
//           zoom={10}
//           className="h-[350px] w-full border border-gray-300 shadow-md transition-all duration-300 
//           rounded-lg hover:shadow-lg focus:ring-2 focus:ring-blue-500"
//         >
//           {/* Map Tile Layer */}
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    
//           {/* Updates & Markers */}
//           <MapUpdater position={position} />
//           <LocationMarker setLocation={setPosition} location={position} setFieldValue={setFieldValue} />
//         </MapContainer>
//       </div>
    
    
//   );
// };

// export default MapContainerComponent;
import React, { useState } from "react";
import axios from "axios";
import CurrentLocationButton from "./CurrentLocationButton";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationData, setLocationData] = useState(null);

  // const handleSearch = async () => {
  //   if (!searchQuery) return alert("Please enter a location!");

  //   try {
  //     const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
  //     const data = response.data;

  //     if (data.length > 0) {
  //       const newPosition = {
  //         lat: parseFloat(data[0].lat),
  //         lan: parseFloat(data[0].lon),
  //         display_name: data[0].display_name,
  //       };

  //       setLocationData(newPosition);
  //       onSearch(newPosition);
  //     } else {
  //       alert("❌ Location not found!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching location:", error);
  //     alert("Error fetching location.");
  //   }
  // };

  
  // Prevent form submission on Enter key
  
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();  // ✅ Prevents form submission on Enter
              handleSearch();
            }
          }}
        />

        {/* 🔵 Search Button */}
        <button
        type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-3 cursor-pointer rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2"
        >
          🔎 Search
        </button>
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
