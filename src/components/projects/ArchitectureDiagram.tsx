import React from "react";
import { ArchitectureSpec } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Layers } from "lucide-react";

interface ArchitectureDiagramProps {
  architecture: ArchitectureSpec;
  projectTitle: string;
}

export function ArchitectureDiagram({
  architecture,
  projectTitle,
}: ArchitectureDiagramProps) {
  return (
    <div className="w-full rounded-2xl bg-card border border-border shadow-subtle p-6 sm:p-8 corner-datum space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
            System Architecture Blueprint
          </h3>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-medium">
          {architecture.nodes.length} TIER DEPLOYMENT
        </span>
      </div>

      {/* Summary Paragraph */}
      <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
        {architecture.summary}
      </p>

      {/* Structured Layer Node Pipeline */}
      <div className="space-y-4 pt-2">
        {architecture.nodes.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className="p-4 rounded-xl bg-surface border border-border hover:border-primary/40 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-primary font-bold">
                    0{idx + 1} // {node.layer.toUpperCase()}
                  </span>
                  <Badge variant="cyan" className="py-0 px-2 text-[9px]">
                    {node.technology}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed pt-1">
                  {node.responsibility}
                </p>
              </div>
            </div>

            {/* Connecting Directional Connector between layers */}
            {idx < architecture.nodes.length - 1 && (
              <div className="flex justify-center py-0.5">
                <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/60" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
