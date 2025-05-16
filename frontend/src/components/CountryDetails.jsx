// src/components/CountryDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CountryDetails() {
  const { countryCode } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/destinations/code/${countryCode}`);
        if (response.data.success) {
          setDestination(response.data.data);
        } else if (response.data) {
          // If we get a direct destination object without success wrapper
          setDestination(response.data);
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching destination:', err);
        setError(err.response?.data?.message || 'Failed to load destination details. Please try again later.');
        setLoading(false);
      }
    };

    fetchDestination();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-2xl text-blue-600">Loading destination details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <Link to="/explore" className="text-blue-600 hover:text-blue-800">
          Return to Explore
        </Link>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
        <div className="text-xl text-gray-600 mb-4">Destination not found</div>
        <Link to="/explore" className="text-blue-600 hover:text-blue-800">
          Return to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-700 mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-gray-600">{destination.description}</p>
          </div>
          <Link
            to="/explore"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Explore
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Top Places to Visit
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {destination.places && destination.places.map((place, index) => (
            <div
              key={place._id || index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={place.imageUrl}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {place.name}
                </h3>
                <p className="text-gray-600">{place.description}</p>
                {place.coordinates && (
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Latitude: {place.coordinates.latitude}°</p>
                    <p>Longitude: {place.coordinates.longitude}°</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
