"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

export default function MapBox() {
	const { currentWeather } = useGlobalContext();

	const { lat, lon } = currentWeather;

	const [isMounted, setIsMounted] = useState(false);

	const { resolvedTheme } = useTheme();

	const whiteMap =
		"https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";
	const blackMap =
		"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || !currentWeather || !lat || !lon) {
		return <Skeleton className="h-96 w-full rounded-xl flex items-center justify-center">NO DATA</Skeleton>;
	}

	return (
		<div className="flex-1 basis-[50%] border rounded-lg bg-primary-foreground">
			<MapContainer center={[lat, lon]} zoom={13} className="m-4 rounded-lg">
				<TileLayer
					url={resolvedTheme === "dark" ? blackMap : whiteMap}
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
				/>
				<FlyToActiveCity lat={lat} lon={lon} />
			</MapContainer>
		</div>
	);
}

function FlyToActiveCity({ lat, lon }: { lat: number; lon: number }) {
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
