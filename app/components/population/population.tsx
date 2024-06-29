"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { formatPopulationNumber } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersIcon } from "lucide-react";

export default function Population() {
  const { dailyForecast } = useGlobalContext();

  const { city } = dailyForecast;

  if (!dailyForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  {
    city?.population === 0
      ? (city.population = "Unknown")
      : (city.population = city.population);
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <UsersIcon size={20} />
          Population
        </h2>
        <p className="pt-4 text-2xl">
          {formatPopulationNumber(city?.population)}
        </p>
      </div>
      <p className="text-sm">
        Latest population data for{" "}
        <span className="font-medium">{city?.name}.</span>
      </p>
    </div>
  );
}
