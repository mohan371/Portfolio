"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import {
  Network,
  Play,
  RotateCcw,
  Cpu,
  Database,
  Radio,
  Server,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  category: "Ingestion" | "Compute" | "State" | "Persistence" | "Broadcast";
  technology: string;
  latencyBudgetMs: number;
  description: string;
  mohanImplementation: string;
  dataPacketSummary: string;
}

const STAGES: PipelineStage[] = [
  {
    id: "edge-iot",
    name: "01 // GPS Telemetry Beacon",
    category: "Ingestion",
    technology: "Hardware IoT / GPS / Cellular",
    latencyBudgetMs: 2,
    description: "Vehicles broadcast periodic NMEA-0183 coordinate sentences with speed, heading, and GPS satellite fix.",
    mohanImplementation: "Simulated 20Hz vehicle telemetry emitting normalized JSON coordinate tuples over TLS.",
    dataPacketSummary: "{ vehicleId: 'VH-104', lat: 12.7409, lng: 77.8253, speed: 42, hdg: 114 }",
  },
  {
    id: "api-gateway",
    name: "02 // Reverse Proxy & Ingress",
    category: "Ingestion",
    technology: "Envoy / NGINX / Go Proxy",
    latencyBudgetMs: 3,
    description: "Performs TLS termination, token signature verification, and Token Bucket rate limiting to protect internal pipelines.",
    mohanImplementation: "Configured reverse proxy validating JWT claims and throttling anomalous burst packet floods.",
    dataPacketSummary: "HTTP/2 POST /api/v1/telemetry [Bearer Token Verified // Latency: 2.1ms]",
  },
  {
    id: "go-engine",
    name: "03 // Go Concurrency Engine",
    category: "Compute",
    technology: "Go Goroutines & Buffered Channels",
    latencyBudgetMs: 1,
    description: "Ingests raw telemetry into unbuffered dispatch channels and evaluates Point-in-Polygon (PIP) ray casting in sub-millisecond memory.",
    mohanImplementation: "Core architecture of MapUp Fleet: Goroutine worker pool calculating boundary crossing parity in parallel without GC stalls.",
    dataPacketSummary: "PIP Check: 1 Ray Crossing [ODD PARITY -> STATUS: INSIDE GEOFENCE] in 0.018ms",
  },
  {
    id: "redis-cache",
    name: "04 // In-Memory Zone State Cache",
    category: "State",
    technology: "Redis In-Memory Key-Value",
    latencyBudgetMs: 2,
    description: "Tracks active zone occupancy per vehicle (e.g. `vehicle:VH-104:zone:HOSUR_A = true`) to detect entering vs exiting delta states.",
    mohanImplementation: "Fast O(1) key lookups preventing duplicate state transition triggers and calculating zone dwell time.",
    dataPacketSummary: "SET vehicle:VH-104:current_zone 'HOSUR_SECTOR_A' [EX 300]",
  },
  {
    id: "postgres-layer",
    name: "05 // Relational & Spatial Store",
    category: "Persistence",
    technology: "PostgreSQL 16 & PostGIS",
    latencyBudgetMs: 5,
    description: "Appends permanent immutable audit logs, alerts, and vehicle telemetric paths indexed via GiST and B-Tree indexes.",
    mohanImplementation: "Relational persistence storing historical event logs with indexed foreign keys for sub-10ms query execution.",
    dataPacketSummary: "INSERT INTO telemetry_events (vehicle_id, zone_id, event_type) VALUES ('VH-104', ...)",
  },
  {
    id: "ws-broadcaster",
    name: "06 // WebSocket Broadcast Hub",
    category: "Broadcast",
    technology: "Full-Duplex WebSockets / PubSub",
    latencyBudgetMs: 3,
    description: "Fans out boundary alerts and coordinate updates to connected operator consoles with low-overhead TCP frames.",
    mohanImplementation: "Concurrent WebSocket multiplexer handling backpressure and broadcasting boundary events to all active client sockets.",
    dataPacketSummary: "WS Frame: 'GEOFENCE_ENTER' dispatched to 8 active dashboard subscribers",
  },
  {
    id: "frontend-hud",
    name: "07 // Fleet Operations HUD",
    category: "Broadcast",
    technology: "Next.js 16 / React 19 / Leaflet",
    latencyBudgetMs: 2,
    description: "Renders live vehicle coordinates, geofence polygons, and tactical audio alerts on the operator screen.",
    mohanImplementation: "High-performance interactive React canvas UI rendering smoothly at 60fps with real-time HUD overlays.",
    dataPacketSummary: "DOM Refreshed // Audio Chime Emitted // Total Roundtrip Latency: 18ms",
  },
];

