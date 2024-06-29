"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import Image from "next/image";

export default function DailyForecast() {
  const { dailyForecast } = useGlobalContext();

  const { list } = dailyForecast;

  if (!dailyForecast || !list) {
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
              {list.slice(0, 9).map((item, index) => (
                <CarouselItem
                  key={item.dt}
                  className="flex flex-col gap-4 basis-[8.5rem] cursor-grab items-center"
                >
                  <p className="text-muted-foreground">
                    {index === 0 ? "Now" : dayjs(item.dt_txt).format("HH:mm")}
                  </p>
                  <Image
                    src={`mojoIcons/${item.weather[0].icon}.svg`}
                    alt="weather icon"
                    width="50"
                    height="50"
                  />
                  <p className="text-sm">{item.main.temp.toFixed()}°</p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
