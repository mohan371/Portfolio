"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playTactileClick } from "@/lib/sound";
import { Cpu, Share2, Layers, CheckCircle2, ArrowUpRight } from "lucide-react";

interface TechNode {
  id: string;
  name: string;
  category: "systems" | "frontend" | "backend" | "data" | "devops";
  x: number; // percentage in SVG coordinate space (0..100)
  y: number;
  connections: string[];
  description: string;
  mohanUsage: string;
  primaryProject: string;
}

const TECH_NODES: TechNode[] = [
  {
    id: "go",
    name: "Go (Golang)",
    category: "systems",
    x: 28,
    y: 25,
    connections: ["websockets", "postgresql", "docker", "rest"],
    description: "High-throughput concurrent backend language utilizing goroutines and channels.",
    mohanUsage: "Core concurrency engine in MapUp Fleet Geofencing for ingesting continuous telemetry without thread overhead.",
    primaryProject: "MapUp Fleet Geofencing",
  },
  {
    id: "java",
    name: "Java",
    category: "backend",
    x: 18,
    y: 65,
    connections: ["mysql", "postgresql", "docker", "rest"],
    description: "Enterprise OOP language for robust, strongly-typed transaction processing systems.",
    mohanUsage: "Underpins enterprise transaction and financial reconciliation logic (Gabriel India billing foundation & MCA engineering coursework).",
    primaryProject: "LedgerFlow Enterprise",
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "frontend",
    x: 68,
    y: 22,
    connections: ["react", "nodejs", "rest", "postgresql"],
    description: "React framework with Server Components, streaming SSR, and edge route handlers.",
    mohanUsage: "Architectural foundation of Veda Scholars platform and this portfolio with Turbopack and zero-runtime server rendering.",
    primaryProject: "Veda Scholars & Portfolio",
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    x: 82,
    y: 40,
    connections: ["nextjs", "websockets", "rest"],
    description: "Component-driven declarative user interface library with concurrent reconciliation.",
    mohanUsage: "Engineered responsive high-frequency interactive canvas dashboards and state synchronizations.",
    primaryProject: "MapUp Fleet HUD & Veda Scholars",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    x: 52,
    y: 45,
    connections: ["nextjs", "express", "mongodb", "docker", "rest"],
    description: "V8-powered asynchronous event-driven JavaScript server runtime.",
    mohanUsage: "Powers microservices, asynchronous worker queues, and REST API routing layers.",
    primaryProject: "Academic-Industry SaaS Platform",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    x: 42,
    y: 68,
    connections: ["nodejs", "mongodb", "rest"],
    description: "Fast, unopinionated minimalist web framework for Node.js REST APIs.",
    mohanUsage: "Constructed secure JWT-authenticated API endpoints and middleware pipelines.",
    primaryProject: "Academic-Industry SaaS Platform",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "data",
    x: 32,
    y: 82,
    connections: ["go", "java", "nextjs", "docker"],
    description: "Advanced open-source relational database with ACID guarantees, B-Trees, and spatial extensions.",
    mohanUsage: "Relational persistence layer for fleet coordinates, polygon geofence definitions, and indexed transactional logs.",
    primaryProject: "MapUp Fleet & LedgerFlow",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "data",
    x: 12,
    y: 85,
    connections: ["java", "nodejs", "docker"],
    description: "Battle-tested relational database engine with InnoDB ACID storage engine.",
    mohanUsage: "Relational storage schemas with foreign key integrity and normalized billing tables.",
    primaryProject: "Enterprise Billing Workflows",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "data",
    x: 60,
    y: 80,
    connections: ["nodejs", "express", "docker"],
    description: "Document-oriented NoSQL database optimized for flexible polymorphic data models.",
    mohanUsage: "Employed for unstructured student resumes, collaborative postings, and dynamic portfolio entities.",
    primaryProject: "Academic-Industry SaaS Platform",
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    x: 45,
    y: 15,
    connections: ["go", "nodejs", "java", "postgresql", "mongodb", "git"],
    description: "Containerization platform enabling consistent microservice environments.",
    mohanUsage: "Containerized multi-service stacks (Go engine + PostGIS + Redis) with isolated Docker Compose networks.",
    primaryProject: "MapUp Fleet Infrastructure",
  },
  {
    id: "git",
    name: "Git",
    category: "devops",
    x: 75,
    y: 75,
    connections: ["docker", "go", "nextjs", "java"],
    description: "Distributed version control system for atomic commits and collaborative branching.",
    mohanUsage: "Strict trunk-based and feature-branch development workflows with structured commit standards.",
    primaryProject: "All Repositories",
  },
  {
    id: "websockets",
    name: "WebSockets",
    category: "systems",
    x: 52,
    y: 30,
    connections: ["go", "react"],
    description: "Full-duplex persistent bidirectional TCP connection protocol.",
    mohanUsage: "Real-time streaming channel streaming vehicle coordinates and geofence alerts to client HUDs.",
    primaryProject: "MapUp Fleet Geofencing",
  },
  {
    id: "rest",
    name: "REST APIs",
    category: "backend",
    x: 35,
    y: 48,
    connections: ["go", "nodejs", "express", "java", "nextjs", "react"],
    description: "Contract-driven HTTP architecture adhering to idempotent verbs and structured JSON schemas.",
    mohanUsage: "Designed predictable endpoints with Zod schema validation, pagination, and status code precision.",
    primaryProject: "Universal Microservice Layer",
  },
];

