"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import dayjs from "dayjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function DailyForecast() {
  const { currentWeather } = useGlobalContext();

  const { hourly, timezone_offset } = currentWeather;

  if (!hourly) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div
      className="pt-6 px-4 h-[12rem] w-full border rounded-lg flex gap-8
       shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="h-full flex gap-10 overflow-hidden">
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {/* TODO: add types for the item object(currentWeather) */}
              {hourly.map((item, i: number) => {
                const localTime = dayjs
                  .unix(item.dt)
                  .utcOffset(timezone_offset / 60)
                  .format("HH:mm");
                return (
                  <CarouselItem
                    key={item.dt}
                    className="flex flex-col gap-4 basis-[8.5rem] cursor-grab items-center"
                  >
                    <p className="text-muted-foreground">
                      {i === 0 ? "Now" : localTime}
                    </p>
                    <Image
                      src={`mojoIcons/${item.weather[0].icon}.svg`}
                      alt="weather icon"
                      width="50"
                      height="50"
                    />
                    <p className="text-sm">{item.temp.toFixed()}°</p>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
