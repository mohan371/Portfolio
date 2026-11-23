"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { playTactileClick } from "@/lib/sound";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"obsidian" | "studio-light">("obsidian");
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
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      // Default to Obsidian Dark
      applyTheme("obsidian");
    }
  }, []);

  const toggleTheme = () => {
    if (soundEnabled) playTactileClick();
    const next = theme === "obsidian" ? "studio-light" : "obsidian";
    setTheme(next);
    localStorage.setItem("nv-theme", next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "obsidian" ? "Switch to Studio Light mode" : "Switch to Obsidian Dark mode"}
      className="p-2 rounded-full border border-hairline bg-obsidian text-silver-mid hover:text-foreground hover:border-hairline-hover transition-colors cursor-pointer"
      title={theme === "obsidian" ? "Switch to Studio Light mode" : "Switch to Obsidian Dark mode"}
    >
      {theme === "obsidian" ? (
        <Sun className="w-3.5 h-3.5 text-amber-300" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-silver-mid" />
      )}
    </button>
  );
}
