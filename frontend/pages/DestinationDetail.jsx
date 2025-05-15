import React from "react";
import WeatherWidget from "../components/Weather/WeatherWidget";

const DestinationDetail = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Destination: Ames</h1>
      <WeatherWidget city="Ames" />
    </div>
  );
};

export default DestinationDetail;
