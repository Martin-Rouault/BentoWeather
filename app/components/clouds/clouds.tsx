"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudIcon } from "lucide-react";

export default function Clouds() {
  const { currentWeather } = useGlobalContext();

  const { current } = currentWeather;

  if (!current || !current.clouds) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <CloudIcon size={20} />
          Clouds
        </h2>
        <p className="pt-4 text-2xl">{current?.clouds}%</p>
      </div>
      <p className="text-sm">
        {current.clouds === 100
          ? "Overcast, fully cloudy."
          : current.clouds < 100 && current.clouds >= 75
          ? "Very cloudy."
          : current.clouds < 75 && current.clouds >= 55
          ? "Mostly cloudy."
          : current.clouds < 55 && current.clouds > 45
          ? "Half cloudy, half clear."
          : current.clouds <= 45 && current.clouds >= 20
          ? "Partly cloudy"
          : current.clouds <= 20 && current.clouds >= 10
          ? "Mostly clear, few clouds."
          : "Clear sky, no clouds"}
      </p>
    </div>
  );
}
