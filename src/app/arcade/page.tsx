import { Metadata } from "next";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { BugHuntGame } from "@/components/arcade/BugHuntGame";
import { Card } from "@/components/ui/card";
import { Terminal, ShieldCheck, Flame, Trophy, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "ENGINEERING ARCADE // Think. Debug. Solve.",
  description:
    "Interactive code debugging challenges across JavaScript, React, Node.js, SQL, and Go concurrency. Spot real-world defects, test your diagnostic intuition, and learn root-cause fixes.",
};

export default function ArcadePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SectionHeader
        index="ARCADE"
        tag="Interactive Challenge"
        title="Engineering Arcade"
        description="Think. Debug. Solve. Face real production bugs derived from high-volume corporate ledger reconciliation, IoT fleet tracking, and distributed systems design."
      />

      {/* Arcade Rules / Diagnostic Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <Card hasDatumCorners className="p-4 bg-card border-border shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Cpu className="w-4 h-4" />
            <span>01 // PRODUCTION DEFECTS</span>
          </div>
          <p className="text-muted-foreground font-sans font-light text-xs">
            Every scenario mirrors actual engineering bottlenecks: memory leaks, event loop stalls, stale closures, and race conditions.
          </p>
        </Card>

        <Card hasDatumCorners className="p-4 bg-card border-border shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>02 // ROOT CAUSE ANALYSIS</span>
          </div>
          <p className="text-muted-foreground font-sans font-light text-xs">
            Every submission reveals why the bug occurred at the runtime engine or compiler level, providing actionable systems knowledge.
          </p>
        </Card>

        <Card hasDatumCorners className="p-4 bg-card border-border shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 text-amber-500 font-bold">
            <Flame className="w-4 h-4" />
            <span>03 // NO TOY GIMMICKS</span>
          </div>
          <p className="text-muted-foreground font-sans font-light text-xs">
            Zero intrusive ads, paywalls, or token mechanics. High scores are stored locally in your browser. Pure engineering focus.
          </p>
        </Card>
      </div>

      {/* Interactive Bug Hunt Engine */}
      <BugHuntGame />
    </div>
  );
}
