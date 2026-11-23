import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "cyan" | "violet" | "emerald" | "silver";
  dot?: boolean;
}

export function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-surface-secondary border-border text-foreground",
    outline: "bg-transparent border-border text-muted-foreground hover:border-champagne/60",
    cyan: "bg-[#F2E5E6] dark:bg-[#2C2224] border-[#E5DED5] dark:border-[#423337] text-[#873D49] dark:text-[#E5A4AE]",
    violet: "bg-[#F7F3EB] dark:bg-[#2A241C] border-[#E5DDD0] dark:border-[#453B2F] text-[#8B7047] dark:text-[#D5BE98]",
    emerald: "bg-[#EAEFEA] dark:bg-[#1C261F] border-[#D1DDD2] dark:border-[#2F3F33] text-[#445B47] dark:text-[#A7BAA9]",
    silver: "bg-surface border-border text-foreground",
  };

  const dotStyles = {
    default: "bg-muted-foreground",
    outline: "bg-muted-foreground",
    cyan: "bg-[#873D49] dark:bg-[#E5A4AE]",
    violet: "bg-[#B69A72] dark:bg-[#C9B08B]",
    emerald: "bg-[#829084] dark:bg-[#98A89A]",
    silver: "bg-foreground",
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
