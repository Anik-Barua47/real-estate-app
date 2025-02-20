import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function AgentDetail({ listingDetail }) {
  return (
    <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border mt-2">
      <div className="flex items-center gap-6">
        <Image
          src={listingDetail?.profileImage}
          width={60}
          height={60}
          className="rounded-full"
          alt="profileImage"
        />
        <div>
          <h2 className="text-lg font-bold">{listingDetail?.fullName}</h2>
          <h2 className="text-lg font-bold">{listingDetail?.createdBy}</h2>
        </div>
      </div>
      <Button>Send Message</Button>
    </div>
  );
}

export default AgentDetail;
