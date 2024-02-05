import { useState } from "react";
import { getNameList } from "country-list";
import { CurrentWeatherType, FutureWeatherType, WeatherList } from "./types";
import Systems from "./components/Systems";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import { DayWeather } from "./components/DayWeather";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const countriesList = getNameList();

  const [city, setCity] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("XX");
  const [future, setFuture] = useState<FutureWeatherType | null>(null);
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
      <CurrentWeather system={system} present={present} />
      {future?.cod === "200" && (
        <div>
          {future.list.some(
            (item: WeatherList) => new Date(item.dt_txt).getDay() === 0
          ) && <DayWeather future={future} day={0} system={system} />}

          {future.list.some(
            (item: WeatherList) => new Date(item.dt_txt).getDay() === 1
          ) && <DayWeather future={future} day={1} system={system} />}
          {future.list.some(
            (item: WeatherList) => new Date(item.dt_txt).getDay() === 2
          ) && <DayWeather future={future} day={2} system={system} />}
          {future.list.some(
            (item: WeatherList) => new Date(item.dt_txt).getDay() === 3
          ) && <DayWeather future={future} day={3} system={system} />}
          {future.list.some(
            (item: WeatherList) => new Date(item.dt_txt).getDay() === 4
          ) && <DayWeather future={future} day={4} system={system} />}
          {future.list.some(
            (item: WeatherList) => new Date(item.dt_txt).getDay() === 5
          ) && <DayWeather future={future} day={5} system={system} />}
          {future.list.some(
            (item: WeatherList) => new Date(item.dt_txt).getDay() === 6
          ) && <DayWeather future={future} day={6} system={system} />}
        </div>
      )}
    </div>
  );
}
