"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { ThermometerIcon } from "lucide-react";

export default function FeelsLike() {
  const { currentWeather } = useGlobalContext();

  const { current } = currentWeather;

  if (!current) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <ThermometerIcon size={20} />
          Feels Like
        </h2>
        <p className="pt-4 text-2xl">{current.feels_like.toFixed(1)}°</p>
      </div>
      <p className="text-sm">
        {current.feels_like <= current.temp
          ? "Feels colder than the actual temperature."
          : current.feels_like >= current.temp
          ? "Feels warmer than the actual temperature."
          : "Feels like the actual temperature."}
      </p>
    </div>
  );
}
