"use client";

import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import React from "react";
import UserListing from "../_components/UserListing";

function User() {
  return (
    <div className="flex justify-center w-[60%] mx-auto ">
      <UserProfile className="w-full">
        <UserButton.UserProfilePage
          label="My Listing"
          labelIcon={<Building2 className="h-5 w-5" />}
          url="my-listing"
        >
          <UserListing />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
}

export default User;
