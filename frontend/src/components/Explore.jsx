// src/components/Explore.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const countries = [
  {
    name: "United States",
    code: "us",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Cancun",
    code: "cancun",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "India",
    code: "india",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWF8ZW58MHx8MHx8fDA%3D",
  },
];



function Explore() {
  const navigate = useNavigate();

  const handleCountryClick = (code) => {
    navigate(`/explore/${code}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-orange-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Explore Destinations</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {countries.map((country) => (
          <div
            key={country.code}
            onClick={() => handleCountryClick(country.code)}
            className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img src={country.image} alt={country.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-center">{country.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
