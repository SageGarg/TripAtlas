// src/components/CountryDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const placesByCountry = {
  us: ["New York", "Grand Canyon", "Miami Beach"],
  cancun: ["Playa Delfines", "Isla Mujeres", "Chichen Itza"],
  india: ["Taj Mahal", "Jaipur", "Goa"],
};

function CountryDetails() {
  const { countryCode } = useParams();
  const places = placesByCountry[countryCode] || [];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 capitalize">
        Top places to visit in {countryCode}
      </h1>
      <ul className="list-disc pl-6 text-lg space-y-2 text-gray-700">
        {places.map((place, index) => (
          <li key={index}>{place}</li>
        ))}
      </ul>
    </div>
  );
}

export default CountryDetails;
