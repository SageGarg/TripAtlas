import React from "react";
import FeedbackForm from "../components/Feedback/FeedbackSubmission";
import WeatherWidget from "../components/Weather/WeatherWidget";

const DestinationDetail = () => {
  const city = "Ames"; // easy to reuse/change

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-pink-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow">
          Destination: <span className="text-blue-600">{city}</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover what travelers are saying and check the local weather before you go!
        </p>

        {/* Weather Widget */}
        <div className="mb-8">
          <WeatherWidget city={city} />
        </div>

        {/* Feedback Form */}
        <FeedbackForm destination={city} />
      </div>
    </div>
  );
};

export default DestinationDetail; 