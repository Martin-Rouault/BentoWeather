"use client";

import NavBar from "./components/navBar";
import CurrentWeather from "./components/currentWeather/currentWeather";
import AirQuality from "./components/airQuality/airQuality";
import Sunset from "./components/sunset/sunset";
import Wind from "./components/wind/wind";
import Clouds from "./components/clouds/clouds";
import UvIndex from "./components/uvIndex/uvIndex";
import FeelsLike from "./components/feelsLike/feelsLike";
import Humidity from "./components/humidity/humidity";
import Visibility from "./components/visibility/visibility";
import Pressure from "./components/pressure/pressure";
import MapBox from "./components/mapBox/mapBox";
import FiveDayForecast from "./components/fiveDayForecast/fiveDayForecast";
import HourlyForecast from "./components/hourlyForecast/hourlyForecast";
import { useGlobalContext } from "./context/globalContext";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { City } from "./lib/cityTypes";

export default function Home() {
  const { setActiveCityCoords, getCityFromLocalStorage } = useGlobalContext();

  const localCity = getCityFromLocalStorage();

  const getClickedCityCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[10rem] m-auto">
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <NavBar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <CurrentWeather />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments flex flex-col h-full gap-4 sm:grid sm:col-span-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirQuality />
            <Sunset />
            <Wind />
            <HourlyForecast />
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
                Your cities
              </h2>
              <div className="flex flex-col gap-3">

                {localCity.map((city: City, i: number) => {
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => {
                        getClickedCityCoords(city.lat, city.lon);
                      }}
                    >
                      <p className="px-6 py-4">{city.name}</p>
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
