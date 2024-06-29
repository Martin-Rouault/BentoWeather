"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { cloudsIndexArray } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";

export default function Clouds() {
  const { dailyWeather } = useGlobalContext();

  const { clouds } = dailyWeather;

  if (!dailyWeather || !dailyWeather?.clouds) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const cloudinessPercentage = cloudsIndexArray.find((item) => {
    return item.rating === clouds.all;
  });

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-muted-foreground">
          Clouds
        </h2>
        <p className="pt-4 text-2xl">{clouds.all}%</p>
      </div>
      <p className="text-sm">{cloudinessPercentage?.description}</p>
    </div>
  );
}
