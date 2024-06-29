"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sunset() {
  const { dailyWeather } = useGlobalContext();

  if (
    !dailyWeather ||
    !dailyWeather?.sys ||
    !dailyWeather?.sys.sunset
  ) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const times = dailyWeather?.sys?.sunset;
  const timezone = dailyWeather?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(dailyWeather?.sys?.sunrise, timezone);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">Sunset </h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">Sunrise : {sunrise}</p>
    </div>
  );
}
