import React, { useEffect, useState } from "react";
import { getMockWeather } from "../../services/mockWeatherServices";

const WeatherWidget = ({ city = "Ames" }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getMockWeather(city);
      setWeather(data);
    };
    fetchWeather();
  }, [city]);

  if (!weather) return <div className="text-gray-600">Loading weather...</div>;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Weather Forecast</h3>
          <p className="text-sm text-gray-500">Current conditions in {city}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="w-14 h-14"
        />
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <div className="text-5xl font-bold">{weather.temp}°C</div>
        <div className="text-sm text-right space-y-1">
          <p>Condition: <span className="capitalize">{weather.condition}</span></p>
          <p>Feels like: {weather.feels_like || weather.temp}°C</p>
          <p>Humidity: {weather.humidity || 60}%</p>
          <p>Wind: {weather.wind_speed || 10} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
