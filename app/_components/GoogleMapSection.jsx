"use client"; // Ensure this is a Client Component

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import MapContainer with SSR disabled
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Disable SSR for this component
});

const GoogleMapSection = ({ listing }) => {
  return (
    <div className="w-[900px] h-[800px] sticky top-28 right-4 bg-white rounded-lg shadow-lg overflow-hidden p-4 max-w-full transition-all duration-300">
      <MapComponent listing={listing} />
    </div>
  );
};

export default GoogleMapSection;
