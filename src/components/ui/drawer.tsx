"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { playTactileClick } from "@/lib/sound";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "right" | "left" | "bottom";
  }
>(({ className, children, side = "right", ...props }, ref) => {
  const { soundEnabled } = useAppStore();

  const sideStyles = {
    right:
      "inset-y-0 right-0 h-full w-full max-w-md border-l border-hairline data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    left:
      "inset-y-0 left-0 h-full w-full max-w-md border-r border-hairline data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
    bottom:
      "inset-x-0 bottom-0 max-h-[85vh] w-full border-t border-hairline rounded-t-2xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  };

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-obsidian p-6 shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-300",
          sideStyles[side],
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-hairline pb-4 mb-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-silver-dark">
            PANEL_DRAWER // {side.toUpperCase()}
          </div>
          <DialogPrimitive.Close
            onClick={() => {
              if (soundEnabled) playTactileClick();
            }}
            className="rounded-full p-1.5 text-silver-mid hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close Drawer</span>
          </DialogPrimitive.Close>
        </div>
        {children}
      </DialogPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";
