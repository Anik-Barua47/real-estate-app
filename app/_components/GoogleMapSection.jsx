"use client"; // Ensure this is a Client Component

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import MapContainer with SSR disabled
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Disable SSR for this component
});

const GoogleMapSection = ({ listing }) => {
  return (
    <div className="md:h-full md:w-full">
      <MapComponent listing={listing} />
    </div>
  );
};

export default GoogleMapSection;
