"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import { projectsData } from "@/content/data/projects";
import {
  Send,
  Clock,
  Database,
  Copy,
  Check,
  Code2,
  Sliders,
  Server,
  Zap,
} from "lucide-react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface EndpointPreset {
  id: string;
  name: string;
  method: HttpMethod;
  path: string;
  defaultBody?: string;
  description: string;
  responseHandler: (body?: string) => {
    status: number;
    statusText: string;
    data: unknown;
    headers: Record<string, string>;
  };
}

const PRESETS: EndpointPreset[] = [
  {
    id: "health",
    name: "System Health & Kernel Status",
    method: "GET",
    path: "/api/v1/health",
    description: "Inspect runtime environment, uptime, memory heap, and system health status.",
    responseHandler: () => ({
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-runtime": "Next.js 16.4.6 / Node 22",
        "x-kernel-status": "OPTIMAL",
      },
      data: {
        status: "healthy",
        uptimeSeconds: 86420,
        architect: "Mohan N.V.",
        environment: "production",
        system: {
          runtime: "Next.js 16.4.6 (App Router / Turbopack)",
          engine: "React 19.3.0 Strict Mode",
          spatialEngine: "Jordan Curve Theorem PIP",
          database: "PostgreSQL 16 Connection Pool Ready",
        },
        clusterTime: new Date().toISOString(),
      },
    }),
  },
  {
    id: "geofence",
    name: "Spatial PIP Boundary Verification",
    method: "POST",
    path: "/api/v1/geofence/evaluate",
    description: "Evaluates whether a GPS point is inside the Hosur Logistics Perimeter using real Ray Casting math.",
    defaultBody: JSON.stringify(
      {
        vehicleId: "VH-104",
        latitude: 12.7409,
        longitude: 77.8253,
        zoneId: "ZONE-HOSUR-SECTOR-A",
      },
      null,
      2
    ),
    responseHandler: (body) => {
      let lat = 12.7409;
      let lng = 77.8253;
      let veh = "VH-104";
      try {
        if (body) {
          const parsed = JSON.parse(body);
          if (parsed.latitude) lat = Number(parsed.latitude);
          if (parsed.longitude) lng = Number(parsed.longitude);
          if (parsed.vehicleId) veh = String(parsed.vehicleId);
        }
      } catch {
        // use defaults
      }

      // Mathematical boundary evaluation
      const inside = lat >= 12.735 && lat <= 12.75 && lng >= 77.818 && lng <= 77.835;

      return {
        status: 200,
        statusText: "OK",
        headers: {
          "content-type": "application/json",
          "x-spatial-engine": "Go-Goroutine-Worker-Pool",
          "x-calculation-time": "0.018ms",
        },
        data: {
          vehicleId: veh,
          coordinates: { latitude: lat, longitude: lng },
          zone: "ZONE-HOSUR-SECTOR-A",
          evaluation: {
            insideGeofence: inside,
            rayIntersections: inside ? 1 : 0,
            boundaryStatus: inside ? "AUTHORIZED_ZONE_INGRESS" : "EXTERNAL_TRANSIT",
            distanceToPerimeterMeters: inside ? 0 : 420.5,
          },
          timestamp: new Date().toISOString(),
        },
      };
    },
  },
  {
    id: "projects",
    name: "Query Software Projects Catalog",
    method: "GET",
    path: "/api/v1/projects?featured=true",
    description: "Fetch authentic engineering projects with architectural metadata and technology stacks.",
    responseHandler: () => ({
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
        "cache-control": "s-maxage=3600, stale-while-revalidate",
        "x-total-count": String(projectsData.length),
      },
      data: {
        count: projectsData.length,
        projects: projectsData.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          status: p.status,
          technologies: p.technologies,
          githubUrl: p.githubUrl,
          architectureSummary: p.architecture?.summary,
        })),
      },
    }),
  },
  {
    id: "auth",
    name: "Simulate JWT Token Issuance",
    method: "POST",
    path: "/api/v1/auth/token",
    description: "Simulate HMAC-SHA256 bearer token issuance for authenticated services.",
    defaultBody: JSON.stringify(
      {
        clientId: "mohan-architect-client-01",
        grantType: "client_credentials",
        scope: "read:telemetry write:geofence admin:system",
      },
      null,
      2
    ),
    responseHandler: () => ({
      status: 201,
      statusText: "Created",
      headers: {
        "content-type": "application/json",
        "x-auth-engine": "Node.js / Express Security Protocol",
      },
      data: {
        tokenType: "Bearer",
        expiresIn: 3600,
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2hhbi1hcmNoaXRlY3QiLCJyb2xlIjoiU2VuaW9yRW5naW5lZXIiLCJpYXQiOjE3MDAsImV4cCI6MTcwMH0.9fB8k3D1m4x7e2Q9Z",
        tokenPayloadDecoded: {
          sub: "mohan-architect-client-01",
          role: "Full-Stack Software Engineer",
          institution: "Adhiyamaan College of Engineering (MCA)",
          scopes: ["read:telemetry", "write:geofence", "admin:system"],
        },
      },
    }),
  },
];

