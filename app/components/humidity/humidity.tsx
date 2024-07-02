"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { DropletsIcon } from "lucide-react";

export default function Humidity() {
  const { currentWeather } = useGlobalContext();

  const { current } = currentWeather;

  if (!current) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <DropletsIcon size={20} />
          Humidity
        </h2>
        <p className="pt-4 text-2xl">{current.humidity}%</p>
      </div>
      <p className="text-sm">
        {current.humidity < 40
          ? "Low humidity. It might feel dry."
          : current.humidity < 70
          ? "Moderate humidity. Comfortable conditions."
          : "High humidity. It might feel humid."}
      </p>
    </div>
  );
}
