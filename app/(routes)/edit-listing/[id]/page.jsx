"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";

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

// Define the validation schema using Zod
const formSchema = z.object({
  type: z.enum(["rent", "sell"], { required_error: "Type is required" }),
  propertyType: z.string({ required_error: "Property type is required" }),
  bedroom: z.coerce.number().min(1, "Bedrooms must be at least 1"),
  bathroom: z.coerce.number().min(1, "Bathrooms must be at least 1"),
  builtIn: z.coerce.number().min(1800, "Built-in year must be valid"),
  parking: z.coerce.number().min(0, "Parking must be valid"),
  lotSize: z.coerce.number().min(0, "Lot size must be valid"),
  area: z.coerce.number().min(1, "Area must be valid"),
  price: z.coerce.number().min(1, "Selling price must be valid"),
  hoa: z.coerce.number().min(0, "HOA must be valid"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

function EditListing({ params }) {
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Track if the listing is saved

  // Initialize the form with react-hook-form and Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "rent",
      propertyType: "",
      bedroom: 1,
      bathroom: 1,
      builtIn: 2000,
      parking: 0,
      lotSize: 0,
      area: 1,
      price: 1,
      hoa: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (user) {
      verifyUserRecord();
    }
  }, [user]);

  const verifyUserRecord = async () => {
    try {
      const { data, error } = await supabase
        .from("listing")
        .select("*, listingImages(listing_id, url)")
        .eq("createdBy", user?.primaryEmailAddress.emailAddress)
        .eq("id", params.id);

      if (error) {
        console.error(error);
        toast.error("Error fetching listing details");
        return;
      }

      if (!data || data.length === 0) {
        toast.error("Listing not found!");
        router.push("/"); // Redirect to main page
        return;
      }

      setListing(data[0]);
      form.reset({
        type: data[0].type || "rent",
        propertyType: data[0].propertyType || "",
        bedroom: data[0].bedroom || 1,
        bathroom: data[0].bathroom || 1,
        builtIn: data[0].builtIn || 2000,
        parking: data[0].parking || 0,
        lotSize: data[0].lotSize || 0,
        area: data[0].area || 1,
        price: data[0].price || 1,
        hoa: data[0].hoa || 0,
        description: data[0].description || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  const onSubmitHandler = async (values, setActive) => {
    if (
      images.length === 0 &&
      (!listing?.listingImages || listing?.listingImages.length === 0)
    ) {
      toast.warning("Please upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      // Add user information to the listing data
      const listingData = {
        ...values,
        profileImage: user?.imageUrl,
        fullName: user?.fullName,
        active: setActive, // Set active based on the button clicked
      };

      // Update listing details in the database
      const { data: updatedData, error: updateError } = await supabase
        .from("listing")
        .update(listingData)
        .eq("id", params.id)
        .select();

      if (updateError) throw updateError;

      toast.success(
        `Listing ${setActive ? "published" : "saved"} successfully`
      );

      // If "Save" button was clicked, enable the "Save & Publish" button
      if (!setActive) {
        setIsSaved(true);
      }

      // Upload images
      for (const image of images) {
        const fileName = `${Date.now()}.${image.name.split(".").pop()}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("listingImages")
          .upload(fileName, image, {
            contentType: `image/${fileName.split(".").pop()}`,
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileName}`;
        const { error: insertError } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, listing_id: params.id }]);

        if (insertError) throw insertError;
      }

      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 md:px-36 my-10">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl mb-2">
          Enter some more details about your listing
        </h2>
        <div className="flex items-center gap-2">
          <div>
            <h2 className="text-lg font-bold">{user?.fullName}</h2>
          </div>
          {user?.imageUrl && (
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </div>
      </div>
      {/* Display User Information */}
      <div className="p-8 rounded-lg shadow-md">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((values) =>
              onSubmitHandler(values, false)
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {/* Rent or Sell */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Rent or Sell</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="rent"
                              className="w-5 h-5 rounded-full border-2 border-gray-500 checked:bg-gray-800 checked:border-gray-800"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Rent</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="sell"
                              className="w-5 h-5 rounded-full border-2 border-gray-500 checked:bg-gray-800 checked:border-gray-800"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Sell</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Property Type */}
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Property Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single family house">
                          Single Family House
                        </SelectItem>
                        <SelectItem value="town house">Town House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {/* Bedrooms */}
              <FormField
                control={form.control}
                name="bedroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bathrooms */}
              <FormField
                control={form.control}
                name="bathroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Built In */}
              <FormField
                control={form.control}
                name="builtIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Built In</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {/* Parking */}
              <FormField
                control={form.control}
                name="parking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Parking</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Lot Size */}
              <FormField
                control={form.control}
                name="lotSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Lot Size (Sq.Ft)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Area */}
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Area (Sq.Ft)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {/* Selling Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Selling Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* HOA */}
              <FormField
                control={form.control}
                name="hoa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      HOA (Per Month) ($)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div>
              <FormLabel className="text-lg">Upload Property Images</FormLabel>
              <FileUpload
                onChange={(value) => setImages(value)}
                imageList={listing?.listingImages}
              />
            </div>
            <div className="flex justify-end gap-10">
              {/* Save Button */}
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}{" "}
                Save
              </Button>

              {/* Save & Publish Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={!isSaved || loading}>
                    {loading ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}{" "}
                    Publish
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to publish this content?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Once published, this content will be available to all and
                      cannot be modified. Ensure all inputs are finalized before
                      proceeding.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      type="button"
                      onClick={() =>
                        form.handleSubmit((values) =>
                          onSubmitHandler(values, true)
                        )()
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default EditListing;
