import { FutureWeatherType, WeatherList } from "../types";

type Props = {
  future: FutureWeatherType;
  day: number;
  system: string;
};

export function DayWeather({ future, day, system }: Props) {
  return (
    <div>
      <h2>
        {
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][day]
        }
      </h2>
      {future.list
        .filter((item: WeatherList) => new Date(item.dt_txt).getDay() === day)
        .map((data: WeatherList) => {
          return (
            <div key={data.dt_txt}>
              <p>
                {Math.round(
                  system === "metric"
                    ? data.main.temp - 273.15
                    : (data.main.temp - 273.15) * 1.8 + 32
                )}
                {system === "metric" ? "°C" : "°F"}
              </p>
            </div>
          );
        })}
    </div>
  );
}
