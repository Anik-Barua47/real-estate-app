import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import HomeAddressSearch from "./HomeAddressSearch";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import FilterSection from "./FilterSection";
import Link from "next/link";

function Listing({
  listing,
  handleSearchClick,
  searchedAddress,
  setBathCount,
  setBedCount,
  setParkingCount,
  setHouseType,
  setCoordinates,
}) {
  const [address, setAddress] = useState();

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="p-3 flex gap-6 items-center bg-white rounded-lg shadow-sm">
        <HomeAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
        />
        <Button onClick={handleSearchClick} className="flex gap-2  text-white">
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkingCount={setParkingCount}
        setHouseType={setHouseType}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <Link key={index} href={"/view-listing/" + item.id}>
                <div className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg bg-white shadow-md">
                  <Image
                    alt="Listing Image"
                    src={item.listingImages[0].url}
                    width={800}
                    height={350}
                    className="rounded-lg object-cover h-[250px] mb-4"
                    priority
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl text-gray-800">
                      ${item.price}
                    </h2>
                    <h2 className="flex gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {item.address}
                    </h2>
                    <div className="flex gap-2 mt-2 justify-between">
                      <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                        <BedDouble className="h-4 w-4 text-gray-400" />
                        {item?.bedroom} Beds
                      </h2>
                      <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                        <Bath className="h-4 w-4 text-gray-400" />
                        {item?.bathroom} Baths
                      </h2>
                      <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                        <Ruler className="h-4 w-4 text-gray-400" />
                        {item?.area} Sqft
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : // Render 4 skeleton placeholders if there are no listings
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-3 rounded-lg bg-white shadow-md">
                <Skeleton className="w-full h-[250px] rounded-lg mb-4" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2 mt-2 justify-between">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Listing;
