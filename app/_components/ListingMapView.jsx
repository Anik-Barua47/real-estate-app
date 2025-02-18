import React from "react";
import Listing from "./Listing";

function ListingMapView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Listing />
      </div>
      <div>map</div>
    </div>
  );
}

export default ListingMapView;
