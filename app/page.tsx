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
import FiveDayForecast from "./components/fiveDayForecast/fiveDayForecast";
import HourlyForecast from "./components/hourlyForecast/hourlyForecast";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import Footer from "./components/footer/footer";

const MapBox = dynamic(() => import("./components/mapBox/mapBox"), {
	ssr: false,
});

const Cities = dynamic(() => import("@/app/components/cities/cities"), {
	ssr: false,
});

export default function Home() {
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
					<div className="mt-4 flex flex-col md:flex-row gap-4 ">
						<MapBox />
						<Cities />
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}
