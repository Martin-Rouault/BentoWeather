interface WeatherIcon {
  icon: string;
}

interface Temperature {
  min: number;
  max: number;
}

interface Daily {
  dt: number;
  temp: Temperature;
  weather: WeatherIcon[];
}

export type { Daily };
