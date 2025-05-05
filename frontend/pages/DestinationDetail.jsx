import React from "react";
import FeedbackForm from "../components/Feedback/FeedbackForm.jsx";

const DestinationDetail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-pink-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow">
          Destination: <span className="text-blue-600">Ames</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover what travelers are saying and leave your own review.
        </p>

        {/* Feedback Form Section */}
        <FeedbackForm destination="Ames" />
      </div>
    </div>
  );
};

export default DestinationDetail;
