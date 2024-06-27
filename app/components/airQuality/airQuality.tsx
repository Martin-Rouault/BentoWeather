"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { airQualityIndexArray } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function AirQuality() {
  const { airQuality } = useGlobalContext();

  // checker si les données sont trouvées, si non afficher un message de chargement
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }
  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredAirQualityIndex = airQualityIndexArray.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
      shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">Air Quality is {filteredAirQualityIndex?.description}.</p>
    </div>
  );
}
