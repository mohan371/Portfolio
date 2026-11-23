import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "cyan" | "violet" | "emerald" | "silver";
  dot?: boolean;
}

export function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-surface-1 border-hairline text-silver-mid",
    outline: "bg-transparent border-hairline text-silver-mid hover:border-hairline-hover",
    cyan: "bg-cyan-950/40 border-cyan-500/30 text-cyan-accent",
    violet: "bg-purple-950/40 border-purple-500/30 text-violet-accent",
    emerald: "bg-emerald-950/40 border-emerald-500/30 text-emerald-accent",
    silver: "bg-white/10 border-white/20 text-white",
  };

  const dotStyles = {
    default: "bg-zinc-500",
    outline: "bg-zinc-400",
    cyan: "bg-cyan-accent shadow-[0_0_8px_#00f5ff]",
    violet: "bg-violet-accent shadow-[0_0_8px_#8b5cf6]",
    emerald: "bg-emerald-accent shadow-[0_0_8px_#10b981]",
    silver: "bg-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider border select-none transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", dotStyles[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
