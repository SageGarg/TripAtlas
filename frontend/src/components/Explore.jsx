// src/components/Explore.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Explore() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/destinations');
        if (Array.isArray(response.data)) {
          setDestinations(response.data);
        } else if (response.data.success && Array.isArray(response.data.data)) {
          setDestinations(response.data.data);
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError(err.response?.data?.message || 'Failed to load destinations. Please try again later.');
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleCountryClick = (code) => {
    navigate(`/explore/${code}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-orange-100 p-8 flex items-center justify-center">
        <div className="text-2xl text-blue-600">Loading destinations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-orange-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-orange-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Explore Destinations</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {destinations.map((destination) => (
          <div
            key={destination._id}
            onClick={() => handleCountryClick(destination.code)}
            className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img 
              src={destination.imageUrl} 
              alt={destination.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-center mb-2">{destination.name}</h2>
              <p className="text-gray-600 text-sm text-center">{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
