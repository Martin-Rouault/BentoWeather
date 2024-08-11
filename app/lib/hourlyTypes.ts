interface WeatherIcon {
  icon: string;
}

interface Hourly {
  dt: number;
  temp: number;
  weather: WeatherIcon[];
}

export type { Hourly };
