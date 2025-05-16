import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:8080/api/weather/${city}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Weather Forecast
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-8">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </h2>
              <img
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                alt={weather.condition}
                className="w-16 h-16"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-800">{weather.temp}°C</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Feels Like</p>
                <p className="text-2xl font-bold text-gray-800">{weather.feels_like}°C</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-800">{weather.wind_speed} m/s</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg text-gray-600 capitalize">
                {weather.condition}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather; 