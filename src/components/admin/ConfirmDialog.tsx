"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md">
      <div className="max-w-md w-full rounded-2xl border border-hairline bg-surface-1 p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${isDestructive ? "bg-red-950/50 border-red-500/50 text-red-400" : "bg-cyan-950/50 border-cyan-500/50 text-cyan-accent"}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">{title}</h3>
            <p className="text-xs text-silver-mid mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-hairline">
          <Button variant="outline" size="sm" onClick={onCancel} className="text-xs font-mono">
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
            className={`text-xs font-mono font-bold ${isDestructive ? "bg-red-600 hover:bg-red-500 text-white border-red-500" : ""}`}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
