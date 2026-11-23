"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { playTactileClick } from "@/lib/sound";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { soundEnabled } = useAppStore();

  const applyTheme = (targetTheme: "dark" | "light") => {
    const root = document.documentElement;
    root.setAttribute("data-theme", targetTheme);
    if (targetTheme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("nv-theme");
    if (saved === "light") {
      setTheme("light");
      applyTheme("light");
    } else {
      // Default to Original Dark Obsidian for first-time visitors or saved dark
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (soundEnabled) playTactileClick();
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("nv-theme", next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to Dark theme" : "Switch to Light theme"}
      className="p-2 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer shadow-xs"
      title={theme === "light" ? "Switch to Dark theme" : "Switch to Light theme"}
    >
      {theme === "light" ? (
        <Moon className="w-3.5 h-3.5 text-foreground" />
      ) : (
        <Sun className="w-3.5 h-3.5 text-cyan-accent" />
      )}
    </button>
  );
}
