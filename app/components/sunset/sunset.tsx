"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import { HazeIcon } from "lucide-react";

export default function Sunset() {
  const { currentWeather } = useGlobalContext();

  const { current, timezone_offset } = currentWeather;

  if (!currentWeather || !timezone_offset || !current) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const times = current.sunset;
  const timezone = timezone_offset;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(current.sunrise, timezone);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <HazeIcon size={20} />
          Sunset
        </h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">Sunrise : {sunrise}</p>
    </div>
  );
}
