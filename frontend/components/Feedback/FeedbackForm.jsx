import React, { useEffect, useState } from "react";
import { getMockFeedback, postMockFeedback } from "../../services/mockFeedbackServices.js";
import { Star } from "lucide-react";

const FeedbackForm = ({ destination = "Ames" }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    getMockFeedback(destination).then(setFeedback);
  }, [destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    const newEntry = {
      rating,
      comment,
      user: "You",
      date: new Date().toISOString().slice(0, 10),
    };
    await postMockFeedback(destination, newEntry);
    setFeedback([newEntry, ...feedback]);
    setRating(0);
    setComment("");
    setHoverRating(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-200 to-pink-100 py-0 px-2 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl">TravelMate 🌍</span>
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow mb-2">
            Share Your Experience in <span className="text-blue-600">{destination}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Your feedback helps other travelers and makes our community better. Please leave a review below!
          </p>
        </div>
      </div>

      {/* Glassmorphism Card */}
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-12 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <Star className="text-yellow-400" fill="currentColor" size={28} /> Leave a Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    size={32}
                    className={(hoverRating || rating) >= star ? "text-yellow-400 drop-shadow" : "text-gray-300"}
                    fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Comment Box */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              placeholder="Write about your trip..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Feedback List */}
      <div className="w-full max-w-2xl mb-20">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          💬 Visitor Reviews
        </h3>
        {feedback.length === 0 ? (
          <p className="text-gray-600 bg-white/70 rounded-xl p-6 text-center shadow">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-6">
            {feedback.map((entry, i) => (
              <div
                key={i}
                className="bg-white/90 border border-blue-100 rounded-2xl shadow-lg p-6 transition hover:shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(entry.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 ml-auto">{entry.date}</span>
                </div>
                <p className="italic text-lg text-gray-700 mb-1">“{entry.comment}”</p>
                <p className="text-sm text-blue-700 font-semibold">– {entry.user}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
