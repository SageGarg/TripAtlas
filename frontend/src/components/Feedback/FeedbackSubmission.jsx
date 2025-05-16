import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeedbackSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    rating: 5,
    visitDate: '',
    content: '',
    category: 'feedback' // or 'blog'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/feedback',
        formData
      );

      if (response.data) {
        navigate('/feedback/confirmation', { 
          state: { 
            type: formData.category,
            destination: formData.destination 
          }
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Share Your Travel Experience
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Give your experience a title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="feedback">Quick Feedback</option>
                <option value="blog">Blog Post</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Where did you visit?"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Rating
              </label>
              <input
                type="range"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 ⭐</span>
                <span>2 ⭐</span>
                <span>3 ⭐</span>
                <span>4 ⭐</span>
                <span>5 ⭐</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Visit Date
              </label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Your Experience
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Share your experience..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 text-white rounded-lg ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors duration-300`}
            >
              {isSubmitting ? 'Submitting...' : 'Share Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSubmission; 