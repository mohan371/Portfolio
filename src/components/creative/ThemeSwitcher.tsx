"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { playTactileClick } from "@/lib/sound";
import { Moon, Sun } from "lucide-react";

export const THEME_STORAGE_KEY = "mohan-theme-v2";

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
    try {
      // Safely migrate legacy key if present
      if (localStorage.getItem("nv-theme") !== null) {
        localStorage.removeItem("nv-theme");
      }

      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light") {
        setTheme("light");
        applyTheme("light");
      } else {
        // Default to Original Dark Obsidian for first-time visitors, unconfigured, or saved dark
        setTheme("dark");
        applyTheme("dark");
      }
    } catch {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (soundEnabled) playTactileClick();
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore quota errors
    }
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
