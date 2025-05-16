import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherWidget = ({ city = "Ames" }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/weather/${city}`); // Updated port
        setWeather(res.data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <div className="text-gray-600 text-center">Loading weather...</div>;

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
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <div className="text-center">
          <p className="text-6xl font-extrabold">{weather.temp}°C</p>
          <p className="capitalize text-md font-medium text-blue-700 mt-1">{weather.condition}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="flex justify-between"><span>Feels like:</span> <span>{weather.feels_like}°C</span></p>
          <p className="flex justify-between"><span>Humidity:</span> <span>{weather.humidity}%</span></p>
          <p className="flex justify-between"><span>Wind Speed:</span> <span>{weather.wind_speed} km/h</span></p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
