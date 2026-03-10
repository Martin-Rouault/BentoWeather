"use client";

import React, { useState } from "react";
import { PinIcon, PinOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	useGlobalContext,
	useGlobalContextUpdate,
} from "@/app/context/globalContext";

export function Search() {
	const {
		geoCodedList,
		inputValue,
		handleInput,
		saveCity,
		removeCityFromLocalStorage,
	} = useGlobalContext();
	const { setActiveCityCoords } = useGlobalContextUpdate();

	const [open, setOpen] = useState(false);

	const GetClickedCoords = (item: {
		lat: number;
		lon: number;
		name: string;
	}) => {
		const { lat, lon, name } = item;
		const lastCityData = { name, lat, lon };
		localStorage.setItem("last_viewed_city", JSON.stringify(lastCityData));

		setActiveCityCoords([lat, lon]);
		setOpen(false);
	};

	return (
		<div className="search-btn">
			<Button
				variant={"outline"}
				size={"lg"}
				onClick={() => setOpen(true)}
				className="w-full whitespace-nowrap px-4"
			>
				<p className="text-sm text-muted-foreground">
					Search city...{" "}
					<kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hover:bg-primary md:ml-28">
						<span className="text-xs">⌘</span>J
					</kbd>
				</p>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="Search city..."
					value={inputValue}
					onValueChange={(e) => {
						handleInput(e);
					}}
				/>
				<CommandList>
					<CommandGroup heading="Suggestions">
						{geoCodedList && geoCodedList.length > 0 ? (
							geoCodedList.map(
								(item: {
									name: string;
									country: string;
									state: string;
									lat: number;
									lon: number;
								}) => {
									const { country, name, state, lat, lon } = item;

									const uniqueID = `${lat}-${lon}`;

									return (
										<CommandItem
											className="flex justify-between items-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900"
											key={uniqueID}
											onSelect={() => {
												GetClickedCoords(item);
											}}
										>
											<div>
												<p className="text">
													{name} {country}
												</p>
												<span className="text-zinc-500">{state}</span>
											</div>
											<div className="center"></div>
											<div className="flex space-x-2 items-center">
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																variant={"outline"}
																size={"icon"}
																onClick={(e) => {
																	e.stopPropagation();
																	saveCity(name, lat, lon);
																}}
															>
																<PinIcon size={12} />
															</Button>
														</TooltipTrigger>
														<TooltipContent>Add</TooltipContent>
													</Tooltip>
												</TooltipProvider>

												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																variant={"outline"}
																size={"icon"}
																onClick={(e) => {
																	e.stopPropagation();
																	removeCityFromLocalStorage(name);
																}}
															>
																<PinOffIcon size={12} />
															</Button>
														</TooltipTrigger>
														<TooltipContent>Delete</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>
										</CommandItem>
									);
								},
							)
						) : (
							<CommandEmpty>No results found</CommandEmpty>
						)}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}