export function SystemArchitectureVisualizer() {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(2); // Default Go Engine
  const [activePacketIndex, setActivePacketIndex] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [totalSimulatedLatency, setTotalSimulatedLatency] = useState<number>(18);

  const selectedStage = STAGES[selectedStageIndex];

  const handleStartSimulation = () => {
    if (isSimulating) return;
    playTactileClick();
    setIsSimulating(true);
    setActivePacketIndex(0);
    setSelectedStageIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < STAGES.length) {
        setActivePacketIndex(current);
        setSelectedStageIndex(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setActivePacketIndex(-1);
        }, 1200);
      }
    }, 900);
  };

  return (
    <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-hairline gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-accent" />
            <h3 className="font-display font-bold text-xl text-white">
              MapUp Fleet Ingestion &amp; Concurrency Architecture
            </h3>
          </div>
          <p className="text-xs text-silver-mid font-light mt-1">
            End-to-end telemetry pipeline demonstrating how Mohan architects high-frequency data ingestion, Go concurrency, spatial evaluation, and real-time WebSocket distribution.
          </p>
        </div>

        <Button
          variant={isSimulating ? "outline" : "primary"}
          size="sm"
          onClick={handleStartSimulation}
          disabled={isSimulating}
          className="gap-2 text-xs font-mono font-bold"
        >
          {isSimulating ? <Zap className="w-3.5 h-3.5 text-cyan-accent animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          {isSimulating ? "PROCESSING PACKET..." : "SIMULATE PACKET FLOW"}
        </Button>
      </div>

      {/* Horizontal Pipeline Sequence Track */}
      <div className="my-8 overflow-x-auto pb-4">
        <div className="flex items-center min-w-[760px] justify-between relative px-4">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-5 h-[2px] bg-surface-2 -z-0" />

          {STAGES.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            const isPacketHere = activePacketIndex === idx;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  playTactileClick();
                  setSelectedStageIndex(idx);
                }}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                {/* Node Pill Indicator */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isPacketHere
                      ? "bg-cyan-400 text-obsidian shadow-[0_0_20px_#00F5FF] scale-110"
                      : isSelected
                      ? "bg-cyan-950 border-2 border-cyan-400 text-cyan-accent scale-105"
                      : "bg-carbon border border-hairline text-silver-mid group-hover:border-silver-dark/60"
                  }`}
                >
                  {isPacketHere ? "⚡" : `0${idx + 1}`}
                </div>

                {/* Subtitle */}
                <span
                  className={`text-[10px] font-mono mt-2 text-center max-w-[85px] leading-tight transition-colors ${
                    isSelected ? "text-cyan-accent font-bold" : "text-silver-dark group-hover:text-silver-light"
                  }`}
                >
                  {stage.technology.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Stage Inspector Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-xl border border-hairline bg-surface-1">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-hairline">
            <div>
              <span className="text-[10px] font-mono text-silver-dark uppercase block">
                PIPELINE STAGE {selectedStageIndex + 1} OF {STAGES.length}
              </span>
              <h4 className="font-display font-bold text-lg text-white">
                {selectedStage.name}
              </h4>
            </div>
            <Badge variant="cyan" dot>{selectedStage.category}</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-mono text-silver-dark text-[10px] uppercase block mb-1">
                TECHNOLOGY IMPLEMENTATION:
              </span>
              <div className="text-white font-mono text-xs font-bold flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-accent" />
                {selectedStage.technology}
              </div>
            </div>

            <div>
              <span className="font-mono text-silver-dark text-[10px] uppercase block mb-1">
                STAGE RESPONSIBILITY:
              </span>
              <p className="text-silver-light font-light leading-relaxed">
                {selectedStage.description}
              </p>
            </div>

            <div>
              <span className="font-mono text-cyan-accent text-[10px] uppercase block mb-1">
                MOHAN&apos;S ARCHITECTURAL EXECUTION:
              </span>
              <div className="p-3 rounded-lg bg-carbon border border-hairline font-mono text-[11px] text-white leading-relaxed">
                {selectedStage.mohanImplementation}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Data Packet Inspector */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-obsidian border border-hairline font-mono text-xs">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-hairline text-[11px]">
              <span className="text-silver-dark uppercase">LIVE FRAME INSPECTOR</span>
              <span className="text-emerald-accent font-bold">
                LATENCY BUDGET: ~{selectedStage.latencyBudgetMs}ms
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-silver-dark block">PAYLOAD / STATE DELTA:</span>
              <pre className="p-3 rounded bg-carbon border border-hairline text-cyan-accent text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {selectedStage.dataPacketSummary}
              </pre>
            </div>
          </div>

          <div className="pt-4 border-t border-hairline flex items-center justify-between text-[10px] text-silver-dark mt-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-accent" />
              Fault-tolerant isolation
            </span>
            <span>Total roundtrip: 18ms</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
