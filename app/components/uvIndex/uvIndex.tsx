"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { formatPopulationNumber } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { FlameIcon } from "lucide-react";

export default function UvIndex() {
  const { currentWeather } = useGlobalContext();

  const { current } = currentWeather;

  if (!currentWeather || !current) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const uvIndex = current.uvi * 10;

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <FlameIcon size={20} />
          UV Index
        </h2>
      </div>
      <div className="text-xl">
        {current?.uvi.toFixed()}
        <p>
          {current.uvi >= 11
            ? "Extreme"
            : current.uvi >= 8
            ? "Very High"
            : current.uvi >= 6
            ? "High"
            : current.uvi >= 3
            ? "Moderate"
            : "Low"}
        </p>
      </div>
      <div>
        <Progress value={uvIndex} max={110} className="progress" />
      </div>
      <p className="text-sm">
        {current.uvi >= 11
          ? "The risk of skin lesions is extremely high."
          : current.uvi >= 8
          ? "The risk of skin lesions is very high."
          : current.uvi >= 6
          ? " The risk of skin lesions is high."
          : current.uvi >= 3
          ? "The risk of skin lesions is moderate."
          : "The risk of skin lesions is low."}
      </p>
    </div>
  );
}
