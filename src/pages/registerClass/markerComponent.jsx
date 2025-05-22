

import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for marker not appearing in some environments (like Vite/CRA)
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],     // default size
  iconAnchor: [12, 41],   // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34],  // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41],
});

const MarkerComponent = ({ position }) => {
  if (!position?.lat || !position?.lan) return null; // Prevent errors when no position

  return (
    <Marker position={[position.lat, position.lan]} icon={customIcon}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
};

export default MarkerComponent;
