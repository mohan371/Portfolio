"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { playTactileClick } from "@/lib/sound";
import { Zap, Play, RotateCcw, Clock, Layers, ArrowRight, Activity } from "lucide-react";

export function JsMiniExperiments() {
  // Experiment 1: Debounce vs Throttle
  const [rawClicks, setRawClicks] = useState<number>(0);
  const [debouncedCount, setDebouncedCount] = useState<number>(0);
  const [throttledCount, setThrottledCount] = useState<number>(0);

  const [rawPulses, setRawPulses] = useState<number[]>([]);
  const [debouncedPulses, setDebouncedPulses] = useState<number[]>([]);
  const [throttledPulses, setThrottledPulses] = useState<number[]>([]);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const throttleLastRef = useRef<number>(0);

  const handleEmitEvent = () => {
    playTactileClick();
    const now = Date.now();
    setRawClicks((c) => c + 1);
    setRawPulses((prev) => [...prev.slice(-15), now]);

    // Debounce implementation (500ms trailing)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedCount((c) => c + 1);
      setDebouncedPulses((prev) => [...prev.slice(-15), Date.now()]);
    }, 500);

    // Throttle implementation (500ms limit)
    if (now - throttleLastRef.current >= 500) {
      throttleLastRef.current = now;
      setThrottledCount((c) => c + 1);
      setThrottledPulses((prev) => [...prev.slice(-15), now]);
    }
  };

  const handleResetDebounce = () => {
    playTactileClick();
    setRawClicks(0);
    setDebouncedCount(0);
    setThrottledCount(0);
    setRawPulses([]);
    setDebouncedPulses([]);
    setThrottledPulses([]);
  };

  // Experiment 2: JavaScript Event Loop Simulator
  const [eventLoopLogs, setEventLoopLogs] = useState<string[]>([]);
  const [isLoopRunning, setIsLoopRunning] = useState<boolean>(false);
  const [activeStage, setActiveStage] = useState<string>("");

  const runEventLoopDemo = () => {
    playTactileClick();
    setIsLoopRunning(true);
    setEventLoopLogs([]);

    const logs: string[] = [];

    // Step 1: Call Stack synchronous execution
    logs.push("01 [CALL STACK] console.log('1: Synchronous Begin')");
    setEventLoopLogs([...logs]);
    setActiveStage("Call Stack: Synchronous Frame");

    setTimeout(() => {
      // Step 2: Queue Macrotask (setTimeout)
      logs.push("02 [WEB API] setTimeout(..., 0) registered -> delegated to Macrotask Queue");
      setEventLoopLogs([...logs]);
      setActiveStage("Web APIs: Queueing Timer");

      setTimeout(() => {
        // Step 3: Queue Microtask (Promise)
        logs.push("03 [MICROTASK QUEUE] Promise.resolve().then(...) scheduled in Microtask Queue");
        setEventLoopLogs([...logs]);
        setActiveStage("Microtask Queue: Scheduled");

        setTimeout(() => {
          // Step 4: Synchronous End
          logs.push("04 [CALL STACK] console.log('2: Synchronous End') -> Stack Drained");
          setEventLoopLogs([...logs]);
          setActiveStage("Call Stack: Drained to empty");

          setTimeout(() => {
            // Step 5: Microtask Execution (Drain before Macrotask!)
            logs.push("05 [EVENT LOOP] Draining Microtasks first: '3: Microtask Resolved'");
            setEventLoopLogs([...logs]);
            setActiveStage("Event Loop: Microtasks Drain");

            setTimeout(() => {
              // Step 6: Macrotask Execution
              logs.push("06 [EVENT LOOP] Macrotask Dequeued & Executed: '4: Macrotask Timeout'");
              logs.push("== DEMONSTRATION COMPLETE: Microtasks always preempt Macrotasks ==");
              setEventLoopLogs([...logs]);
              setActiveStage("Completed: All queues processed");
              setIsLoopRunning(false);
            }, 600);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Experiment 1: Debounce vs Throttle */}
      <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-hairline gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-accent" />
              <h3 className="font-display font-bold text-xl text-white">
                JavaScript Concurrency: Debounce vs. Throttle
              </h3>
            </div>
            <p className="text-xs text-silver-mid font-light mt-1">
              Visual benchmark comparing unthrottled event spamming against rate-limited and silence-delayed event execution.
            </p>
          </div>
          <Badge variant="cyan" dot>Interactive Benchmark</Badge>
        </div>

        {/* Emitter Controls */}
        <div className="my-6 flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            onClick={handleEmitEvent}
            className="gap-2 font-mono text-xs font-bold px-6 py-2.5 bg-cyan-400 text-obsidian hover:bg-cyan-300"
          >
            <Zap className="w-4 h-4" />
            TRIGGER EVENT CLICK ({rawClicks})
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDebounce}
            className="text-xs font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            RESET COUNTERS
          </Button>

          <span className="text-xs font-mono text-silver-dark">
            Click repeatedly to simulate high-frequency user typing or scroll events.
          </span>
        </div>

        {/* Three Parallel Timelines */}
        <div className="space-y-4">
          {/* Raw Events */}
          <div className="p-4 rounded-xl bg-surface-1 border border-hairline">
            <div className="flex justify-between items-center mb-2 font-mono text-xs">
              <span className="text-white font-bold">1. RAW UNFILTERED EVENTS</span>
              <span className="text-red-400 font-bold">{rawClicks} Invocations</span>
            </div>
            <div className="h-8 bg-carbon rounded-lg flex items-center px-3 gap-1.5 overflow-hidden">
              {rawPulses.map((ts, idx) => (
                <span
                  key={idx}
                  className="w-2 h-5 rounded-sm bg-red-400 animate-pulse inline-block"
                  title={`Triggered at ${ts}`}
                />
              ))}
              {rawPulses.length === 0 && (
                <span className="text-[11px] font-mono text-silver-dark">Awaiting clicks...</span>
              )}
            </div>
          </div>

          {/* Throttled Events */}
          <div className="p-4 rounded-xl bg-surface-1 border border-hairline">
            <div className="flex justify-between items-center mb-2 font-mono text-xs">
              <span className="text-cyan-accent font-bold">2. THROTTLED (MAX 1 EXEC PER 500MS)</span>
              <span className="text-cyan-accent font-bold">
                {throttledCount} Executions ({rawClicks > 0 ? Math.round((1 - throttledCount / rawClicks) * 100) : 0}% Throttled)
              </span>
            </div>
            <div className="h-8 bg-carbon rounded-lg flex items-center px-3 gap-1.5 overflow-hidden">
              {throttledPulses.map((ts, idx) => (
                <span
                  key={idx}
                  className="w-2 h-5 rounded-sm bg-cyan-accent inline-block"
                  title={`Throttled execution at ${ts}`}
                />
              ))}
              {throttledPulses.length === 0 && (
                <span className="text-[11px] font-mono text-silver-dark">Rate limited output...</span>
              )}
            </div>
          </div>

          {/* Debounced Events */}
          <div className="p-4 rounded-xl bg-surface-1 border border-hairline">
            <div className="flex justify-between items-center mb-2 font-mono text-xs">
              <span className="text-emerald-accent font-bold">3. DEBOUNCED (FIRES AFTER 500MS PAUSE)</span>
              <span className="text-emerald-accent font-bold">{debouncedCount} Executions</span>
            </div>
            <div className="h-8 bg-carbon rounded-lg flex items-center px-3 gap-1.5 overflow-hidden">
              {debouncedPulses.map((ts, idx) => (
                <span
                  key={idx}
                  className="w-2 h-5 rounded-sm bg-emerald-accent inline-block"
                  title={`Debounced execution at ${ts}`}
                />
              ))}
              {debouncedPulses.length === 0 && (
                <span className="text-[11px] font-mono text-silver-dark">Awaiting 500ms of inactivity...</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Experiment 2: JavaScript Event Loop Simulator */}
      <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-hairline gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-accent" />
              <h3 className="font-display font-bold text-xl text-white">
                V8 Event Loop &amp; Microtask Priority Engine
              </h3>
            </div>
            <p className="text-xs text-silver-mid font-light mt-1">
              Step through how Call Stack frames, Promise microtasks, and setTimeout macrotasks drain across tick cycles.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={runEventLoopDemo}
            disabled={isLoopRunning}
            className="gap-2 text-xs font-mono font-bold"
          >
            {isLoopRunning ? <Clock className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            {isLoopRunning ? "RUNNING EVENT LOOP..." : "EXECUTE EVENT LOOP DEMO"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
          {/* Code Sample */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
            <span className="text-[10px] text-silver-dark uppercase block mb-2">
              EXECUTING JAVASCRIPT SNIPPET:
            </span>
            <pre className="text-silver-light text-[11px] leading-relaxed">
{`console.log('1: Synchronous Begin');

setTimeout(() => {
  console.log('4: Macrotask Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Microtask Resolved');
});

console.log('2: Synchronous End');`}
            </pre>
          </div>

          {/* Live Execution Trace */}
          <div className="lg:col-span-7 flex flex-col justify-between p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-hairline mb-3">
                <span className="text-[10px] text-silver-dark uppercase">RUNTIME QUEUE TRACE</span>
                <span className="text-cyan-accent font-bold text-[10px]">{activeStage || "IDLE"}</span>
              </div>

              <div className="space-y-1.5 min-h-[140px]">
                {eventLoopLogs.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-silver-dark text-xs py-10">
                    Click &apos;Execute Event Loop Demo&apos; to observe queue drain order.
                  </div>
                ) : (
                  eventLoopLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`text-[11px] leading-snug p-1.5 rounded ${
                        log.startsWith("==")
                          ? "bg-emerald-950/60 text-emerald-400 font-bold"
                          : log.includes("MICROTASK")
                          ? "text-cyan-accent"
                          : log.includes("WEB API")
                          ? "text-amber-300"
                          : "text-white"
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-hairline text-[10px] text-silver-dark">
              Rule: Microtask queue is completely emptied before the Event Loop yields to the next Macrotask.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