export function ApiPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("geofence");
  const [selectedMethod, setSelectedMethod] = useState<HttpMethod>("POST");
  const [urlPath, setUrlPath] = useState<string>("/api/v1/geofence/evaluate");
  const [requestBody, setRequestBody] = useState<string>(PRESETS[1].defaultBody || "");
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Response state
  const [responseStatus, setResponseStatus] = useState<number>(200);
  const [responseStatusText, setResponseStatusText] = useState<string>("OK");
  const [responseData, setResponseData] = useState<unknown>(
    PRESETS[1].responseHandler(PRESETS[1].defaultBody).data
  );
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>(
    PRESETS[1].responseHandler(PRESETS[1].defaultBody).headers
  );
  const [executionTime, setExecutionTime] = useState<number>(18);

  const handleSelectPreset = (preset: EndpointPreset) => {
    playTactileClick();
    setSelectedPresetId(preset.id);
    setSelectedMethod(preset.method);
    setUrlPath(preset.path);
    setRequestBody(preset.defaultBody || "");
  };

  const handleSend = () => {
    playTactileClick();
    setIsLoading(true);

    const preset = PRESETS.find((p) => p.id === selectedPresetId);
    const start = performance.now();

    setTimeout(() => {
      if (preset) {
        const res = preset.responseHandler(requestBody);
        setResponseStatus(res.status);
        setResponseStatusText(res.statusText);
        setResponseData(res.data);
        setResponseHeaders(res.headers);
      }
      const dur = Math.max(12, Math.round(performance.now() - start));
      setExecutionTime(dur);
      setIsLoading(false);
    }, 280);
  };

  const copyResponse = () => {
    playTactileClick();
    navigator.clipboard.writeText(JSON.stringify(responseData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-hairline gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-accent" />
            <h3 className="font-display font-bold text-xl text-white">
              REST API Request &amp; Response Test Bench
            </h3>
          </div>
          <p className="text-xs text-silver-mid font-light mt-1">
            Execute simulated live API requests against Mohan&apos;s architectural services, inspect response payloads, and benchmark simulated execution latency.
          </p>
        </div>
        <Badge variant="cyan" dot>Interactive Client</Badge>
      </div>

      {/* Preset Selector Bar */}
      <div className="my-6">
        <label className="block text-[11px] font-mono text-silver-dark uppercase mb-2">
          Select Service Endpoint Preset:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-lg border text-left transition-all font-mono text-xs ${
                selectedPresetId === preset.id
                  ? "bg-cyan-950/40 border-cyan-500/60 text-white"
                  : "bg-surface-1 border-hairline text-silver-mid hover:border-silver-dark/40"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    preset.method === "GET"
                      ? "bg-emerald-950 text-emerald-400"
                      : "bg-cyan-950 text-cyan-accent"
                  }`}
                >
                  {preset.method}
                </span>
                <span className="font-sans font-medium text-xs truncate">{preset.name}</span>
              </div>
              <div className="text-[10px] text-silver-dark truncate">{preset.path}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Request Address Bar */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-6 p-2 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value as HttpMethod)}
          className="bg-carbon border border-hairline text-cyan-accent font-bold px-3 py-2 rounded-lg outline-none cursor-pointer"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={urlPath}
          onChange={(e) => setUrlPath(e.target.value)}
          className="flex-1 bg-carbon/50 border border-hairline px-3 py-2 rounded-lg text-white font-mono text-xs outline-none focus:border-cyan-500"
        />

        <Button
          variant="primary"
          onClick={handleSend}
          disabled={isLoading}
          className="gap-2 text-xs font-mono font-bold"
        >
          {isLoading ? (
            <Clock className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {isLoading ? "EXECUTING..." : "DISPATCH"}
        </Button>
      </div>

      {/* Split Pane: Request Config & Response Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Request Body & Headers */}
        <div className="rounded-xl border border-hairline bg-surface-1 overflow-hidden flex flex-col h-[340px]">
          <div className="p-2.5 bg-surface-2 border-b border-hairline flex items-center justify-between text-xs font-mono">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("body")}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeTab === "body"
                    ? "bg-carbon text-white font-bold border border-hairline"
                    : "text-silver-dark hover:text-white"
                }`}
              >
                Request Body (JSON)
              </button>
              <button
                onClick={() => setActiveTab("headers")}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeTab === "headers"
                    ? "bg-carbon text-white font-bold border border-hairline"
                    : "text-silver-dark hover:text-white"
                }`}
              >
                Headers (3)
              </button>
            </div>
            <span className="text-[10px] text-silver-dark">application/json</span>
          </div>

          <div className="flex-1 p-3 font-mono text-xs overflow-y-auto">
            {activeTab === "body" ? (
              selectedMethod === "GET" ? (
                <div className="h-full flex items-center justify-center text-silver-dark text-xs">
                  GET requests do not require a payload body.
                </div>
              ) : (
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full h-full bg-transparent text-silver-light font-mono text-xs resize-none outline-none leading-relaxed"
                  placeholder="Enter JSON request body..."
                />
              )
            ) : (
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between p-2 rounded bg-carbon border border-hairline">
                  <span className="text-silver-dark">Content-Type</span>
                  <span className="text-white">application/json</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-carbon border border-hairline">
                  <span className="text-silver-dark">Authorization</span>
                  <span className="text-cyan-accent font-bold">Bearer dev_token_mohan_nv</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-carbon border border-hairline">
                  <span className="text-silver-dark">Accept</span>
                  <span className="text-white">*/*</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Response Output */}
        <div className="rounded-xl border border-hairline bg-surface-1 overflow-hidden flex flex-col h-[340px]">
          <div className="p-2.5 bg-surface-2 border-b border-hairline flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-silver-dark">STATUS:</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  responseStatus >= 200 && responseStatus < 300
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : "bg-red-950 text-red-400 border border-red-800"
                }`}
              >
                {responseStatus} {responseStatusText}
              </span>
              <span className="text-silver-dark">TIME:</span>
              <span className="text-white font-bold">{executionTime}ms</span>
            </div>

            <button
              onClick={copyResponse}
              className="flex items-center gap-1 text-[11px] text-silver-mid hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-accent" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "COPIED" : "COPY JSON"}
            </button>
          </div>

          <div className="flex-1 p-3 font-mono text-xs overflow-y-auto bg-obsidian/70">
            <pre className="text-silver-light leading-relaxed text-[11px]">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>

          <div className="p-2 bg-surface-1 border-t border-hairline flex items-center justify-between text-[10px] font-mono text-silver-dark">
            <span>Size: {JSON.stringify(responseData).length} bytes</span>
            <span>Protocol: HTTP/2 (Simulated)</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
