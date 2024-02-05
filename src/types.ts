export type CurrentWeatherType = {
  main: {
    temp: number;
    feels_like: number;
    humidity: number
  };
  weather: [
    {
      description: string;
    }
  ];
  wind: {
    speed: number;
  };
  name: string;
  cod: number | string;
};
