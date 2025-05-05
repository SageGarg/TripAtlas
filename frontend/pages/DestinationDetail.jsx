import React from "react";
import FeedbackForm from "../components/Feedback/FeedbackForm.jsx";

const DestinationDetail = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Destination: Ames</h1>
      {/* Optional: Add WeatherWidget here */}
      <FeedbackForm destination="Ames" />
    </div>
  );
};

export default DestinationDetail;
