import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/feedback');
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load feedback. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 flex items-center justify-center">
        <div className="text-2xl text-blue-600">Loading feedback...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Travel Stories & Feedback
          </h1>
          <Link
            to="/feedback/new"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Share Your Experience
          </Link>
        </div>

        {feedbacks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No feedback yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {feedback.title}
                  </h2>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-600">{feedback.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{feedback.content}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{feedback.destination}</span>
                  <span>{new Date(feedback.visitDate).toLocaleDateString()}</span>
                </div>

                {feedback.images && feedback.images.length > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto">
                    {feedback.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Travel photo ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList; 