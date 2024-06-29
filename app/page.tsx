import NavBar from "./components/navBar";
import Temperature from "./components/temperature/temperature";
import AirQuality from "./components/airQuality/airQuality";
import Sunset from "./components/sunset/sunset";
import Wind from "./components/wind/wind";
import DailyForecast from "./components/dailyForecast/dailyForecast";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <NavBar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirQuality />
            <Sunset />
            <Wind />
            <DailyForecast />
          </div>
        </div>
      </div>
    </main>
  );
}
