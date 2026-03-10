import { useGlobalContext } from "@/app/context/globalContext";
import type { City } from "@/app/lib/cityTypes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderHeart } from "lucide-react";

export default function Cities() {
	const { setActiveCityCoords, getCityFromLocalStorage } = useGlobalContext();

	const savedCities = getCityFromLocalStorage();

	const getClickedCityCoords = (lat: number, lon: number) => {
		setActiveCityCoords([lat, lon]);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<FolderHeart size={"icon"} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-zinc-500">
						Cities
					</DropdownMenuLabel>
					{savedCities.map((city: City) => {
						return (
							<DropdownMenuItem
								className="cursor-pointer flex flex-col items-start gap-0.5 px-3 py-2"
								key={`${city.lat}-${city.lon}`}
								onClick={() => {
									getClickedCityCoords(city.lat, city.lon);
								}}
							>
								<div className="flex items-center gap-2">
									<span className="font-medium">{city.name}</span>
									<span className="text-xs text-muted-foreground uppercase">
										{city.country}
									</span>
								</div>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
