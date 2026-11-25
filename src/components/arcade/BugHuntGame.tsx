"use client";

import React, { useState, useEffect, useCallback } from "react";
import { arcadeChallenges } from "@/content/data/arcade";
import { ArcadeChallenge, ArcadeLevel, ArcadeStats } from "@/types/arcade";
import { playTactileClick, playChimeSuccess } from "@/lib/sound";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  Trophy,
  RotateCcw,
  ArrowRight,
  Share2,
  Clock,
  Sparkles,
  ShieldAlert,
  Code2,
  Terminal,
} from "lucide-react";

export function BugHuntGame() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [copied, setCopied] = useState(false);

  // Persistent Stats
  const [stats, setStats] = useState<ArcadeStats>({
    score: 0,
    highScore: 0,
    streak: 0,
    highestStreak: 0,
    solvedCount: 0,
    totalAttempts: 0,
  });

  // Filter challenges by level
  const filteredChallenges = arcadeChallenges.filter(
    (c) => selectedLevel === 0 || c.level === selectedLevel
  );

  const currentChallenge: ArcadeChallenge | undefined =
    filteredChallenges[currentIndex] || filteredChallenges[0];

  // Load High Score from localStorage on mount
  useEffect(() => {
    try {
      const savedHighScore = localStorage.getItem("nv_arcade_highscore");
      if (savedHighScore) {
        setStats((prev) => ({
          ...prev,
          highScore: parseInt(savedHighScore, 10) || 0,
        }));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const handleTimeout = useCallback(() => {
    setIsAnswerSubmitted(true);
    setIsCorrect(false);
    setStats((prev) => ({
      ...prev,
      streak: 0,
      totalAttempts: prev.totalAttempts + 1,
    }));
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (!timerEnabled || isAnswerSubmitted) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerEnabled, timeLeft, isAnswerSubmitted, handleTimeout]);

  const handleSelectOption = (id: string) => {
    if (isAnswerSubmitted) return;
    playTactileClick();
    setSelectedOptionId(id);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted || !currentChallenge) return;
    playTactileClick();

    const chosen = currentChallenge.options.find((o) => o.id === selectedOptionId);
    const correct = Boolean(chosen?.isCorrect);

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    if (correct) {
      playChimeSuccess();
      const streakBonus = stats.streak * 25;
      const timeBonus = timerEnabled ? timeLeft * 2 : 0;
      const pointsEarned = 100 + streakBonus + timeBonus;

      setStats((prev) => {
        const newScore = prev.score + pointsEarned;
        const newStreak = prev.streak + 1;
        const newHighScore = Math.max(prev.highScore, newScore);
        const newHighestStreak = Math.max(prev.highestStreak, newStreak);

        try {
          localStorage.setItem("nv_arcade_highscore", newHighScore.toString());
        } catch {
          // ignore
        }

        return {
          ...prev,
          score: newScore,
          highScore: newHighScore,
          streak: newStreak,
          highestStreak: newHighestStreak,
          solvedCount: prev.solvedCount + 1,
          totalAttempts: prev.totalAttempts + 1,
        };
      });
    } else {
      setStats((prev) => ({
        ...prev,
        streak: 0,
        totalAttempts: prev.totalAttempts + 1,
      }));
    }
  };

  const handleNextChallenge = () => {
    playTactileClick();
    setSelectedOptionId(null);
    setShowHint(false);
    setIsAnswerSubmitted(false);
    setTimeLeft(45);

    if (currentIndex < filteredChallenges.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleResetGame = () => {
    playTactileClick();
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setShowHint(false);
    setIsAnswerSubmitted(false);
    setTimeLeft(45);
    setStats((prev) => ({
      ...prev,
      score: 0,
      streak: 0,
      solvedCount: 0,
      totalAttempts: 0,
    }));
  };

  const handleShareScore = async () => {
    playTactileClick();
    const shareText = `🕹️ Mohan N.V. Engineering Arcade — Bug Hunt\nScore: ${stats.score} pts | Streak: ${stats.highestStreak}x | Solved: ${stats.solvedCount} bugs\nCan you debug these production code challenges?`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mohan N.V. // Engineering Arcade",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut listener (1-4 keys to select options, Enter to submit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswerSubmitted) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNextChallenge();
        }
        return;
      }

      if (["1", "2", "3", "4"].includes(e.key) && currentChallenge) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentChallenge.options[idx]) {
          handleSelectOption(currentChallenge.options[idx].id);
        }
      } else if (e.key === "Enter" && selectedOptionId) {
        e.preventDefault();
        handleSubmitAnswer();
      } else if (e.key.toLowerCase() === "h") {
        setShowHint((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedOptionId, isAnswerSubmitted, currentChallenge, currentIndex]);

  if (!currentChallenge) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Top Arcade HUD & Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        {/* Score */}
        <div className="p-3.5 rounded-xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-muted-foreground block">Score</span>
            <span className="font-display font-bold text-lg text-primary">{stats.score} pts</span>
          </div>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>

        {/* High Score */}
        <div className="p-3.5 rounded-xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-muted-foreground block">High Score</span>
            <span className="font-display font-bold text-lg text-foreground">{stats.highScore} pts</span>
          </div>
          <Trophy className="w-4 h-4 text-amber-500" />
        </div>

        {/* Current Streak */}
        <div className="p-3.5 rounded-xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-muted-foreground block">Active Streak</span>
            <span className="font-display font-bold text-lg text-emerald-600 dark:text-emerald-400">
              {stats.streak}x 🔥
            </span>
          </div>
          <Flame className="w-4 h-4 text-amber-500" />
        </div>

        {/* Controls & Timer Mode */}
        <div className="p-3.5 rounded-xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-muted-foreground block">Timer Mode</span>
            <button
              onClick={() => {
                playTactileClick();
                setTimerEnabled(!timerEnabled);
              }}
              className={`text-xs font-bold underline cursor-pointer ${
                timerEnabled ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {timerEnabled ? `Active (${timeLeft}s)` : "Disabled (Practice)"}
            </button>
          </div>
          <Clock className={`w-4 h-4 ${timerEnabled ? "text-primary animate-spin-slow" : "text-muted-foreground"}`} />
        </div>
      </div>

      {/* Level Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs pb-2 border-b border-border">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-muted-foreground uppercase text-[10px] mr-1">Select Level:</span>
          {[
            { id: 1, label: "Lvl 1: JS Fundamentals" },
            { id: 2, label: "Lvl 2: React Components" },
            { id: 3, label: "Lvl 3: Node.js & APIs" },
            { id: 4, label: "Lvl 4: SQL & Databases" },
            { id: 5, label: "Lvl 5: Concurrency & Systems" },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => {
                playTactileClick();
                setSelectedLevel(lvl.id);
                setCurrentIndex(0);
                setSelectedOptionId(null);
                setIsAnswerSubmitted(false);
                setShowHint(false);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedLevel === lvl.id
                  ? "bg-primary text-primary-foreground font-bold shadow-xs"
                  : "bg-surface-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareScore}
            className="text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Score Copied!" : "Share Score"}</span>
          </button>
          <button
            onClick={handleResetGame}
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Main Challenge Board */}
      <Card hasDatumCorners className="p-6 sm:p-8 bg-card border-border shadow-card space-y-6">
        {/* Challenge Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="cyan" dot className="text-[10px] font-mono uppercase">
                {currentChallenge.category}
              </Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Challenge {currentIndex + 1} of {filteredChallenges.length}
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              {currentChallenge.title}
            </h3>
          </div>

          {timerEnabled && !isAnswerSubmitted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-secondary border border-border text-xs font-mono">
              <Clock className="w-4 h-4 text-primary" />
              <span className={`font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-foreground"}`}>
                {timeLeft}s remaining
              </span>
            </div>
          )}
        </div>

        {/* Engineering Scenario Description */}
        <p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed">
          {currentChallenge.scenario}
        </p>

        {/* Buggy Code Snippet */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-inner">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-300">buggy_snippet.{currentChallenge.language}</span>
            </div>
            <span className="uppercase text-[10px] text-red-400 font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Defect Present
            </span>
          </div>

          <div className="p-4 sm:p-5 overflow-x-auto text-slate-100 leading-relaxed font-mono whitespace-pre text-xs sm:text-[13px]">
            {currentChallenge.buggyCode}
          </div>
        </div>

        {/* Architectural Hint Accordion */}
        <div>
          <button
            onClick={() => {
              playTactileClick();
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-primary hover:underline cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? "Hide Architectural Hint [H]" : "Show Architectural Hint [H]"}</span>
          </button>
          {showHint && (
            <div className="mt-2.5 p-3.5 rounded-xl bg-surface-secondary border border-border text-xs font-mono text-muted-foreground animate-in fade-in duration-150">
              <strong className="text-foreground block mb-0.5">Hint:</strong>
              {currentChallenge.hint}
            </div>
          )}
        </div>

        {/* Multiple Choice Fix Options */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono uppercase text-muted-foreground block font-medium">
            Select the Correct Production Fix (Keys 1 — {currentChallenge.options.length}):
          </span>

          <div className="grid grid-cols-1 gap-2.5 font-mono text-xs">
            {currentChallenge.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;

              let optionStyle = "bg-card border-border hover:border-primary/40 hover:bg-surface-secondary/60";
              if (isSelected) {
                optionStyle = "bg-primary/10 border-primary ring-1 ring-primary/40";
              }

              if (isAnswerSubmitted) {
                if (option.isCorrect) {
                  optionStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200";
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200";
                }
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-surface border border-border flex items-center justify-center font-bold text-xs shrink-0 text-foreground">
                    {idx + 1}
                  </span>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs sm:text-sm font-sans font-normal leading-relaxed text-foreground">
                      {option.text}
                    </p>
                    {option.fixCode && (
                      <code className="block mt-1.5 p-2 rounded-lg bg-slate-950 text-sky-300 font-mono text-[11px] overflow-x-auto">
                        {option.fixCode}
                      </code>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit or Next Challenge Feedback Action */}
        {!isAnswerSubmitted ? (
          <div className="pt-4 flex items-center justify-between border-t border-border">
            <span className="text-[11px] font-mono text-muted-foreground">
              Press [Enter] to submit chosen fix
            </span>
            <Button
              variant="primary"
              size="lg"
              disabled={!selectedOptionId}
              onClick={handleSubmitAnswer}
              className="gap-2 font-mono text-xs"
            >
              <span>SUBMIT FIX &amp; RUN TESTS</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="pt-4 border-t border-border space-y-4 animate-in fade-in duration-200">
            {/* Feedback Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 font-mono text-xs ${
                isCorrect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  : "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200"
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm sm:text-base">
                  {isCorrect ? "Defect Resolved! Tests Passing." : "Defect Unresolved — Runtime Failure"}
                </h4>
                <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-foreground/90">
                  {currentChallenge.explanation}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-muted-foreground">
                Press [Space] or [Enter] for next challenge
              </span>
              <Button
                variant="primary"
                size="lg"
                onClick={handleNextChallenge}
                className="gap-2 font-mono text-xs"
              >
                <span>NEXT CHALLENGE</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
