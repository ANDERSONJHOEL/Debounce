import { useState, useEffect, useCallback } from "react";
import { debounce } from "./debounce";
import "./App.jsx";

const API_KEY = "6951e1b720e06ee3663a4b275eed9c1d";

function App() {
  const [city, setCity] = useState("Quito");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos del clima");
      }
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Usar nuestro debounce personalizado
  const debouncedFetch = useCallback(
    debounce((cityName) => {
      fetchWeatherData(cityName);
    }, 500),
    []
  );

  useEffect(() => {
    if (city) {
      debouncedFetch(city);
    }
  }, [city, debouncedFetch]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clima</h1>
      
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Ingrese una ciudad..."
        className="w-full p-2 border rounded mb-4"
      />

      {loading && <div className="text-gray-600">Cargando...</div>}
      
      {error && <div className="text-red-500">Error: {error}</div>}
      
      {data && !loading && !error && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p className="mt-2">Temperatura: {data.main.temp}°C</p>
          <p>Clima: {data.weather[0].main}</p>
          <p>Descripción: {data.weather[0].description}</p>
          <p>Humedad: {data.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;