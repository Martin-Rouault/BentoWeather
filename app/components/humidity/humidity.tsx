"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Humidity() {
  const { dailyWeather } = useGlobalContext();

  const { main } = dailyWeather;

  if (!dailyWeather || !main) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          Humidity
        </h2>
        <p className="pt-4 text-2xl">{main.humidity}%</p>
      </div>
      <p className="text-sm">
        {main.humidity < 40
          ? "Low humidity. It might feel dry."
          : main.humidity < 70
          ? "Moderate humidity. Comfortable conditions."
          : "High humidity. It might feel humid."}
      </p>
    </div>
  );
}
