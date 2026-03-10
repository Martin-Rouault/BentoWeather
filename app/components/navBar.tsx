"use client";

import Cities from "./cities/cities";
import { Search } from "./search/search";
import { ThemeToggle } from "./themeToggle";

export default function NavBar() {
	return (
		<div className="w-full py-4 ">
			<div className="flex items-center justify-between gap-4">
				<Search />
				<div className="flex items-center gap-2">
					<Cities />
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
}
