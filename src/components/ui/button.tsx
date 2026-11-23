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
        "bg-primary text-primary-foreground font-medium hover:bg-blue-700 active:scale-[0.98] transition-all shadow-[0_2px_10px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(37,99,235,0.35)]",
      secondary:
        "bg-secondary text-secondary-foreground border border-blue-200/60 dark:border-white/10 hover:bg-blue-100/80 dark:hover:bg-surface-2 active:scale-[0.98] transition-all shadow-xs",
      outline:
        "bg-card text-foreground border border-border hover:bg-surface hover:border-slate-300 dark:hover:border-white/30 active:scale-[0.98] transition-all shadow-xs",
      ghost:
        "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
      cyan:
        "bg-primary text-white font-semibold hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.25)] active:scale-[0.98] transition-all",
      violet:
        "bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-sm active:scale-[0.98] transition-all",
      link:
        "bg-transparent text-muted-foreground hover:text-primary underline-offset-4 hover:underline p-0 h-auto font-sans text-xs",
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
          "inline-flex items-center justify-center gap-2 select-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
