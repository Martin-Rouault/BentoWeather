"use client";

import { Button } from "@/components/ui/button";
import { github } from "../utils/icons";
import { ThemeToggle } from "./themeToggle";
import { Search } from "./search/search";

export default function NavBar() {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="flex w-full gap-2 sm:w-fit">
        <Search />
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
