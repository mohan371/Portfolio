import React from "react";
import { ArchitectureSpec } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Cpu, Layers } from "lucide-react";

interface ArchitectureDiagramProps {
  architecture: ArchitectureSpec;
  projectTitle: string;
}

export function ArchitectureDiagram({
  architecture,
  projectTitle,
}: ArchitectureDiagramProps) {
  return (
    <div className="w-full rounded-2xl bg-obsidian border border-hairline p-6 sm:p-8 corner-datum space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-hairline gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-accent" />
          <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
            System Architecture Blueprint
          </h3>
        </div>
        <span className="text-[10px] font-mono text-silver-dark uppercase tracking-widest">
          {architecture.nodes.length} TIER DEPLOYMENT
        </span>
      </div>

      {/* Summary Paragraph */}
      <p className="text-xs sm:text-sm text-silver-mid font-light leading-relaxed">
        {architecture.summary}
      </p>

      {/* Structured Layer Node Pipeline */}
      <div className="space-y-4 pt-2">
        {architecture.nodes.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className="p-4 rounded-xl bg-carbon/80 border border-hairline hover:border-cyan-500/30 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-accent font-bold">
                    0{idx + 1} // {node.layer.toUpperCase()}
                  </span>
                  <Badge variant="cyan" className="py-0 px-2 text-[9px]">
                    {node.technology}
                  </Badge>
                </div>
                <p className="text-xs text-silver-mid font-light leading-relaxed pt-1">
                  {node.responsibility}
                </p>
              </div>
            </div>

            {/* Connecting Directional Connector between layers */}
            {idx < architecture.nodes.length - 1 && (
              <div className="flex justify-center py-0.5">
                <ArrowDown className="w-3.5 h-3.5 text-silver-dark/60" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
