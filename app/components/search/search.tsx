"use client";

import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import React, { useEffect, useState } from "react";
import { commandIcon } from "@/app/utils/icons";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

export function Search() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault();
  //       setOpen((open) => !open);
  //     }
  //   };

  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

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
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {geoCodedList &&
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
                  const { country, name } = item;
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`py-3 px-2 text-sm  rounded-sm cursor-pointer
                      ${hoveredIndex === index ? "bg-accent" : ""}
                    `}
                      onClick={() => {
                        getClickedCoords(item.lat, item.lon);
                      }}
                    >
                      <p className=" text">
                        {name}, {country}
                      </p>
                    </div>
                  );
                }
              )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
