"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { playTactileClick } from "@/lib/sound";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"obsidian" | "studio-light">("studio-light");
  const { soundEnabled } = useAppStore();

  const applyTheme = (targetTheme: "obsidian" | "studio-light") => {
    const root = document.documentElement;
    root.setAttribute("data-theme", targetTheme);
    if (targetTheme === "studio-light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("nv-theme") as "obsidian" | "studio-light" | null;
    if (saved === "obsidian") {
      setTheme("obsidian");
      applyTheme("obsidian");
    } else {
      // Default to Studio Light for first-time visitors
      setTheme("studio-light");
      applyTheme("studio-light");
    }
  }, []);

  const toggleTheme = () => {
    if (soundEnabled) playTactileClick();
    const next = theme === "studio-light" ? "obsidian" : "studio-light";
    setTheme(next);
    localStorage.setItem("nv-theme", next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "studio-light" ? "Switch to Obsidian Dark theme" : "Switch to Studio Light theme"}
      className="p-2 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-slate-400 transition-colors cursor-pointer shadow-xs"
      title={theme === "studio-light" ? "Switch to Obsidian Dark theme" : "Switch to Studio Light theme"}
    >
      {theme === "studio-light" ? (
        <Moon className="w-3.5 h-3.5 text-slate-700" />
      ) : (
        <Sun className="w-3.5 h-3.5 text-amber-300" />
      )}
    </button>
  );
}
