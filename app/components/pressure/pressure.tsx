"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { GaugeIcon } from "lucide-react";

export default function Pressure() {
  const { currentWeather } = useGlobalContext();

  const { main } = currentWeather;

  if (!currentWeather || !main) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <GaugeIcon size={20} />
          Pressure
        </h2>
        <p className="pt-4 text-2xl">{main?.pressure} hPa</p>
      </div>
      <p className="text-sm">
        {main.pressure < 1000
          ? "Low pressure. Expect changes in the weather."
          : main.pressure >= 1000 && main.pressure <= 1010
          ? "Normal pressure. Typical weather conditions."
          : "High pressure. Expect stable and clear weather."}
      </p>
    </div>
  );
}
