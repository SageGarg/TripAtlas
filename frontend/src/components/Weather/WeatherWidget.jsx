import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherWidget = ({ city = "Ames" }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/weather/${city}`);
        setWeather(res.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setError("Unable to load weather data");
        // Use mock data as fallback
        setWeather({
          temp: 22,
          feels_like: 21,
          condition: "partly cloudy",
          icon: "02d",
          humidity: 65,
          wind_speed: 12,
        });
      }
    };

    fetchWeather();
  }, [city]);

  if (error) {
    return (
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
        <p className="text-orange-700">{error}</p>
        <p className="text-sm text-orange-600">Showing approximate weather data</p>
      </div>
    );
  }

  if (!weather) return (
    <div className="animate-pulse bg-blue-50 p-8 rounded-3xl">
      <div className="h-8 bg-blue-200 rounded w-3/4 mb-4"></div>
      <div className="h-32 bg-blue-200 rounded mb-4"></div>
      <div className="h-8 bg-blue-200 rounded w-1/2"></div>
    </div>
  );

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
            e.target.src = 'https://via.placeholder.com/80?text=🌤';
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
            <span>{weather.wind_speed} km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget; 