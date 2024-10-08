"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export default function CurrentWeather() {
  const { currentWeather, city } = useGlobalContext();

  const { current, daily, timezone, timezone_offset } = currentWeather;

  const { name } = city ;

  const [currentDay, setCurrentDay] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateLocalTime = () => {
      // Convertir la timezone en minutes
      const timeZoneOffSetInMinutes = timezone_offset / 60;
      // Obtenir l'heure locale en ajoutant la timezone à l'heure UTC
      const localTime = dayjs().utcOffset(timeZoneOffSetInMinutes);
      // Formater l'heure locale
      const localTimeFormatted = localTime.format("HH:mm:ss");
      // Obtenir le jour de la semaine en fonction de la timezone
      const day = localTime.format("dddd");
      setCurrentTime(localTimeFormatted);
      setCurrentDay(day);
    };

    const interval = setInterval(updateLocalTime, 1000);
    updateLocalTime(); // Mettre à jour immédiatement au montage du composant

    return () => clearInterval(interval);
  }, [timezone_offset]);

  // Vérifier si les données sont trouvées, si non afficher un message de chargement
  if (!currentWeather || !current || !daily || !timezone || !city || !name) {
    return (
      <div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
          justify-between shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{currentTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">
        {current.temp.toFixed()}°
      </p>

      <div>
        <div>
          <Image
            src={`mojoIcons/${current.weather[0].icon}.svg`}
            alt="weather icon"
            width="50"
            height="50"
          />
          <p className="pt-2 tracking-tight text-lg font-medium">
            {current.weather[0].main}
          </p>
        </div>
        <p className="flex items-center gap-2 text-muted-foreground">
          <span>Min: {daily[0].temp.min.toFixed()}°</span>
          <span>Max: {daily[0].temp.max.toFixed()}°</span>
        </p>
      </div>
    </div>
  );
}
