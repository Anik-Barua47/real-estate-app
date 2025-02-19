import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import HomeAddressSearch from "./HomeAddressSearch";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import FilterSection from "./FilterSection";

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
  console.log(setCoordinates);

  return (
    <div>
      <div className="p-3 flex gap-6 items-center">
        <HomeAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
        />
        <Button onClick={handleSearchClick} className="flex gap-2">
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkingCount={setParkingCount}
        setHouseType={setHouseType}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <div
                key={index}
                className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg"
              >
                <Image
                  alt=""
                  src={item.listingImages[0].url}
                  width={800}
                  height={350}
                  className="rounded-lg object-cover h-[250px]"
                  priority
                />
                <div className="flex mt-2 flex-col gap-2">
                  <h2 className="font-bold text-xl">${item.price}</h2>
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    {item.address}
                  </h2>
                  <div className="flex gap-2 mt-2 justify-between">
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                      <BedDouble className="h-4 w-4" />
                      {item?.bedroom}
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                      <Bath className="h-4 w-4" />
                      {item?.bathroom}
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full">
                      <Ruler className="h-4 w-4" />
                      {item?.area}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : // Render 4 skeleton placeholders if there are no listings
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-3 rounded-lg">
                <Skeleton className="w-full h-[250px] rounded-lg" />
                <div className="flex mt-2 flex-col gap-2">
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
