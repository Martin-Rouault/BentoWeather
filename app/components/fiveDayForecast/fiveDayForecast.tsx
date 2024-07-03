"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { unixToday } from "@/app/utils/misc";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDaysIcon } from "lucide-react";
import Image from "next/image";

export default function FiveDayForecast() {
  const { currentWeather } = useGlobalContext();

  const { daily, timezone_offset } = currentWeather;

  if (!currentWeather || !daily) {
    return <Skeleton className="h-96 w-full rounded-xl" />;
  }

  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col 
          justify-between shadow-sm dark:shadow-none"
    >
      <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
        <CalendarDaysIcon size={20} />8 day forecast
      </h2>
      {/* TODO: add type to day obj (dailyWeather) */}
      {daily.map((day, i: number) => {
        const localDay = unixToday(day.dt, timezone_offset);
        return (
          <div className="forecast-list" key={i}>
            <div className="daily-forecast py-2 flex gap-6 items-center justify-evenly">
              <p>{i === 0 ? "Today" : localDay}</p>
              <Image
                src={`mojoIcons/${day.weather[0].icon}.svg`}
                alt="weather icon"
                width="50"
                height="50"
              />
              <div className="flex-1 flex items-center justify-between gap-2">
                <p className="text-muted-foreground">{day.temp.min.toFixed()}°</p>
                <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                <p>{day.temp.max.toFixed()}°</p>
              </div>
            </div>
            <Separator />
          </div>
        );
      })}
    </div>
  );
}
