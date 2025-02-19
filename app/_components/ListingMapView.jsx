"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState(null);
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [houseType, setHouseType] = useState("all");
  useEffect(() => {
    getLatestListing();
  }, [bedCount, bathCount, parkingCount, houseType, searchedAddress]);

  const getLatestListing = async () => {
    let query = supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount);

    if (houseType && houseType !== "all") {
      query = query.eq("propertyType", houseType);
    }

    if (searchedAddress?.label) {
      query = query.like("address", `%${searchedAddress.label}%`);
    }

    try {
      const { data, error } = await query.order("id", { ascending: false });

      if (data && data.length > 0) {
        setListing(data);
      } else {
        toast.error("No results found matching your search criteria."); // Show toast if no data is found
      }

      if (error) {
        console.error("Error fetching data:", error);
        toast.error("Server side error"); // Show toast for server errors
      }
    } catch (error) {
      console.error("Error executing query:", error);
      toast.error("An error occurred while searching."); // Show toast for any other errors
    }
  };

  const handleSearchClick = async () => {
    await getLatestListing();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchedAddress={(v) => setSearchedAddress(v)}
          setBathCount={setBathCount}
          setBedCount={setBedCount}
          setParkingCount={setParkingCount}
          setHouseType={setHouseType}
        />
      </div>
      <div className="static 2xl:fixed right-10 md:h-[800px] md:w-[900px]">
        <GoogleMapSection listing={listing} />
      </div>
    </div>
  );
}

export default ListingMapView;
