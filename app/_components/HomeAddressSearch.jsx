"use client";
import React, { useState } from "react";
import { Map, X } from "lucide-react";
import { mockLocations } from "@/lib/mockData"; // Import the mock data

function HomeAddressSearch({ selectedAddress, setCoordinates }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = mockLocations.filter((location) =>
        location.label.toLowerCase().includes(value.toLowerCase())
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
    console.log("Selected address:", location); // Log the selected address
    selectedAddress(location); // Pass the selected address to the parent component
    setCoordinates({ lat: location.lat, lng: location.lng }); // Pass coordinates to the parent component
  };

  // Clear search field
  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
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
        className="w-full p-2 border focus:outline-none focus:border-purple-500"
      />

      {/* Clear Button */}
      {query && (
        <button onClick={clearSearch} className="absolute right-2">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      )}

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

export default HomeAddressSearch;
