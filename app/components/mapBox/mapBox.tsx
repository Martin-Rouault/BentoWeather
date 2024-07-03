"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

function FlyToActiveCity({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo([lat, lon], zoomLev, flyToOptions);
    }
  }, [lat, lon, map]);

  return null;
}

export default function MapBox() {
  const { currentWeather } = useGlobalContext();

  const { lat, lon } = currentWeather;

  if (!currentWeather || !lat || !lon) {
    return <Skeleton className="h-96 w-full rounded-xl" />;
  }

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer center={[lat, lon]} zoom={13} className="m-4 rounded-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
        />
        <FlyToActiveCity lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
}
