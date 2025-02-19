import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Set map center to New York City
const center = { lat: 40.7528, lng: -74.006 };

// Custom Leaflet icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png", // Use a valid URL for the icon
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png", // Use a valid URL for the shadow
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const GoogleMapSection = ({ listing }) => {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {listing
          .filter(
            (item) =>
              item.coordinates?.lat !== undefined &&
              item.coordinates?.lng !== undefined
          )
          .map((item) => (
            <Marker
              key={item.id}
              position={[item.coordinates.lat, item.coordinates.lng]}
              icon={defaultIcon}
            >
              <Popup>{item.address}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default GoogleMapSection;
