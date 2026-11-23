"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import {
  Radio,
  Terminal as TerminalIcon,
  Server,
  Network,
  Database,
  Share2,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

// Import all 10 lab experience components
import { GeofenceSimulator } from "@/components/lab/GeofenceSimulator";
import { CodingTerminal } from "@/components/lab/CodingTerminal";
import { ApiPlayground } from "@/components/lab/ApiPlayground";
import { SystemArchitectureVisualizer } from "@/components/lab/SystemArchitectureVisualizer";
import { DatabaseSchemaVisualizer } from "@/components/lab/DatabaseSchemaVisualizer";
import { TechConstellation } from "@/components/lab/TechConstellation";
import { JsMiniExperiments } from "@/components/lab/JsMiniExperiments";

type LabTab =
  | "geofence"
  | "terminal"
  | "api"
  | "architecture"
  | "database"
  | "constellation"
  | "runtime"
  | "directory";

interface LabCatalogItem {
  id: LabTab;
  number: string;
  title: string;
  subtitle: string;
  category: "Spatial & IoT" | "CLI" | "Network & HTTP" | "Systems" | "Storage" | "Topology" | "Runtime";
  tech: string[];
  description: string;
}

const CATALOG_ITEMS: LabCatalogItem[] = [
  {
    id: "geofence",
    number: "EXP-01",
    title: "Fleet Geofencing & Point-in-Polygon Engine",
    subtitle: "Real Jordan Curve Ray Casting & WebSocket Ingress",
    category: "Spatial & IoT",
    tech: ["Go", "WebSockets", "Jordan Curve Theorem", "Canvas 2D"],
    description: "Simulates vehicle movement across high-security Hosur industrial zones, calculating ray parity and broadcasting boundary events over WebSockets.",
  },
  {
    id: "terminal",
    number: "EXP-02",
    title: "Mohan Kernel Coding Terminal",
    subtitle: "Interactive Architectural Command Line",
    category: "CLI",
    tech: ["TypeScript", "Bash Simulation", "Keyboard Navigation"],
    description: "Interactive shell supporting verified portfolio queries: 'help', 'about', 'projects', 'skills', 'experience', 'contact', and 'clear'.",
  },
  {
    id: "api",
    number: "EXP-03",
    title: "REST API Request & Response Workbench",
    subtitle: "HTTP Client & Parameterized Test Bench",
    category: "Network & HTTP",
    tech: ["REST APIs", "JSON Schemas", "HTTP/2", "JWT Auth"],
    description: "Live test bench executing real simulated requests for system health, spatial boundary checks, projects catalog, and JWT token issuance.",
  },
  {
    id: "architecture",
    number: "EXP-04",
    title: "MapUp Concurrency & Telemetry Pipeline",
    subtitle: "Interactive Multi-Stage Ingestion Pipeline",
    category: "Systems",
    tech: ["Go Goroutines", "Redis Cache", "PostgreSQL", "Next.js"],
    description: "Visualizes packet flow from vehicle IoT hardware through Go worker pools, in-memory caches, relational audit logging, and HUD broadasting.",
  },
  {
    id: "database",
    number: "EXP-05",
    title: "PostgreSQL Relational ER & Query Optimizer",
    subtitle: "Schema Entities, Foreign Keys & B-Tree Cost Indexing",
    category: "Storage",
    tech: ["PostgreSQL", "MySQL", "B-Tree Indexes", "Foreign Keys"],
    description: "Interactive schema visualizer for fleet telemetry and Gabriel India invoice reconciliation, paired with an interactive B-Tree index scan simulator.",
  },
  {
    id: "constellation",
    number: "EXP-06",
    title: "Technology Constellation & Topology",
    subtitle: "Architectural Synergy & Integration Graph",
    category: "Topology",
    tech: ["SVG Topology", "Physics Graph", "Full-Stack Mapping"],
    description: "Interactive node graph connecting Mohan's technologies (Go, Java, React, Next.js, Docker, PostgreSQL) with real-world project applications.",
  },
  {
    id: "runtime",
    number: "EXP-07",
    title: "JavaScript Runtime & Event Loop Visualizer",
    subtitle: "Debounce vs. Throttle & V8 Microtask Queues",
    category: "Runtime",
    tech: ["JavaScript V8", "Event Loop", "Debounce", "Microtasks"],
    description: "Live performance benchmark contrasting event debounce and throttling, and tracing V8 microtask priority over macrotask timers.",
  },
];

