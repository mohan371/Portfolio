"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/content/data/site-config";
import { projectsData } from "@/content/data/projects";
import { skillsData } from "@/content/data/skills";
import { experienceData } from "@/content/data/experience";
import { playTactileClick } from "@/lib/sound";
import { Terminal, CornerDownLeft, Trash2, HelpCircle } from "lucide-react";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export function CodingTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-silver-mid font-mono text-xs">
          <p className="text-cyan-accent font-bold">
            MOHAN_N.V. // ARCHITECT_KERNEL v16.4.6 [ONLINE]
          </p>
          <p>Type <span className="text-white font-bold">&apos;help&apos;</span> to inspect available terminal commands.</p>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playTactileClick();
    setPastCommands((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs font-mono text-silver-light">
            <p className="text-cyan-accent font-bold mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
              <div><span className="text-white font-bold">about</span> - Display biography and credentials</div>
              <div><span className="text-white font-bold">projects</span> - List verified software projects</div>
              <div><span className="text-white font-bold">skills</span> - Inspect verified technology stack</div>
              <div><span className="text-white font-bold">experience</span> - Show career and education chronology</div>
              <div><span className="text-white font-bold">contact</span> - Show direct communication channels</div>
              <div><span className="text-white font-bold">clear</span> - Clear terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs font-mono text-silver-light">
            <p className="text-white font-bold text-sm">{siteConfig.name} — {siteConfig.role}</p>
            <p className="text-silver-mid leading-relaxed">{siteConfig.bio}</p>
            <div className="pt-1 text-[11px] text-silver-dark space-y-1">
              <div><strong className="text-white">Education:</strong> MCA (2024–2026), BCA (2019–2022)</div>
              <div><strong className="text-white">Corporate:</strong> Gabriel India Ltd (Bill Booking Accountant, 2022–2024)</div>
              <div><strong className="text-white">Location:</strong> {siteConfig.location.city}, {siteConfig.location.country}</div>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs font-mono text-silver-light">
            <p className="text-cyan-accent font-bold">FEATURED PROJECTS ({projectsData.length}):</p>
            <div className="space-y-2 pl-2">
              {projectsData.map((p) => (
                <div key={p.id} className="border-l-2 border-hairline pl-2.5">
                  <div className="text-white font-bold">{p.title}</div>
                  <div className="text-[11px] text-silver-dark">{p.shortDescription}</div>
                  <div className="text-[10px] text-cyan-accent mt-0.5">
                    Stack: {p.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono text-silver-light">
            <p className="text-cyan-accent font-bold">CORE TECHNOLOGY ECOSYSTEM:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
              {skillsData.map((cat, i) => (
                <div key={i} className="p-2 rounded bg-carbon border border-hairline">
                  <div className="text-white font-bold mb-1">{cat.title}:</div>
                  <div className="text-[11px] text-silver-mid">
                    {cat.skills.map((s) => s.name).join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-xs font-mono text-silver-light">
            <p className="text-cyan-accent font-bold">PROFESSIONAL TIMELINE:</p>
            <div className="space-y-2 pl-2">
              {experienceData.map((exp) => (
                <div key={exp.id} className="border-l-2 border-hairline pl-2">
                  <div className="text-white font-bold">{exp.role} @ {exp.company}</div>
                  <div className="text-[10px] text-silver-dark">{exp.period} • {exp.location}</div>
                  <div className="text-[11px] text-silver-mid mt-0.5">{exp.description}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1.5 text-xs font-mono text-silver-light">
            <p className="text-cyan-accent font-bold">COMMUNICATION COORDINATES:</p>
            <div className="pl-2 space-y-1">
              <div><strong className="text-white">Email:</strong> {siteConfig.socials.email}</div>
              <div><strong className="text-white">GitHub:</strong> {siteConfig.socials.github}</div>
              <div><strong className="text-white">LinkedIn:</strong> {siteConfig.socials.linkedin}</div>
              <div><strong className="text-white">Availability:</strong> {siteConfig.availability.status}</div>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <div className="text-xs font-mono text-red-400 space-y-1">
            <p>Command not recognized: <span className="text-white font-bold">&apos;{rawCmd}&apos;</span></p>
            <p className="text-silver-dark">Type <span className="text-cyan-accent">&apos;help&apos;</span> to inspect the list of available commands.</p>
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIdx = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= pastCommands.length) {
          setCmdIndex(-1);
          setInput("");
        } else {
          setCmdIndex(nextIdx);
          setInput(pastCommands[nextIdx]);
        }
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full rounded-2xl bg-obsidian border border-hairline overflow-hidden corner-datum cursor-text shadow-2xl"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-carbon/80 border-b border-hairline font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-silver-dark ml-2 text-[11px]">
            mohan@terminal: ~ (bash / zsh)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
            }}
            className="p-1 rounded text-silver-dark hover:text-white transition-colors"
            title="Clear buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div className="p-4 sm:p-6 max-h-[380px] overflow-y-auto space-y-4 font-mono text-xs">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-silver-dark">
              <span className="text-cyan-accent">mohan@kernel:~$</span>
              <span className="text-white font-bold">{entry.command}</span>
            </div>
            <div className="pl-4">{entry.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Active Command Input Line */}
      <div className="px-4 sm:px-6 py-3 bg-carbon/40 border-t border-hairline flex items-center gap-2 font-mono text-xs">
        <span className="text-cyan-accent shrink-0">mohan@kernel:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-zinc-600"
          placeholder="type 'help', 'projects', 'skills'..."
        />
        <CornerDownLeft className="w-3.5 h-3.5 text-silver-dark shrink-0" />
      </div>

      {/* Quick Command Suggestion Pills */}
      <div className="px-4 sm:px-6 py-2 border-t border-hairline bg-obsidian flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-silver-dark">
        <span>Suggested:</span>
        {["help", "about", "projects", "skills", "experience", "contact", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(cmd);
            }}
            className="px-2 py-0.5 rounded bg-surface-1 border border-hairline text-silver-mid hover:text-cyan-accent hover:border-cyan-500/40 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
