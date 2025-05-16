import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'feedback', or 'blog'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'rating'

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/feedback');
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError('Failed to load feedback. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Filter and sort logic
  const filteredAndSortedFeedbacks = feedbacks
    .filter(item => filter === 'all' || item.category === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-2xl text-blue-600 text-center">Loading feedback...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xl text-red-600 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Travel Stories & Feedback
        </h1>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          {/* Category Filter */}
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              } transition-colors duration-300`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('blog')}
              className={`px-6 py-2 rounded-full ${
                filter === 'blog'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              } transition-colors duration-300`}
            >
              Blog Posts
            </button>
            <button
              onClick={() => setFilter('feedback')}
              className={`px-6 py-2 rounded-full ${
                filter === 'feedback'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              } transition-colors duration-300`}
            >
              Feedback
            </button>
          </div>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Results Summary */}
        <div className="text-gray-600 mb-6">
          Found {filteredAndSortedFeedbacks.length} {filter === 'all' ? 'stories' : filter}
        </div>

        {/* Feedback/Blog Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedFeedbacks.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{item.destination}</span>
                  <div className="flex items-center">
                    {[...Array(item.rating || 0)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  {new Date(item.visitDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedFeedbacks.length === 0 && (
          <div className="text-center text-gray-600 mt-8 p-8 bg-white rounded-xl shadow">
            <p className="text-xl mb-2">No stories found</p>
            <p className="text-gray-500">
              Try selecting a different category to see more stories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList; 