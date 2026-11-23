import React from "react";

/**
 * High-fidelity geometric wireframe blueprint fallback.
 * Renders instantly during SSR, dynamic 3D asset initialization, or when WebGL is disabled.
 */
export function CoreFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-hairline animate-[spin_30s_linear_infinite]" />
        
        {/* Middle Gimbal Ring */}
        <div className="absolute inset-4 rounded-full border border-cyan-500/20 border-dashed animate-[spin_20s_linear_infinite_reverse]" />
        
        {/* Inner Diamond / Core */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 border border-white/20 rotate-45 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border border-cyan-400/40 rotate-12 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-cyan-accent shadow-[0_0_12px_#00f5ff] animate-pulse" />
          </div>
        </div>

        {/* Crosshair Markers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 border-t border-cyan-400/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b border-cyan-400/60" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 border-l border-cyan-400/60" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 border-r border-cyan-400/60" />
      </div>

      <div className="mt-4 font-mono text-[10px] text-silver-dark uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
        <span>ARCHITECTURAL_CORE // TOPOLOGY SIMULATOR</span>
      </div>
    </div>
  );
}
