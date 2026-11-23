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
        "bg-primary text-primary-foreground font-medium hover:bg-burgundy-hover active:scale-[0.98] transition-all shadow-[0_2px_10px_rgba(135,61,73,0.22)] dark:shadow-[0_0_20px_rgba(163,83,96,0.3)]",
      secondary:
        "bg-secondary text-secondary-foreground border border-border hover:bg-[#EBD8DB] dark:hover:bg-[#382B2E] active:scale-[0.98] transition-all shadow-xs",
      outline:
        "bg-card text-foreground border border-border hover:bg-surface-secondary hover:border-champagne/60 active:scale-[0.98] transition-all shadow-xs",
      ghost:
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors",
      cyan:
        "bg-primary text-primary-foreground font-semibold hover:bg-burgundy-hover shadow-sm active:scale-[0.98] transition-all",
      violet:
        "bg-[#873D49] text-white font-semibold hover:bg-[#71313C] shadow-sm active:scale-[0.98] transition-all",
      link:
        "bg-transparent text-muted-foreground hover:text-primary underline-offset-4 hover:underline p-0 h-auto font-sans text-xs",
    };

    const sizeStyles = {
      xs: "px-3 py-1 text-xs font-sans font-medium rounded-full",
      sm: "px-4 py-1.5 text-xs font-sans font-medium rounded-full",
      md: "px-5 py-2.5 text-xs font-sans font-medium rounded-full tracking-wide",
      lg: "px-7 py-3.5 text-sm font-sans font-medium rounded-full tracking-wide",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