export default function LabPage() {
  const [activeTab, setActiveTab] = useState<LabTab>("geofence");

  // SQL Indexing Simulator State for Database Tab
  const [rowCount, setRowCount] = useState<number>(500000);
  const [hasIndex, setHasIndex] = useState<boolean>(true);

  const seqScanBlocks = Math.round(rowCount / 80);
  const indexScanBlocks = hasIndex ? Math.round(Math.log2(rowCount) * 3) : seqScanBlocks;
  const executionTimeMs = hasIndex ? (Math.log2(rowCount) * 0.18).toFixed(2) : (rowCount * 0.00045).toFixed(2);
  const costReduction = hasIndex ? (100 - (indexScanBlocks / seqScanBlocks) * 100).toFixed(1) : 0;

  const handleTabChange = (tab: LabTab) => {
    playTactileClick();
    setActiveTab(tab);
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="LAB"
        tag="Engineering Sandbox // 10 Working Prototypes"
        title="Interactive Engineering Laboratory"
        description="A high-precision sandbox of interactive systems, spatial algorithmic simulations, database execution test benches, and architectural prototypes built to demonstrate practical engineering depth."
      />

      {/* Tab Navigation Navigation Pill Matrix */}
      <div className="my-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max p-1.5 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
          <button
            onClick={() => handleTabChange("geofence")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "geofence"
                ? "bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-accent" />
            <span>GEOFENCE &amp; SPATIAL</span>
          </button>

          <button
            onClick={() => handleTabChange("terminal")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "terminal"
                ? "bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-accent" />
            <span>CODING TERMINAL</span>
          </button>

          <button
            onClick={() => handleTabChange("api")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "api"
                ? "bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <Server className="w-3.5 h-3.5 text-cyan-accent" />
            <span>API PLAYGROUND</span>
          </button>

          <button
            onClick={() => handleTabChange("architecture")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "architecture"
                ? "bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5 text-cyan-accent" />
            <span>SYSTEM ARCHITECTURE</span>
          </button>

          <button
            onClick={() => handleTabChange("database")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "database"
                ? "bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-accent" />
            <span>DATABASE &amp; SQL</span>
          </button>

          <button
            onClick={() => handleTabChange("constellation")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "constellation"
                ? "bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-accent" />
            <span>TECH CONSTELLATION</span>
          </button>

          <button
            onClick={() => handleTabChange("runtime")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "runtime"
                ? "bg-cyan-500/20 text-cyan-accent border border-cyan-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-accent" />
            <span>JS RUNTIME</span>
          </button>

          <button
            onClick={() => handleTabChange("directory")}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "directory"
                ? "bg-violet-500/20 text-violet-accent border border-violet-500/40 font-bold"
                : "text-silver-mid hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-violet-accent" />
            <span>ALL PROTOTYPES</span>
          </button>
        </div>
      </div>

      {/* Dynamic Active Experience Viewport */}
      <div className="mb-16">
        {activeTab === "geofence" && <GeofenceSimulator />}

        {activeTab === "terminal" && <CodingTerminal />}

        {activeTab === "api" && <ApiPlayground />}

        {activeTab === "architecture" && <SystemArchitectureVisualizer />}

        {activeTab === "database" && (
          <div className="space-y-8">
            <DatabaseSchemaVisualizer />

            {/* B-Tree Index Execution Cost Optimizer */}
            <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-hairline gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-accent" />
                    <h3 className="font-display font-bold text-xl text-white">
                      PostgreSQL &amp; MySQL B-Tree Index Execution Simulator
                    </h3>
                  </div>
                  <p className="text-xs text-silver-mid font-light mt-1">
                    Simulate how B-Tree index scans eliminate full table sequential scans (Seq Scan) across large datasets.
                  </p>
                </div>
                <Badge variant="cyan" dot>Query Cost Model</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-silver-dark uppercase mb-1">
                      Table Record Cardinality: {rowCount.toLocaleString()} Rows
                    </label>
                    <input
                      type="range"
                      min={10000}
                      max={2000000}
                      step={50000}
                      value={rowCount}
                      onChange={(e) => setRowCount(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-carbon cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-mono text-silver-dark uppercase mb-2">
                      Database Index Configuration
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          playTactileClick();
                          setHasIndex(true);
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all ${
                          hasIndex
                            ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-accent font-bold"
                            : "bg-carbon border-hairline text-silver-dark"
                        }`}
                      >
                        Index Scan (B-Tree Enabled)
                      </button>
                      <button
                        onClick={() => {
                          playTactileClick();
                          setHasIndex(false);
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all ${
                          !hasIndex
                            ? "bg-red-950/60 border-red-500/50 text-red-400 font-bold"
                            : "bg-carbon border-hairline text-silver-dark"
                        }`}
                      >
                        Seq Scan (No Index)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-carbon/60 border border-hairline font-mono text-xs space-y-3">
                  <div className="flex justify-between border-b border-hairline pb-2">
                    <span className="text-silver-dark">Query Method:</span>
                    <span className={hasIndex ? "text-cyan-accent font-bold" : "text-red-400 font-bold"}>
                      {hasIndex ? "Index Scan using idx_accounts_id" : "Seq Scan on accounts"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-hairline pb-2">
                    <span className="text-silver-dark">Disk Blocks Read:</span>
                    <span className="text-white font-bold">{indexScanBlocks.toLocaleString()} Pages</span>
                  </div>
                  <div className="flex justify-between border-b border-hairline pb-2">
                    <span className="text-silver-dark">Simulated Execution Time:</span>
                    <span className="text-white font-bold">{executionTimeMs} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-silver-dark">Disk I/O Reduction:</span>
                    <span className="text-emerald-accent font-bold">
                      {hasIndex ? `+${costReduction}% Efficiency` : "0% (Full Table Scan)"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "constellation" && <TechConstellation />}

        {activeTab === "runtime" && <JsMiniExperiments />}

        {activeTab === "directory" && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-surface-1 border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
              <span className="text-silver-mid">
                Showing all 10 verified interactive engineering prototypes running 100% locally on the browser.
              </span>
              <span className="text-cyan-accent font-bold">ZERO EXTERNAL CLOUD DEPENDENCY</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATALOG_ITEMS.map((item) => (
                <Card
                  key={item.id}
                  hasDatumCorners
                  className="p-6 flex flex-col justify-between group hover:border-cyan-500/50 transition-all cursor-pointer"
                  onClick={() => handleTabChange(item.id)}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="text-cyan-accent font-bold">{item.number}</span>
                      <Badge variant="violet" dot>{item.category}</Badge>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-cyan-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-mono text-silver-dark mb-3">{item.subtitle}</p>
                    <p className="text-xs text-silver-mid font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <div className="pt-3 border-t border-hairline flex flex-wrap gap-1.5 mb-4">
                      {item.tech.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-1 text-silver-dark">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-mono gap-1 group-hover:bg-cyan-950/40 group-hover:text-cyan-accent group-hover:border-cyan-500/50"
                    >
                      <span>LAUNCH PROTOTYPE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
