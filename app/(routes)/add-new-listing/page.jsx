"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";

const AddNewListingPage = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false);

  const { user } = useUser();

  const nexthandler = async () => {
    setLoader(true);

    console.log(selectedAddress, coordinates);

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress?.label || "",
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();
    if (data) {
      setLoader(false);
      console.log("New Data Added ", data);
      toast("Event has been created.");
    }
  };

  return (
    <div className="mt-56 lg:mx-80 md:mx-56">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h1 className="font-bold text-2xl">Add New Listing</h1>
        <div className="p-5 rounded-lg w-full border shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500">Enter address which you want</h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loader}
            onClick={nexthandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewListingPage;
