import NavBar from "./components/navBar";
import CurrentWeather from "./components/currentWeather/currentWeather";
import AirQuality from "./components/airQuality/airQuality";
import Sunset from "./components/sunset/sunset";
import Wind from "./components/wind/wind";
import DailyForecast from "./components/dailyForecast/dailyForecast";
import Clouds from "./components/clouds/clouds";
import Population from "./components/population/population";
import FeelsLike from "./components/feelsLike/feelsLike";
import Humidity from "./components/humidity/humidity";
import Visibility from "./components/visibility/visibility";
import Pressure from "./components/pressure/pressure";
import MapBox from "./components/mapBox/mapBox";
import FiveDayForecast from "./components/fiveDayForecast/fiveDayForecast";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[10rem] m-auto">
      <NavBar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <CurrentWeather />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirQuality />
            <Sunset />
            <Wind />
            <DailyForecast />
            <Clouds />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mt-4 flex gap-4">
            <MapBox />
            <div className="flex flex-col gap-3 flex-1"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
