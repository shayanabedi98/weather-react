import { useState } from "react";
import { getNameList } from "country-list";
import { CurrentWeatherType } from "./types";
import Systems from "./components/Systems";
import Search from "./components/Search";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const countriesList = getNameList();

  const [city, setCity] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("XX");
  const [future, setFuture] = useState();
  const [present, setPresent] = useState<CurrentWeatherType | null>(null);
  const [system, setSystem] = useState<string>("metric");

  const fetchCurrentWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    setPresent(data);
  };

  const fetchFutureWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    setFuture(data);
  };

  const handleSystem = (name: string) => {
    setSystem(name);
  };

  return (
    <div>
      <Systems handleSystem={handleSystem} />
      <Search
        city={city}
        setCity={setCity}
        setCountryCode={setCountryCode}
        countriesList={countriesList}
        fetchCurrentWeather={fetchCurrentWeather}
        fetchFutureWeather={fetchFutureWeather}
      />
      {present?.cod === "404" && (
        <div>
          <h2>City not found</h2>
        </div>
      )}
      <div className="current-container">
        {present?.cod === 200 && (
          <div className="current-card">
            <h2>{present.name}</h2>
            <img src="" alt="" />
            <h3>{present.weather[0].description}</h3>
            <h3>
              {Math.round(
                system === "metric"
                  ? present.main.temp - 273.15
                  : (present.main.temp - 273.15) * 1.8 + 32
              )}
              {system === "metric" ? "°C" : "°F"}
            </h3>
            <p>
              Feels like:{" "}
              {Math.round(
                system === "metric"
                  ? present.main.feels_like - 273.15
                  : (present.main.feels_like - 273.15) * 1.8 + 32
              )}
              {system === "metric" ? "°C" : "°F"}
            </p>
            <div className="additional-info">
              <p>
                Wind speed:{" "}
                {system === "metric"
                  ? (present.wind.speed * 3.6).toFixed(2) + " km/h"
                  : (present.wind.speed * 2.23694).toFixed(2) + " mph"}
              </p>
              <p>Humidity: {present.main.humidity}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
