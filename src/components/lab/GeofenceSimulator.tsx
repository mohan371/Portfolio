"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import {
  MapPin,
  Play,
  Pause,
  RotateCcw,
  Radio,
  Zap,
  Activity,
  ShieldAlert,
  ArrowRight,
  Maximize2,
  Trash2,
} from "lucide-react";

import {
  Point,
  GEOFENCE_POLYGON,
  canvasToGps,
  checkPointInPolygonWithRay,
} from "@/lib/algorithms/geofence";

interface WsEvent {
  id: string;
  timestamp: string;
  type: "GEOFENCE_ENTER" | "GEOFENCE_EXIT" | "TELEMETRY_PING" | "SPEED_ALERT";
  vehicleId: string;
  coords: { x: number; y: number; lat: number; lng: number };
  inside: boolean;
  message: string;
  latencyMs: number;
}

// Predefined vehicle loop waypoints (weaving in and out of the polygon)
const WAYPOINTS: Point[] = [
  { x: 50, y: 140 }, // Outside
  { x: 120, y: 180 }, // Outside nearing
  { x: 200, y: 180 }, // INSIDE
  { x: 300, y: 160 }, // INSIDE
  { x: 400, y: 220 }, // INSIDE
  { x: 470, y: 280 }, // Inside near edge
  { x: 560, y: 340 }, // OUTSIDE
  { x: 580, y: 200 }, // OUTSIDE
  { x: 460, y: 110 }, // OUTSIDE
  { x: 320, y: 100 }, // INSIDE
  { x: 180, y: 110 }, // INSIDE
  { x: 70, y: 90 }, // OUTSIDE
];

