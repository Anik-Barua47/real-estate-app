"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function EditListing({ params }) {
  const { user } = useUser();
  const router = useRouter();
  const [listing, setlisting] = useState([]);

  useEffect(() => {
    console.log(params.id);
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data) {
      setlisting(data[0]);
    }

    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();

    if (data) {
      console.log(data);
      toast("Updating");
    }
  };

  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    defaultValue={listing?.type}
                    onValueChange={(v) => (values.type = v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Select
                    onValueChange={(e) => (values.propertyType = e)}
                    name="propertyType"
                    defaultValue={listing?.propertyType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          listing?.propertyType
                            ? listing?.propertyType
                            : "Select Property Type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex.2"
                    name="bedroom"
                    onChange={handleChange}
                    defaultValue={listing?.bedroom}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Bathroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex.2"
                    name="bathroom"
                    onChange={handleChange}
                    defaultValue={listing?.bathroom}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Built In</h2>
                  <Input
                    type="number"
                    placeholder="Ex.1900 Sq.ft"
                    name="builtIn"
                    onChange={handleChange}
                    defaultValue={listing?.builtIn}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input
                    type="number"
                    placeholder="Ex.2"
                    name="parking"
                    onChange={handleChange}
                    defaultValue={listing?.parking}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                  <Input
                    type="number"
                    placeholder=""
                    name="lotSize"
                    onChange={handleChange}
                    defaultValue={listing?.lotSize}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                  <Input
                    type="number"
                    placeholder="Ex.1900"
                    name="area"
                    onChange={handleChange}
                    defaultValue={listing?.area}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Selling Price</h2>
                  <Input
                    type="number"
                    placeholder="400000"
                    name="price"
                    onChange={handleChange}
                    defaultValue={listing?.price}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                  <Input
                    type="number"
                    placeholder="100"
                    name="hoa"
                    onChange={handleChange}
                    defaultValue={listing?.hoa}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10 mt-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Description</h2>
                  <Textarea
                    placeholder=""
                    name="description"
                    onChange={handleChange}
                    defaultValue={listing?.description}
                  />
                </div>
              </div>
              <div className="flex gap-7 justify-end mt-10">
                <Button variant="ghost">Save</Button>
                <Button>Save & publish</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
