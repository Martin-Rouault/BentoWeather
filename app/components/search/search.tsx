"use client";

import React, { useState } from "react";
import { PinIcon, PinOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
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
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    setOpen(false);
  };

  return (
    <div className="search-btn">
      <Button
        variant={"outline"}
        size={"lg"}
        onClick={() => setOpen(true)}
        className="h-9 w-full whitespace-nowrap px-4"
      >
        <p className="text-sm text-muted-foreground">
          Search city...{" "}
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hover:bg-primary md:ml-28">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Input
          placeholder="Search city..."
          value={inputValue}
          onChange={handleInput}
        />
        <CommandList>
          <CommandGroup heading="Suggestions">
            {geoCodedList && geoCodedList.length > 0 ? (
              geoCodedList.map(
                (
                  item: {
                    name: string;
                    country: string;
                    state: string;
                    lat: number;
                    lon: number;
                  },
                  index: number
                ) => {
                  const { country, name, lat, lon } = item;
                  return (
                    <div
                      className="flex justify-between items-center"
                      key={index}
                    >
                      <div
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm rounded-sm cursor-pointer ${
                          hoveredIndex === index ? "bg-accent" : ""
                        }`}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}
                      >
                        <p className="text">
                          {name} {country}
                        </p>
                      </div>
                      <div className="center"></div>
                      <div className="flex space-x-2 items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => saveCity(name, lat, lon)}
                              >
                                <PinIcon size={15} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={1}>Add</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => removeCityFromLocalStorage(name)}
                              >
                                <PinOffIcon size={15} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  );
                }
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
