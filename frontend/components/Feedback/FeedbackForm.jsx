import React, { useEffect, useState } from "react";
import { getMockFeedback, postMockFeedback } from "../../services/mockFeedbackServices.js";

const FeedbackForm = ({ destination = "Ames" }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadFeedback = async () => {
      const data = await getMockFeedback(destination);
      setFeedbacks(data);
    };
    loadFeedback();
  }, [destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      user: "Anonymous",
      rating,
      comment,
      destination,
      date: new Date().toLocaleDateString(),
    };
    await postMockFeedback(newEntry);
    setFeedbacks((prev) => [...prev, newEntry]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white border rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border px-3 py-2 rounded-md w-full"
            placeholder="1–5"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            rows="3"
            placeholder="Share your experience..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>
      </form>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Recent Feedback</h4>
        {feedbacks.length === 0 && (
          <p className="text-gray-500 text-sm">No feedback yet. Be the first to share!</p>
        )}
        {feedbacks.map((fb, i) => (
          <div key={i} className="border-t pt-2 mt-2 text-sm text-gray-700">
            <p>⭐ {fb.rating} - {fb.comment}</p>
            <p className="text-xs text-gray-500">– {fb.user}, {fb.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackForm;
