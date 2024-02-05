import { CurrentWeatherType } from "../types";

  type Props = {
    present: CurrentWeatherType | null
    system: string
  }

export default function CurrentWeather({present, system}: Props) {
  return (
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
  );
}