export function TechConstellation() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("go");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const selectedNode = TECH_NODES.find((n) => n.id === selectedNodeId) || TECH_NODES[0];

  const handleNodeClick = (nodeId: string) => {
    playTactileClick();
    setSelectedNodeId(nodeId);
  };

  // Check if a link is connected to the currently selected node
  const isConnected = (sourceId: string, targetId: string) => {
    return (
      (sourceId === selectedNodeId && selectedNode.connections.includes(targetId)) ||
      (targetId === selectedNodeId &&
        TECH_NODES.find((n) => n.id === sourceId)?.connections.includes(selectedNodeId))
    );
  };

  return (
    <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-hairline gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-accent" />
            <h3 className="font-display font-bold text-xl text-white">
              Technology Constellation &amp; Architectural Topology
            </h3>
          </div>
          <p className="text-xs text-silver-mid font-light mt-1">
            Interactive system graph mapping Mohan&apos;s verified technologies and how they integrate to build scalable software products.
          </p>
        </div>
        <Badge variant="cyan" dot>Interactive Graph</Badge>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 my-6">
        <span className="text-[11px] font-mono text-silver-dark mr-2">DOMAIN FILTER:</span>
        {["all", "systems", "frontend", "backend", "data", "devops"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playTactileClick();
              setCategoryFilter(cat);
            }}
            className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all ${
              categoryFilter === cat
                ? "bg-cyan-950/60 border border-cyan-500/50 text-cyan-accent font-bold"
                : "bg-surface-1 border border-hairline text-silver-dark hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Graph and Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive SVG Constellation Graph */}
        <div className="lg:col-span-7 relative h-[440px] rounded-xl border border-hairline bg-surface-1 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            {/* Draw Background Grid */}
            <defs>
              <pattern id="constellation-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="url(#constellation-grid)" />

            {/* Draw Connection Lines between nodes */}
            {TECH_NODES.map((source) =>
              source.connections.map((targetId) => {
                const target = TECH_NODES.find((n) => n.id === targetId);
                if (!target) return null;

                const active = isConnected(source.id, target.id);
                const isFiltered =
                  categoryFilter !== "all" &&
                  source.category !== categoryFilter &&
                  target.category !== categoryFilter;

                const x1 = (source.x / 100) * 1000;
                const y1 = (source.y / 100) * 600;
                const x2 = (target.x / 100) * 1000;
                const y2 = (target.y / 100) * 600;

                return (
                  <line
                    key={`${source.id}-${target.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      active
                        ? "#00F5FF"
                        : isFiltered
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(255, 255, 255, 0.12)"
                    }
                    strokeWidth={active ? 2.5 : 1}
                    strokeDasharray={active ? "none" : "3,3"}
                    className="transition-all duration-300"
                  />
                );
              })
            )}

            {/* Draw Tech Nodes */}
            {TECH_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isDirectConnection = selectedNode.connections.includes(node.id);
              const isDimmed =
                categoryFilter !== "all" && node.category !== categoryFilter;

              const cx = (node.x / 100) * 1000;
              const cy = (node.y / 100) * 600;

              return (
                <g
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse circle when selected */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="26"
                      fill="none"
                      stroke="#00F5FF"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      className="animate-spin origin-center"
                      style={{ transformOrigin: `${cx}px ${cy}px` }}
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 16 : isDirectConnection ? 13 : 10}
                    fill={
                      isSelected
                        ? "#00F5FF"
                        : isDirectConnection
                        ? "#8B5CF6"
                        : isDimmed
                        ? "#151515"
                        : "#222222"
                    }
                    stroke={
                      isSelected
                        ? "#FFFFFF"
                        : isDirectConnection
                        ? "#8B5CF6"
                        : "rgba(255, 255, 255, 0.3)"
                    }
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />

                  {/* Label */}
                  <text
                    x={cx}
                    y={cy + 26}
                    textAnchor="middle"
                    fill={isSelected ? "#00F5FF" : isDirectConnection ? "#FFFFFF" : isDimmed ? "#555" : "#AAAAAA"}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight={isSelected ? "bold" : "normal"}
                    className="select-none pointer-events-none"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-silver-dark bg-obsidian/85 px-2.5 py-1 rounded border border-hairline">
            Click any technology node to inspect its architectural synergies
          </div>
        </div>

        {/* Right: Architectural Synergy Inspector */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl border border-hairline bg-surface-1">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-hairline mb-4">
              <div>
                <span className="text-[10px] font-mono text-silver-dark uppercase block">
                  SELECTED SUBSYSTEM
                </span>
                <h4 className="font-display font-bold text-xl text-white flex items-center gap-2">
                  {selectedNode.name}
                </h4>
              </div>
              <Badge variant="cyan" dot className="uppercase text-[10px]">
                {selectedNode.category}
              </Badge>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-mono text-silver-dark uppercase text-[10px] block mb-1">
                  CORE CAPABILITY:
                </span>
                <p className="text-silver-light font-light leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div>
                <span className="font-mono text-cyan-accent uppercase text-[10px] block mb-1">
                  MOHAN&apos;S PRACTICAL APPLICATION:
                </span>
                <p className="text-white font-mono text-[11px] leading-relaxed bg-carbon p-3 rounded-lg border border-hairline">
                  {selectedNode.mohanUsage}
                </p>
              </div>

              <div>
                <span className="font-mono text-silver-dark uppercase text-[10px] block mb-1">
                  PRIMARY PROJECT INTEGRATION:
                </span>
                <div className="flex items-center gap-1.5 text-white font-mono text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-accent" />
                  <span>{selectedNode.primaryProject}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Dependencies */}
          <div className="mt-6 pt-4 border-t border-hairline">
            <span className="font-mono text-silver-dark uppercase text-[10px] block mb-2">
              CONNECTED ECOSYSTEM ({selectedNode.connections.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.connections.map((connId) => {
                const targetNode = TECH_NODES.find((n) => n.id === connId);
                return (
                  <button
                    key={connId}
                    onClick={() => handleNodeClick(connId)}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-carbon border border-hairline text-silver-mid hover:text-cyan-accent hover:border-cyan-500/50 transition-colors"
                  >
                    {targetNode ? targetNode.name : connId}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
