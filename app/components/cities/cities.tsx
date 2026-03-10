import { useGlobalContext } from "@/app/context/globalContext";
import type { City } from "@/app/lib/cityTypes";
import { Button } from "@/components/ui/button";

export default function Cities() {
	const { setActiveCityCoords, getCityFromLocalStorage } = useGlobalContext();

	const savedCities = getCityFromLocalStorage();

	const getClickedCityCoords = (lat: number, lon: number) => {
		setActiveCityCoords([lat, lon]);
	};

	return (
		<div className="flex flex-col gap-3 flex-1 px-4 pb-5 pt-6  shadow-sm dark:shadow-none border rounded-lg">
			<h2 className="pb-4 flex items-center gap-2 font-medium text-muted-foreground">
				Your cities
			</h2>
			<div className="flex flex-col gap-3">
				{savedCities.map((city: City) => {
					return (
						<Button
							key={`${city.lat}-${city.lon}`}
							variant="outline"
							onClick={() => {
								getClickedCityCoords(city.lat, city.lon);
							}}
						>
							<p className="px-6 py-4">{city.name}</p>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
