import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import SearchBar from "./SearchBar";
import LocationMarker from "./LocationMarker";
import CurrentLocationButton from "./CurrentLocationButton";

const defaultLocation = { lat: 19.7515, lan: 75.7139 };

// const LocationMarker = ({ setLocation, location, setFieldValue }) => {
//   useMapEvents({
//     click(e) {
//       const newLocation = { lat: e.latlng.lat, lan: e.latlng.lng };
//       setLocation(newLocation);
//       setFieldValue("location.lat", newLocation.lat);
//       setFieldValue("location.lan", newLocation.lan);
//     },
//   });
//   return location.lat && location.lan ? <Marker position={[location.lat, location.lan]} /> : null;
// };

const MapComponent = ({ formik }) => {
  const [location, setLocation] = useState(defaultLocation);
  const mapRef = useRef();

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-blue-700 font-medium mb-2">📍 Select Location</h3>
      <div className="flex gap-4 mb-4">
        <SearchBar onSearch={setLocation} />
        {/* <CurrentLocationButton onGetLocation={setLocation} /> */}
      </div>
      <div className="text-sm bg-gray-100 p-2 rounded">
        <strong>Latitude:</strong> {location.lat} | <strong>Longitude:</strong> {location.lan}
      </div>
      <MapContainer
        center={[location.lat, location.lan]}
        zoom={6}
        style={{ height: "300px", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker location={location} setLocation={setLocation} setFieldValue={formik.setFieldValue} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
