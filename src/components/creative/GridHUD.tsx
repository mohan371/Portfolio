"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { siteConfig } from "@/content/data/site-config";

export function GridHUD() {
  const { hudVisible } = useAppStore();
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!hudVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden xl:block overflow-hidden opacity-75">
      {/* Subtle Location Datum */}
      <div className="absolute top-5 left-6 text-[10px] font-mono text-muted-foreground select-none">
        {siteConfig.location.city}, {siteConfig.location.country}
      </div>
      <div className="absolute top-5 right-6 text-[10px] font-mono text-muted-foreground select-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sage" />
        <span>{timeStr} IST</span>
      </div>
      <div className="absolute bottom-5 left-6 text-[10px] font-mono text-muted-foreground select-none">
        MOHAN N.V. // SOFTWARE ENGINEER
      </div>
      <div className="absolute bottom-5 right-6 text-[10px] font-mono text-muted-foreground select-none">
        [ {siteConfig.studio.name} ]
      </div>

      {/* Subtle Champagne Corner Datum Markers */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-border" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-border" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-border" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-border" />
    </div>
  );
}
