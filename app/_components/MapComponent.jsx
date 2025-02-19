import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  CarFront,
  DollarSign,
  MapPinHouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Set map center
const center = { lat: 40.7528, lng: -74.006 };

// Custom Leaflet icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = ({ listing }) => {
  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {listing?.map((item) =>
        item.coordinates?.lat && item.coordinates?.lng ? (
          <Marker
            key={item.id}
            position={[item.coordinates.lat, item.coordinates.lng]}
            icon={defaultIcon}
          >
            <Popup className="bg-slate-500">
              <div>
                <div>
                  <Image
                    src={item.listingImages[0].url}
                    width={1000}
                    height={500}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-5 my-2">
                  <span className="flex items-center gap-2 text-sm border rounded-lg px-3 py-1 bg-slate-200">
                    <BedDouble className="w-5 h-5" />
                    <span className="font-bold">{item.bedroom}</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm border rounded-lg px-3 py-1 bg-slate-200">
                    <Bath className="w-5 h-5" />
                    <span className="font-bold">{item.bathroom}</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm border rounded-lg px-3 py-1 bg-slate-200">
                    <CarFront className="w-5 h-5" />
                    <span className="font-bold">{item.parking}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm border rounded-lg px-3 py-1 bg-slate-200">
                <DollarSign className="w-5 h-5" />
                <span className="font-bold">{item.price}</span>
              </div>
              <div className="flex items-center gap-1 text-sm mt-2 border rounded-lg px-3 py-1 bg-slate-200">
                <MapPinHouse className="w-5 h-5" />
                <span className="font-bold">{item.address}</span>
              </div>
              <div className="mt-2">
                <Button className="w-full">View Details</Button>
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default MapComponent;
