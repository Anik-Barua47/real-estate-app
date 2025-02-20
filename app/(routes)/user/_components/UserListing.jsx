import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Bath, BedDouble, MapPin, Ruler, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function UserListing() {
  const [listing, setListing] = useState();
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getUserListing();
    }
  }, [user]); // Re-run when `user` changes

  const getUserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress);
    setListing(data);
    // console.log(data);
  };

  const handleDelete = async (listingId) => {
    console.log("🚀 Deleting listing with ID:", listingId); // Debug log

    try {
      // Step 1: Delete listing images
      const { error: deleteImagesError } = await supabase
        .from("listingImages")
        .delete()
        .eq("listing_id", listingId);

      if (deleteImagesError) {
        console.error("❌ Error deleting listingImages:", deleteImagesError);
        toast("Failed to delete listing images.");
        return;
      }

      console.log("✅ Listing images deleted successfully");

      // Step 2: Delete the listing
      const { error: deleteListingError } = await supabase
        .from("listing")
        .delete()
        .eq("id", listingId);

      if (deleteListingError) {
        console.error("❌ Error deleting listing:", deleteListingError);
        toast("Failed to delete listing.");
        return;
      }

      console.log("✅ Listing deleted successfully");

      // Step 3: Refresh the listing
      toast("Listing and images deleted successfully.");
      getUserListing();
    } catch (error) {
      console.error("❌ Unexpected error during deletion:", error);
      toast("An error occurred while deleting.");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Manage your listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {listing &&
          listing.map((item) => (
            <div
              key={item.id}
              className="p-3 relative hover:border hover:border-primary cursor-pointer rounded-lg bg-white shadow-md"
            >
              <h2 className="bg-primary m-1 text-white absolute px-2 text-sm rounded-lg">
                {item.active ? "Publish" : "Draft"}
              </h2>

              <Image
                alt="Listing Image"
                src={item?.listingImages[0]?.url}
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

                <div className="flex gap-2">
                  {/* ✅ View Button Wrapped in Link */}
                  <Link className="w-full" href={"/view-listing/" + item.id}>
                    <Button className="w-full" size="sm" variant="outline">
                      View
                    </Button>
                  </Link>

                  {/* ✅ Edit Button Wrapped in Link */}
                  <Link className="w-full" href={"/edit-listing/" + item.id}>
                    <Button className="w-full" size="sm">
                      Edit
                    </Button>
                  </Link>

                  {/* ✅ Delete Button Using AlertDialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your listing.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            variant="destructive"
                            onClick={(e) => {
                              console.log("🛑 AlertDialogAction clicked"); // Debug log
                              e.preventDefault();
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                          >
                            Yes, Delete
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserListing;
