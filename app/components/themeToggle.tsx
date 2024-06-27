"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { sun, moon } from "../utils/icons";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {resolvedTheme === "dark" ? (
        <Button
          onClick={() => setTheme("light")}
          title="Toggle dark mode"
          variant="outline"
          size="icon"
        >
          {sun}
        </Button>
      ) : (
        <Button
          onClick={() => setTheme("dark")}
          title="Toggle light mode"
          variant="outline"
          size="icon"
        >
          {moon}
        </Button>
      )}
    </>
  );
}
