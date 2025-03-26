const MarkerComponent = ({ position }) => {
  if (!position.lat || !position.lan) return null; // Prevent errors when no position
  return (
    <Marker position={[position.lat, position.lan]}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
};
export default MarkerComponent