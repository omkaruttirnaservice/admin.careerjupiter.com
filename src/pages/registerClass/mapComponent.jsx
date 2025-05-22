
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import SearchBar from "./SearchBar";
import SearchBar from "./searchBar";
import { FaTrash } from "react-icons/fa";

const defaultLocation = { lat: 19.7515, lan: 75.7139 };

const LocationMarker = ({ addLocation }) => {
  useMapEvents({
    click(e) {
      const newLocation = { lat: e.latlng.lat, lan: e.latlng.lng };
      addLocation(newLocation);
    },
  });
  return null;
};

const MapComponent = ({ formik }) => {
  const [locations, setLocations] = useState([]); // Store multiple locations
  const mapRef = useRef();

  const addLocation = (newLocation) => {
    setLocations((prev) => [...prev, newLocation]); // Add new location to state
    formik.setFieldValue("locations", [...locations, newLocation]); // Update Formik field
  };

  const removeLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    formik.setFieldValue("locations", updatedLocations);
  };

  return (
    <div className="bg-white p-1 sm:p-1 lg:p-4 sm:m-0 rounded shadow-lg border border-gray-200">
      <h3 className="text-xl text-blue-700 font-semibold mb-4 flex items-center">📍 Select Locations</h3>
      <div className="flex gap-4 mb-4">
        <SearchBar onSearch={addLocation} />
      </div>

      {/* List of selected locations */}
      {locations.length > 0 && (
        <div className="mb-4">
          {locations.map((loc, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-800">
                  <strong>Lat:</strong> {loc.lat}, <strong>Lan:</strong> {loc.lan}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeLocation(index)}
                className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Map Display */}
      <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
        <MapContainer center={[defaultLocation.lat, defaultLocation.lan]} zoom={6} style={{ height: "300px", width: "100%" }} ref={mapRef}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker addLocation={addLocation} />
          {locations.map((loc, index) => (
            <Marker key={index} position={[loc.lat, loc.lan]} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;

