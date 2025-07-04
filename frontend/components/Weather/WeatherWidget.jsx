import React, { useEffect, useState } from "react";
import axios from "axios";
import { getMockWeather } from "../../services/mockWeatherServices";

const WeatherWidget = ({ city = "Ames" }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:8080/api/weather/${encodeURIComponent(city)}`);
        setWeather(res.data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setError("Unable to fetch weather data");
        // Fallback to mock data in case of error
        const mockData = await getMockWeather(city);
        setWeather(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8 rounded-3xl shadow-xl backdrop-blur-lg animate-pulse">
        <div className="h-8 bg-blue-200 rounded mb-4 w-3/4"></div>
        <div className="h-6 bg-blue-200 rounded mb-8 w-1/2"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-blue-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-6 bg-blue-200 rounded w-full"></div>
            <div className="h-6 bg-blue-200 rounded w-full"></div>
            <div className="h-6 bg-blue-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-red-50 p-8 rounded-3xl shadow-xl">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8 rounded-3xl shadow-xl backdrop-blur-lg border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-3xl font-bold text-gray-800">Weather in {city}</h3>
          <p className="text-sm text-gray-600">Updated just now</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="w-20 h-20 drop-shadow-md"
          onError={(e) => {
            e.target.src = "https://openweathermap.org/img/wn/02d@2x.png"; // Fallback icon
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <div className="text-center">
          <p className="text-6xl font-extrabold">{Math.round(weather.temp)}°C</p>
          <p className="capitalize text-md font-medium text-blue-700 mt-1">{weather.condition}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Feels like:</span>
            <span>{Math.round(weather.feels_like)}°C</span>
          </p>
          <p className="flex justify-between">
            <span>Humidity:</span>
            <span>{weather.humidity}%</span>
          </p>
          <p className="flex justify-between">
            <span>Wind Speed:</span>
            <span>{Math.round(weather.wind_speed)} km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
