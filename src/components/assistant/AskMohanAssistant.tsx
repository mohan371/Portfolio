"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { playTactileClick } from "@/lib/sound";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  ShieldCheck,
  RotateCcw,
  CornerDownLeft,
  ChevronDown,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "gemini" | "deterministic";
  timestamp: string;
}

const DEFAULT_QUESTIONS = [
  "What is Mohan's current role at Veda Scholars?",
  "Tell me about his verified projects",
  "What are his core technical skills?",
  "What is his educational background?",
  "How do I contact Mohan?",
];

export function AskMohanAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(DEFAULT_QUESTIONS);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-01",
      role: "assistant",
      content:
        "Hello! I am **ASK MOHAN**, an official AI Portfolio Assistant for Mohan N.V.\n\n" +
        "I can answer questions regarding his current role as a Software Engineer at Veda Scholars, his First-Class MCA (9.2 CGPA), " +
        "verified projects (Veda Scholars SaaS, MapUp Geofencing, AutoERP), technical skills, and software studio services.\n\n" +
        "All answers are derived strictly from verified portfolio records.",
      source: "deterministic",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    playTactileClick();
    setInput("");

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: newHistory.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: "assistant",
            content: data.answer,
            source: data.source,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);

        if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
          setSuggestedQuestions(data.suggestedQuestions);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content:
              data.error ||
              "I encountered a temporary connection issue. You can contact Mohan directly at mohan.mca2024@adhiyamaan.in or visit /contact.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "A network interruption occurred. Please verify your connection or reach Mohan directly at mohan.mca2024@adhiyamaan.in.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Assistant Trigger Button (Bottom-Right, fixed) */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => {
              playTactileClick();
              setIsOpen(true);
            }}
            aria-label="Open Ask Mohan AI Assistant"
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary-hover transition-all duration-300 font-mono text-xs cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[11px] tracking-wider">ASK MOHAN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[9px] text-white/80 font-sans font-normal">
                AI Engineering Assistant
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-4 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[420px] animate-in slide-in-from-bottom-5 duration-200">
          <Card
            hasDatumCorners
            className="h-[560px] max-h-[85vh] bg-surface dark:bg-surface-1 border-border dark:border-hairline shadow-2xl flex flex-col overflow-hidden rounded-2xl"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 border-b border-border dark:border-hairline flex items-center justify-between bg-surface-secondary/40 dark:bg-carbon/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-xs sm:text-sm text-foreground">
                      ASK MOHAN
                    </h3>
                    <Badge variant="cyan" dot className="text-[9px] py-0 px-1.5">
                      AI AGENT
                    </Badge>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground block">
                    Verified Engineering Knowledge • Zero Fabrication
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    playTactileClick();
                    setIsOpen(false);
                  }}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-secondary transition-colors"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 font-mono text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-muted-foreground">
                    {msg.role === "assistant" ? (
                      <>
                        <ShieldCheck className="w-3 h-3 text-primary" />
                        <span>ASK MOHAN (AI)</span>
                      </>
                    ) : (
                      <>
                        <span>Visitor</span>
                        <User className="w-3 h-3 text-muted-foreground" />
                      </>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-xs"
                        : "bg-surface-secondary/80 dark:bg-carbon border border-border dark:border-hairline text-foreground rounded-tl-xs"
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans text-xs sm:text-[13px] leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex flex-col items-start space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <ShieldCheck className="w-3 h-3 text-primary" />
                    <span>Processing verified records...</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-secondary/80 dark:bg-carbon border border-border dark:border-hairline text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 border-t border-border dark:border-hairline bg-surface-secondary/30 dark:bg-carbon/30 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
              <span className="text-[10px] font-mono text-muted-foreground shrink-0 uppercase">
                Suggested:
              </span>
              {suggestedQuestions.slice(0, 3).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-lg bg-surface border border-border dark:border-hairline text-[11px] font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-border dark:border-hairline bg-surface dark:bg-surface-1 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Ask about Mohan's role, projects, skills..."
                className="flex-1 bg-surface-secondary/80 dark:bg-carbon border border-border dark:border-hairline rounded-xl px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
              />
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="h-9 px-3 rounded-xl shrink-0"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Contact Discovery Footer */}
            <div className="px-3 py-1.5 bg-surface-secondary/50 dark:bg-black border-t border-border dark:border-hairline flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Want to talk directly with Mohan?</span>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:underline flex items-center gap-0.5 font-semibold"
              >
                <span>Direct Contact</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
