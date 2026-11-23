"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { playTactileClick } from "@/lib/sound";
import { useToast } from "./ToastContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Bell, Search, ShieldCheck } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();
  const { toast } = useToast();
  const [istTime, setIstTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    playTactileClick();
    // Clear admin auth cookie or storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth_token");
      document.cookie = "admin_auth=; path=/; max-age=0;";
    }
    toast.info("Signed Out", "Administrator session closed.");
    router.push("/admin/login");
  };

  return (
    <header className="h-16 border-b border-hairline bg-surface-1/90 backdrop-blur-md px-6 flex items-center justify-between z-30">
      {/* Left: System Status & Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" dot className="font-mono text-[10px] uppercase">
            CMS SESSION ACTIVE
          </Badge>
          <span className="text-xs font-mono text-silver-dark hidden sm:inline">
            // {istTime}
          </span>
        </div>
      </div>

      {/* Right: Admin Profile & Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-carbon border border-hairline font-mono text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
          <span className="text-white font-bold">Mohan N.V.</span>
          <span className="text-silver-dark text-[10px]">[Superadmin]</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="gap-1.5 text-xs font-mono text-silver-mid hover:text-white"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
