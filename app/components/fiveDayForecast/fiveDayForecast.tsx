"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function FiveDayForecast() {
  const { currentWeather } = useGlobalContext();

  if (!currentWeather) {
    return (
      <div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }
  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
          justify-between shadow-sm dark:shadow-none"
    >
      <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
        Five day forecast
      </h2>
    </div>
  );
}
