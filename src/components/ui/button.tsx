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
        "bg-white text-black font-semibold hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
      secondary:
        "bg-obsidian text-silver-light border border-hairline hover:border-hairline-hover hover:text-white active:scale-[0.98] transition-all",
      outline:
        "bg-transparent text-silver-light border border-hairline hover:border-white/40 hover:text-white active:scale-[0.98] transition-all",
      ghost:
        "bg-transparent text-silver-mid hover:text-white hover:bg-white/[0.04] transition-colors",
      cyan:
        "bg-cyan-accent text-black font-semibold hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.25)] active:scale-[0.98] transition-all",
      violet:
        "bg-violet-accent text-white font-semibold hover:bg-purple-600 shadow-[0_0_20px_rgba(139,92,246,0.25)] active:scale-[0.98] transition-all",
      link:
        "bg-transparent text-silver-mid hover:text-cyan-accent underline-offset-4 hover:underline p-0 h-auto font-mono text-xs",
    };

    const sizeStyles = {
      xs: "px-2.5 py-1 text-[11px] font-mono tracking-wide rounded-full",
      sm: "px-3.5 py-1.5 text-xs font-mono tracking-wide rounded-full",
      md: "px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full",
      lg: "px-7 py-3 text-sm font-sans tracking-wide rounded-full font-medium",
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 select-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer duration-200",
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
