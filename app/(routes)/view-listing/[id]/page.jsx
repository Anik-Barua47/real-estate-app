"use client";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Slider from "../_components/Slider";
import Details from "../_components/Details";
import { list } from "postcss";

function ViewListing({ params }) {
  const [listingDetail, setListingDetail] = useState(null);
  console.log(listingDetail);

  useEffect(() => {
    getListingDetail();
  }, []);

  const getListingDetail = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("id", params.id)
      .eq("active", true);

    if (data && data.length > 0) {
      setListingDetail(data[0]);
    }
    if (error) {
      toast("Server side error");
    }
  };

  return (
    <div className="mx-auto w-[90%] max-w-[1400px] pt-2 space-y-10">
      {listingDetail && <Slider imageList={listingDetail.listingImages} />}
      <Details listingDetail={listingDetail} />
    </div>
  );
}

export default ViewListing;
