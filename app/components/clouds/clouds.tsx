"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudIcon } from "lucide-react";

export default function Clouds() {
  const { currentWeather } = useGlobalContext();

  const { clouds } = currentWeather;

  if (!currentWeather || !currentWeather?.clouds) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <CloudIcon size={20} />
          Clouds
        </h2>
        <p className="pt-4 text-2xl">{clouds?.all}%</p>
      </div>
      <p className="text-sm">
        {
          (clouds.all === 100
            ? "Overcast, fully cloudy."
            : clouds.all < 100 && clouds.all >= 75
            ? "Very cloudy."
            : clouds.all < 75 && clouds.all >= 55
            ? "Mostly cloudy."
            : clouds.all < 55 && clouds.all > 45
            ? "Half cloudy, half clear."
            : clouds.all <= 45 && clouds.all >= 20
            ? "Partly cloudy"
            : clouds.all < 20 && clouds.all >= 10
            ? "Mostly clear, few clouds."
            : "Clear sky, no clouds")
        }
      </p>
    </div>
  );
}
