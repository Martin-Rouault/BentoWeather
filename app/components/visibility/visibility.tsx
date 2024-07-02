"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon } from "lucide-react";

export default function Visibility() {
  const { currentWeather } = useGlobalContext();

  const { current } = currentWeather;

  if (!current) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          <EyeIcon size={20} />
          Visibility
        </h2>
        <p className="pt-4 text-2xl">{current.visibility / 1000} km</p>
      </div>
      <p className="text-sm">
        {current.visibility / 1000 >= 10
          ? "Perfect visibility."
          : current.visibility / 1000 >= 5
          ? "Good visibility."
          : "Poor visibility, be carful wile driving!"}
      </p>
    </div>
  );
}
