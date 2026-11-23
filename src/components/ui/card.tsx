import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hasDatumCorners?: boolean;
  hoverHighlight?: boolean;
}

export function Card({
  className,
  hasDatumCorners = false,
  hoverHighlight = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "studio-card rounded-2xl p-6 relative overflow-hidden",
        hasDatumCorners && "corner-datum",
        hoverHighlight && "hover:border-hairline-hover hover:shadow-[0_4px_32px_rgba(0,0,0,0.6)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-xl font-bold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs font-mono text-silver-mid leading-relaxed", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-2", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center pt-4 border-t border-hairline", className)}
      {...props}
    />
  );
}
