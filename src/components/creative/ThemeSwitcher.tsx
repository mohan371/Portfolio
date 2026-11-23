"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { playTactileClick } from "@/lib/sound";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"obsidian" | "studio-light">("obsidian");
  const { soundEnabled } = useAppStore();

  useEffect(() => {
    const saved = localStorage.getItem("nv-theme") as "obsidian" | "studio-light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    if (soundEnabled) playTactileClick();
    const next = theme === "obsidian" ? "studio-light" : "obsidian";
    setTheme(next);
    localStorage.setItem("nv-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Obsidian Void and Studio Light mode"
      className="p-2 rounded-full border border-hairline bg-obsidian text-silver-mid hover:text-white hover:border-hairline-hover transition-colors"
      title={theme === "obsidian" ? "Switch to Titanium Light" : "Switch to Obsidian Void"}
    >
      {theme === "obsidian" ? (
        <Sun className="w-3.5 h-3.5" />
      ) : (
        <Moon className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
