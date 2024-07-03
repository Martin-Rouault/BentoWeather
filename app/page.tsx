"use client";

import NavBar from "./components/navBar";
import CurrentWeather from "./components/currentWeather/currentWeather";
import AirQuality from "./components/airQuality/airQuality";
import Sunset from "./components/sunset/sunset";
import Wind from "./components/wind/wind";
import DailyForecast from "./components/dailyForecast/dailyForecast";
import Clouds from "./components/clouds/clouds";
import UvIndex from "./components/uvIndex/uvIndex";
import FeelsLike from "./components/feelsLike/feelsLike";
import Humidity from "./components/humidity/humidity";
import Visibility from "./components/visibility/visibility";
import Pressure from "./components/pressure/pressure";
import MapBox from "./components/mapBox/mapBox";
import FiveDayForecast from "./components/fiveDayForecast/fiveDayForecast";
import { useGlobalContext } from "./context/globalContext";
import defaultStates from "./utils/defaultStates";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { setActiveCityCoords } = useGlobalContext();

  const getClickedCityCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
            <UvIndex />
            <Clouds />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <MapBox />
            <div className="flex flex-col gap-3 flex-1 px-4 pb-5 pt-6 shadow-sm dark:shadow-none border rounded-lg">
              <h2 className="pb-4 flex items-center gap-2 font-medium text-muted-foreground">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-3">
                {defaultStates.map((state, i) => {
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => {
                        getClickedCityCoords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
