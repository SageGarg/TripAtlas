// src/components/Explore.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const countries = [
  { name: "United States", code: "us", image: "/images/us.jpg" },
  { name: "Cancun", code: "cancun", image: "/images/cancun.jpg" },
  { name: "India", code: "india", image: "/images/india.jpg" },
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
