import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "cyan" | "violet" | "emerald" | "silver";
  dot?: boolean;
}

export function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-surface-secondary border-border text-foreground",
    outline: "bg-transparent border-border text-muted-foreground hover:border-slate-300",
    cyan: "bg-blue-50 dark:bg-cyan-950/40 border-blue-200 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-accent",
    violet: "bg-indigo-50 dark:bg-purple-950/40 border-indigo-200 dark:border-purple-500/30 text-indigo-700 dark:text-purple-400",
    emerald: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-accent",
    silver: "bg-surface border-border text-foreground",
  };

  const dotStyles = {
    default: "bg-slate-400 dark:bg-zinc-500",
    outline: "bg-slate-400 dark:bg-zinc-400",
    cyan: "bg-blue-600 dark:bg-cyan-accent shadow-[0_0_8px_rgba(37,99,235,0.5)] dark:shadow-[0_0_8px_rgba(0,245,255,0.6)]",
    violet: "bg-indigo-600 dark:bg-purple-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]",
    emerald: "bg-emerald-600 dark:bg-emerald-accent shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    silver: "bg-slate-700 dark:bg-white",
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
