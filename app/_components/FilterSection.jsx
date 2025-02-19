import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bath, BedDouble, CarFront, Home } from "lucide-react";

function FilterSection({
  setBathCount,
  setBedCount,
  setParkingCount,
  setHouseType,
}) {
  // console.log("FilterSection called");

  return (
    <div className="px-3 py-2 grid grid-cols-2 md:flex gap-6">
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[150px] text-lg">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-5 items-center">
              <BedDouble className="h-6 w-6 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-5 items-center">
              <BedDouble className="h-6 w-6 text-primary" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-5 items-center">
              <BedDouble className="h-6 w-6 text-primary" /> 4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-5 items-center">
              <BedDouble className="h-6 w-6 text-primary" /> 5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[150px] text-lg">
          <SelectValue placeholder="Bath" className="text-2xl" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-5 items-center">
              <Bath className="h-6 w-6 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-5 items-center">
              <Bath className="h-6 w-6 text-primary" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-5 items-center">
              <Bath className="h-6 w-6 text-primary" /> 4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-5 items-center">
              <Bath className="h-6 w-6 text-primary" /> 5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-[150px] text-lg">
          <SelectValue placeholder="Parking" className="text-2xl" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-5 items-center">
              <CarFront className="h-6 w-6 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-5 items-center">
              <CarFront className="h-6 w-6 text-primary" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setHouseType}>
        <SelectTrigger className="w-[180px] text-sm">
          <SelectValue placeholder="House Type" className="text-2xl" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="single family house">
            Single Family House
          </SelectItem>
          <SelectItem value="town house">Town House</SelectItem>
          <SelectItem value="condo">Condo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterSection;
