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
  return (
    <div className="px-3 py-2 grid grid-cols-2 md:flex gap-6 bg-white rounded-lg shadow-sm">
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-full text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary focus:ring-opacity-50">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
          <SelectItem value="2">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <BedDouble className="h-5 w-5 text-primary" /> 2+
            </div>
          </SelectItem>
          <SelectItem value="3">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <BedDouble className="h-5 w-5 text-primary" /> 3+
            </div>
          </SelectItem>
          <SelectItem value="4">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <BedDouble className="h-5 w-5 text-primary" /> 4+
            </div>
          </SelectItem>
          <SelectItem value="5">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <BedDouble className="h-5 w-5 text-primary" /> 5+
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-full text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary focus:ring-opacity-50">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
          <SelectItem value="2">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <Bath className="h-5 w-5 text-primary" /> 2+
            </div>
          </SelectItem>
          <SelectItem value="3">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <Bath className="h-5 w-5 text-primary" /> 3+
            </div>
          </SelectItem>
          <SelectItem value="4">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <Bath className="h-5 w-5 text-primary" /> 4+
            </div>
          </SelectItem>
          <SelectItem value="5">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <Bath className="h-5 w-5 text-primary" /> 5+
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-full text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary focus:ring-opacity-50">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
          <SelectItem value="2">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <CarFront className="h-5 w-5 text-primary" /> 2+
            </div>
          </SelectItem>
          <SelectItem value="3">
            <div className="flex gap-2 items-center p-2 hover:bg-gray-100">
              <CarFront className="h-5 w-5 text-primary" /> 3+
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setHouseType}>
        <SelectTrigger className="w-full text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary focus:ring-opacity-50">
          <SelectValue placeholder="House Type" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
          <SelectItem value="all">
            <div className="p-2 hover:bg-gray-100">All</div>
          </SelectItem>
          <SelectItem value="single family house">
            <div className="p-2 hover:bg-gray-100">Single Family House</div>
          </SelectItem>
          <SelectItem value="town house">
            <div className="p-2 hover:bg-gray-100">Town House</div>
          </SelectItem>
          <SelectItem value="condo">
            <div className="p-2 hover:bg-gray-100">Condo</div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterSection;
