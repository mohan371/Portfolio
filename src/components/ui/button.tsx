"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { playHoverBlip, playTactileClick } from "@/lib/sound";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan" | "violet" | "link";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      onClick,
      onMouseEnter,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const { soundEnabled } = useAppStore();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEnabled && !disabled && !isLoading) playTactileClick();
      if (onClick) onClick(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEnabled && !disabled && !isLoading) playHoverBlip();
      if (onMouseEnter) onMouseEnter(e);
    };

    const variantStyles = {
      primary:
        "bg-white text-black font-medium hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)]",
      secondary:
        "bg-carbon text-silver-light border border-hairline hover:border-hairline-hover hover:text-white hover:bg-surface-1 active:scale-[0.98] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
      outline:
        "bg-transparent text-silver-light border border-hairline hover:border-white/40 hover:text-white hover:bg-white/[0.04] active:scale-[0.98] transition-all",
      ghost:
        "bg-transparent text-silver-mid hover:text-white hover:bg-white/[0.06] transition-colors",
      cyan:
        "bg-cyan-accent text-black font-semibold hover:bg-cyan-400 shadow-[0_0_25px_rgba(0,245,255,0.35)] active:scale-[0.98] transition-all",
      violet:
        "bg-violet-accent text-white font-semibold hover:bg-purple-600 shadow-[0_0_25px_rgba(139,92,246,0.35)] active:scale-[0.98] transition-all",
      link:
        "bg-transparent text-silver-mid hover:text-cyan-accent underline-offset-4 hover:underline p-0 h-auto font-sans text-xs",
    };

    const sizeStyles = {
      xs: "px-3 py-1 text-xs font-sans font-medium rounded-full",
      sm: "px-4 py-1.5 text-xs font-sans font-medium rounded-full",
      md: "px-5 py-2.5 text-sm font-sans font-medium rounded-full",
      lg: "px-6 py-3 text-sm sm:text-base font-sans font-medium rounded-full",
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 select-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-accent focus-visible:ring-offset-2 focus-visible:ring-offset-void",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
