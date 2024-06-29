"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Visibility() {
  const { dailyWeather } = useGlobalContext();

  const { visibility } = dailyWeather;

  if (!dailyWeather || !visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          Visibility
        </h2>
        <p className="pt-4 text-2xl">{visibility / 1000} km</p>
      </div>
      <p className="text-sm">
        {visibility / 1000 >= 10
          ? "Perfect visibility."
          : visibility / 1000 >= 5
          ? "Good visibility."
          : "Poor visibility, be carful wile driving!"}
      </p>
    </div>
  );
}
