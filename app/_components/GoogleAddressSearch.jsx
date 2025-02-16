"use client";
import React, { useState, useEffect } from "react";
import { Map } from "lucide-react";
import { mockLocations } from "@/lib/mockData"; // Import the mock data
import { supabase } from "@/utils/supabase/client"; // Import Supabase client

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [existingAddresses, setExistingAddresses] = useState([]);
  console.log(query);
  console.log(suggestions);
  console.log(existingAddresses);

  // Fetch existing addresses from the database
  useEffect(() => {
    const fetchExistingAddresses = async () => {
      const { data, error } = await supabase.from("listing").select("address");
      if (data) {
        const addresses = data.map((item) => item.address); // Extract addresses from the database
        setExistingAddresses(addresses);
      }
    };
    fetchExistingAddresses();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = mockLocations.filter(
        (location) =>
          location.label.toLowerCase().includes(value.toLowerCase()) &&
          !existingAddresses.includes(location.label) // Exclude already-inserted addresses
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSelect = (location) => {
    setQuery(location.label); // Set the input field to the selected address
    setSuggestions([]); // Clear suggestions
    selectedAddress(location); // Pass the selected address to the parent component
    setCoordinates({ lat: location.lat, lng: location.lng }); // Pass coordinates to the parent component
  };

  return (
    <div className="flex items-center w-full relative">
      {/* Map Icon */}
      <Map className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search Property Address"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-r-lg focus:outline-none focus:border-purple-500"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border rounded-b-lg shadow-md z-10 max-h-40 overflow-y-auto">
          {suggestions.map((location, index) => (
            <li
              key={index}
              onClick={() => handleSelect(location)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {location.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoogleAddressSearch;
