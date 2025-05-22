
import React from "react";
import { useEffect } from "react";
import { Marker, useMapEvents, useMap } from "react-leaflet";

const LocationMarker = ({ setLocation, location, setFieldValue }) => {
  const map = useMap(); // ✅ Get the map instance
  useMapEvents({
    click(e) {
      const newLocation = { lat: e.latlng.lat, lan: e.latlng.lng };
      console.log("📍 Map Clicked at:", newLocation);

      // ✅ Update location state
      setLocation(newLocation);

      // ✅ Update Formik values correctly
      setFieldValue("location.lat", newLocation.lat);
      setFieldValue("location.lan", newLocation.lan);
    },
  });

  useEffect(() => {
    if (location.lat && location.lan) {
      map.flyTo([location.lat, location.lan], 13, { duration: 2 }); // ✅ Smooth zoom-in animation
    }
  }, [location, map]);

  return location.lat && location.lan ? (
    <Marker position={[location.lat, location.lan]} />
  ) : null;
};

export default LocationMarker;
