"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { playTactileClick } from "@/lib/sound";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"obsidian" | "warm-pearl">("warm-pearl");
  const { soundEnabled } = useAppStore();

  const applyTheme = (targetTheme: "obsidian" | "warm-pearl") => {
    const root = document.documentElement;
    root.setAttribute("data-theme", targetTheme);
    if (targetTheme === "warm-pearl") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("nv-theme");
    if (saved === "obsidian" || saved === "dark") {
      setTheme("obsidian");
      applyTheme("obsidian");
    } else {
      // Default to Warm Pearl for first-time visitors
      setTheme("warm-pearl");
      applyTheme("warm-pearl");
    }
  }, []);

  const toggleTheme = () => {
    if (soundEnabled) playTactileClick();
    const next = theme === "warm-pearl" ? "obsidian" : "warm-pearl";
    setTheme(next);
    localStorage.setItem("nv-theme", next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "warm-pearl" ? "Switch to Warm Obsidian theme" : "Switch to Warm Pearl theme"}
      className="p-2 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-champagne/60 transition-colors cursor-pointer shadow-xs"
      title={theme === "warm-pearl" ? "Switch to Warm Obsidian theme" : "Switch to Warm Pearl theme"}
    >
      {theme === "warm-pearl" ? (
        <Moon className="w-3.5 h-3.5 text-foreground" />
      ) : (
        <Sun className="w-3.5 h-3.5 text-champagne" />
      )}
    </button>
  );
}