export function GeofenceSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [vehiclePos, setVehiclePos] = useState<Point>({ x: 50, y: 140 });
  const [vehicleHeading, setVehicleHeading] = useState<number>(0);
  const [isInside, setIsInside] = useState<boolean>(false);
  const [rayIntersections, setRayIntersections] = useState<Point[]>([]);
  const [crossingsCount, setCrossingsCount] = useState<number>(0);
  const [events, setEvents] = useState<WsEvent[]>([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [tParam, setTParam] = useState(0); // Progress between current and next waypoint

  const lastInsideRef = useRef<boolean>(false);
  const eventsEndRef = useRef<HTMLDivElement | null>(null);

  // Emit WebSocket event
  const emitEvent = useCallback(
    (
      type: WsEvent["type"],
      inside: boolean,
      pos: Point,
      customMsg?: string
    ) => {
      const gps = canvasToGps(pos.x, pos.y);
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");

      let message = customMsg;
      if (!message) {
        if (type === "GEOFENCE_ENTER") {
          message = `Vehicle entered perimeter 'Hosur Logistics Sector-A' [Lat: ${gps.lat}, Lng: ${gps.lng}]`;
        } else if (type === "GEOFENCE_EXIT") {
          message = `Vehicle breached boundary and exited perimeter [Lat: ${gps.lat}, Lng: ${gps.lng}]`;
        } else {
          message = `Telemetry frame ack [Speed: ${(38 * speedMultiplier).toFixed(0)} km/h, Satellites: 9]`;
        }
      }

      const newEvt: WsEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: timeStr,
        type,
        vehicleId: "VH-104 (Heavy Hauler)",
        coords: { x: Math.round(pos.x), y: Math.round(pos.y), ...gps },
        inside,
        message,
        latencyMs: Math.floor(12 + Math.random() * 14),
      };

      setEvents((prev) => [newEvt, ...prev].slice(0, 30));
    },
    [speedMultiplier]
  );

  // Update vehicle position along waypoint path
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTParam((prevT) => {
        const step = 0.015 * speedMultiplier;
        const nextT = prevT + step;

        if (nextT >= 1) {
          setCurrentWaypointIndex((prevIndex) => (prevIndex + 1) % WAYPOINTS.length);
          return 0;
        }

        const p1 = WAYPOINTS[currentWaypointIndex];
        const nextIdx = (currentWaypointIndex + 1) % WAYPOINTS.length;
        const p2 = WAYPOINTS[nextIdx];

        // Linear interpolation with smooth angle calculation
        const newX = p1.x + (p2.x - p1.x) * nextT;
        const newY = p1.y + (p2.y - p1.y) * nextT;
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        setVehicleHeading(angle);
        setVehiclePos({ x: newX, y: newY });

        // Point-in-polygon computation
        const result = checkPointInPolygonWithRay({ x: newX, y: newY }, GEOFENCE_POLYGON);
        setIsInside(result.inside);
        setRayIntersections(result.intersections);
        setCrossingsCount(result.rayCrossings);

        // State change detection (Entering or Exiting Geofence)
        if (result.inside !== lastInsideRef.current) {
          if (result.inside) {
            emitEvent("GEOFENCE_ENTER", true, { x: newX, y: newY });
          } else {
            emitEvent("GEOFENCE_EXIT", false, { x: newX, y: newY });
          }
          lastInsideRef.current = result.inside;
        }

        return nextT;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier, currentWaypointIndex, emitEvent]);

  // Handle canvas click to manually position vehicle
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    playTactileClick();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickedX = (e.clientX - rect.left) * scaleX;
    const clickedY = (e.clientY - rect.top) * scaleY;

    setVehiclePos({ x: clickedX, y: clickedY });

    const result = checkPointInPolygonWithRay({ x: clickedX, y: clickedY }, GEOFENCE_POLYGON);
    setIsInside(result.inside);
    setRayIntersections(result.intersections);
    setCrossingsCount(result.rayCrossings);

    if (result.inside !== lastInsideRef.current) {
      if (result.inside) {
        emitEvent("GEOFENCE_ENTER", true, { x: clickedX, y: clickedY });
      } else {
        emitEvent("GEOFENCE_EXIT", false, { x: clickedX, y: clickedY });
      }
      lastInsideRef.current = result.inside;
    } else {
      emitEvent("TELEMETRY_PING", result.inside, { x: clickedX, y: clickedY }, "Manual vehicle reposition pin");
    }
  };

  // Canvas render loop for high-fidelity technical visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = "#070707";
    ctx.fillRect(0, 0, width, height);

    // Subtle technical grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    const gridSize = 30;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw waypoints route
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.setLineDash([4, 6]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    WAYPOINTS.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Geofence Polygon fill & border
    ctx.beginPath();
    GEOFENCE_POLYGON.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();

    // Inside highlight glow
    if (isInside) {
      ctx.fillStyle = "rgba(0, 245, 255, 0.08)";
      ctx.strokeStyle = "rgba(0, 245, 255, 0.85)";
      ctx.shadowColor = "#00F5FF";
      ctx.shadowBlur = 10;
    } else {
      ctx.fillStyle = "rgba(139, 92, 246, 0.05)";
      ctx.strokeStyle = "rgba(139, 92, 246, 0.6)";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    }
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Polygon Vertices
    GEOFENCE_POLYGON.forEach((pt, idx) => {
      ctx.fillStyle = isInside ? "#00F5FF" : "#8B5CF6";
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Vertex label
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "9px JetBrains Mono, monospace";
      ctx.fillText(`V${idx + 1}`, pt.x + 6, pt.y - 4);
    });

    // Draw Ray-Casting horizontal ray from vehicle to +X (Infinity)
    ctx.strokeStyle = "rgba(255, 215, 0, 0.4)";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vehiclePos.x, vehiclePos.y);
    ctx.lineTo(width, vehiclePos.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ray intersection points with polygon edges
    rayIntersections.forEach((ipt) => {
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(ipt.x, ipt.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draw crosshair on intersection
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ipt.x - 8, ipt.y);
      ctx.lineTo(ipt.x + 8, ipt.y);
      ctx.moveTo(ipt.x, ipt.y - 8);
      ctx.lineTo(ipt.x, ipt.y + 8);
      ctx.stroke();
    });

    // Draw Vehicle Marker with heading indicator
    ctx.save();
    ctx.translate(vehiclePos.x, vehiclePos.y);
    ctx.rotate((vehicleHeading * Math.PI) / 180);

    // Vehicle radar pulse
    ctx.beginPath();
    ctx.arc(0, 0, isInside ? 14 : 10, 0, Math.PI * 2);
    ctx.strokeStyle = isInside ? "rgba(0, 245, 255, 0.4)" : "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Vehicle body
    ctx.fillStyle = isInside ? "#00F5FF" : "#FFFFFF";
    ctx.shadowColor = isInside ? "#00F5FF" : "#FFFFFF";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(12, 0); // Nose
    ctx.lineTo(-7, -7);
    ctx.lineTo(-4, 0);
    ctx.lineTo(-7, 7);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Vehicle ID callout tag
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "10px JetBrains Mono, monospace";
    ctx.fillText("VH-104", vehiclePos.x + 12, vehiclePos.y - 12);
  }, [vehiclePos, vehicleHeading, isInside, rayIntersections]);

  const gpsPos = canvasToGps(vehiclePos.x, vehiclePos.y);

  return (
    <Card hasDatumCorners className="p-6 bg-card border-border shadow-card">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-border gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <h3 className="font-display font-bold text-xl text-foreground">
              MapUp Fleet Geofencing &amp; WebSocket Engine
            </h3>
          </div>
          <p className="text-xs text-muted-foreground font-light mt-1">
            Real-time simulation of Jordan Curve Theorem Point-in-Polygon (PIP) ray casting, boundary ingress/egress
            detection, and live telemetry broadcast.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={isInside ? "cyan" : "default"} dot>
            {isInside ? "STATUS: INSIDE GEOFENCE" : "STATUS: EXTERNAL AIRSPACE"}
          </Badge>
          <Badge variant="violet">ws://telemetry.mapup.internal:8080</Badge>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left / Top: Interactive Canvas Map */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-border bg-slate-950 shadow-md">
            <canvas
              ref={canvasRef}
              width={640}
              height={380}
              onClick={handleCanvasClick}
              className="w-full h-auto cursor-crosshair block"
              title="Click anywhere to manually teleport vehicle marker"
            />

            {/* Canvas HUD Overlay */}
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-mono text-slate-200 space-y-0.5 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">TARGET:</span>
                <span className="text-white font-bold">VH-104 [HEAVY HAULER]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">GPS FIX:</span>
                <span className="text-sky-400">{gpsPos.lat}° N, {gpsPos.lng}° E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">RAY PARITY:</span>
                <span className={isInside ? "text-cyan-400 font-bold" : "text-amber-400 font-bold"}>
                  {crossingsCount} Crossings ({isInside ? "ODD -> INSIDE" : "EVEN -> OUTSIDE"})
                </span>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              Click anywhere on map to test ray casting
            </div>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-2">
              <Button
                variant={isPlaying ? "outline" : "primary"}
                size="sm"
                onClick={() => {
                  playTactileClick();
                  setIsPlaying(!isPlaying);
                }}
                className="gap-2 text-xs font-mono"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? "PAUSE SIMULATION" : "RESUME ENGINE"}
              </Button>

              <div className="flex items-center gap-1 bg-surface-secondary px-2 py-1 rounded-lg border border-border text-xs font-mono">
                <span className="text-muted-foreground mr-1">SPEED:</span>
                {[1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      playTactileClick();
                      setSpeedMultiplier(spd);
                    }}
                    className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                      speedMultiplier === spd
                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Algorithm Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Ray Intersects: <strong className="text-foreground">{crossingsCount}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span>Engine Latency: <strong className="text-emerald-600 dark:text-emerald-400">14ms</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Live WebSocket Event Stream */}
        <div className="lg:col-span-4 flex flex-col h-[440px] rounded-xl bg-surface border border-border overflow-hidden shadow-xs">
          {/* Stream Header */}
          <div className="p-3 bg-surface-secondary border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                WS EVENT EMITTER
              </span>
            </div>
            <button
              onClick={() => {
                playTactileClick();
                setEvents([]);
              }}
              title="Clear Event Log"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Event Stream List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 font-mono text-[11px]">
            {events.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-xs text-center p-4">
                <Radio className="w-6 h-6 mb-2 opacity-40 animate-pulse" />
                Listening to telemetry pipeline...
              </div>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  className={`p-2.5 rounded-lg border transition-all ${
                    evt.type === "GEOFENCE_ENTER"
                      ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700/50 text-blue-800 dark:text-blue-300"
                      : evt.type === "GEOFENCE_EXIT"
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/50 text-amber-800 dark:text-amber-300"
                      : "bg-card border-border text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px]">
                    <span className="font-bold flex items-center gap-1.5">
                      {evt.type === "GEOFENCE_ENTER" && <ShieldAlert className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                      {evt.type === "GEOFENCE_EXIT" && <ShieldAlert className="w-3 h-3 text-amber-600 dark:text-amber-400" />}
                      {evt.type}
                    </span>
                    <span className="text-muted-foreground">{evt.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-tight font-medium mb-1">{evt.message}</p>
                  <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-1 border-t border-border/60">
                    <span>ACK: {evt.latencyMs}ms</span>
                    <span>Zone: Sector-A</span>
                  </div>
                </div>
              ))
            )}
            <div ref={eventsEndRef} />
          </div>

          {/* WebSocket Footer */}
          <div className="p-2.5 bg-surface-secondary border-t border-border text-[10px] font-mono text-muted-foreground flex justify-between">
            <span>SOCKET: OPEN</span>
            <span>FRAME PACKETS: {events.length}</span>
          </div>
        </div>
      </div>

      {/* Algorithmic Explanation Accordion */}
      <div className="p-4 rounded-xl bg-surface border border-border grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div>
          <span className="text-primary font-bold block mb-1">01 // JORDAN CURVE THEOREM</span>
          <p className="text-muted-foreground text-[11px] font-light leading-relaxed">
            A test point P is inside a non-self-intersecting polygon if and only if any ray drawn from P to infinity crosses polygon boundary edges an odd number of times.
          </p>
        </div>
        <div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1">02 // COMPUTATIONAL COMPLEXITY</span>
          <p className="text-muted-foreground text-[11px] font-light leading-relaxed">
            The algorithm operates at O(n) where n is the number of vertices. For n=6, evaluation completes in under 0.02ms in Go or JavaScript, enabling high-frequency vehicle GPS ingestion.
          </p>
        </div>
        <div>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">03 // EDGE CASES HANDLED</span>
          <p className="text-muted-foreground text-[11px] font-light leading-relaxed">
            Points co-linear with horizontal edges or vertex intersections are correctly evaluated by using half-open intervals on vertical coordinates: yi &le; y &lt; yj.
          </p>
        </div>
      </div>
    </Card>
  );
}
