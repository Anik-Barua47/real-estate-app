import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import {
  Bath,
  Bed,
  BedDouble,
  Car,
  CarFront,
  Drill,
  Home,
  LandPlot,
  Locate,
  MapPin,
  Pin,
} from "lucide-react";
import React from "react";
import AgentDetail from "./AgentDetail";

function Details({ listingDetail }) {
  console.log(listingDetail);
  return (
    <div className="mx-auto w-[80%] max-w-[800px]">
      {listingDetail ? (
        <>
          <div className="flex justify-between mb-5">
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold">${listingDetail.price}</h2>
              <div className="flex items-center font-bold">
                <MapPin className="w-5 h-5" />
                <h5 className="text-xl">{listingDetail.address}</h5>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Button className="bg-primary hover:bg-primary/30 hover:text-black text-white font-bold py-2 px-4 rounded">
                Share
              </Button>
            </div>
          </div>
          <hr />
          <div className="mt-5">
            <h5 className="text-xl font-medium">Key Features</h5>
            <div className="mt-5 grid grid-cols-3 gap-5">
              <div className="flex items-center gap-3 border justify-center py-1.5 rounded-lg bg-primary">
                <Home className="text-white" />
                <span className="uppercase font-medium text-white">
                  {listingDetail.propertyType}
                </span>
              </div>
              <div className="flex items-center gap-3 border justify-center py-1.5 rounded-lg bg-primary">
                <Drill className="text-white" />
                <span className="uppercase font-medium text-white">
                  {listingDetail.builtIn}
                </span>
              </div>
              <div className="flex items-center gap-3 border justify-center py-1.5 rounded-lg bg-primary">
                <LandPlot className="text-white" />
                <span className="uppercase font-medium text-white">
                  {listingDetail.area}
                </span>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-5">
              <div className="flex items-center gap-3 border justify-center py-1.5 rounded-lg bg-primary">
                <BedDouble className="text-white" />
                <span className="uppercase font-medium text-white">
                  {listingDetail.bedroom}
                </span>
              </div>
              <div className="flex items-center gap-3 border justify-center py-1.5 rounded-lg bg-primary">
                <Bath className="text-white" />
                <span className="uppercase font-medium text-white">
                  {listingDetail.bathroom}
                </span>
              </div>
              <div className="flex items-center gap-3 border justify-center py-1.5 rounded-lg bg-primary">
                <CarFront className="text-white" />
                <span className="uppercase font-medium text-white">
                  {listingDetail.parking}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h5 className="text-xl font-medium">What's Special</h5>
            <div className="mt-2 text-lg">{listingDetail.description}</div>
          </div>
          <div className="mt-5">
            <h5 className="text-xl font-medium">Find On Map</h5>
            <div className="mt-2 h-[500px]  overflow-hidden mb-20">
              <GoogleMapSection listing={listingDetail} />
            </div>
          </div>
          <div className="mt-2 mb-5">
            <h5 className="text-xl font-bold">Contact Agent</h5>
            <AgentDetail listingDetail={listingDetail} />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Details;
