import { useState, useEffect } from "react";
import "./App.jsx";

const API_KEY = "6951e1b720e06ee3663a4b275eed9c1d";
const CITY_NAME = "Quito";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima");
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Clima en {CITY_NAME}</h1>
      <div className="card">
        <h2>{data.name}</h2>
        <p>Temperatura: {data.main.temp}°C</p>
        <p>Clima: {data.weather[0].main}</p>
        <p>Descripción: {data.weather[0].description}</p>
        <p>Humedad: {data.main.humidity}%</p>
      </div>
    </div>
  );
}

export default App;
