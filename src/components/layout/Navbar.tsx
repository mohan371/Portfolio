"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/data/site-config";
import { AudioController } from "@/components/creative/AudioController";
import { ThemeSwitcher } from "@/components/creative/ThemeSwitcher";
import { MagneticButton } from "@/components/creative/MagneticButton";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";
import { playHoverBlip, playTactileClick } from "@/lib/sound";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { soundEnabled, isMobileMenuOpen, setIsMobileMenuOpen } = useAppStore();

  const handleNavClick = () => {
    if (soundEnabled) playTactileClick();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleHover = () => {
    if (soundEnabled) playHoverBlip();
  };

  // Primary desktop nav items for clean visual breathing room
  const primaryNavItems = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Lab", href: "/lab" },
    { label: "Studio", href: "/studio" },
    { label: "Skills", href: "/skills" },
    { label: "Journey", href: "/experience" },
    { label: "Journal", href: "/journal" },
  ];

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 py-2 sm:py-2.5 rounded-full border border-hairline bg-obsidian/85 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-hairline-hover">
          {/* Brand Identity / Monogram */}
          <Link
            href="/"
            onClick={handleNavClick}
            onMouseEnter={handleHover}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-9 h-9 rounded-full border border-hairline bg-carbon flex items-center justify-center font-display font-bold text-xs text-white group-hover:border-cyan-accent group-hover:text-cyan-accent transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0)] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]">
              NV
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-display font-bold tracking-tight text-white group-hover:text-silver-bright transition-colors">
                MOHAN<span className="text-cyan-accent">.</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-silver-dark uppercase tracking-wider">
                Full-Stack Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  onMouseEnter={handleHover}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-white/[0.08] border border-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                      : "text-silver-mid hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-accent shadow-[0_0_6px_#00f5ff]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Controls & CTA */}
          <div className="flex items-center gap-2">
            <AudioController />
            <ThemeSwitcher />

            <div className="hidden sm:block pl-1">
              <MagneticButton strength={0.25}>
                <Link href="/contact" onClick={handleNavClick}>
                  <Button variant="primary" size="sm" className="h-8 shadow-sm">
                    Let&apos;s Talk
                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-hairline bg-carbon text-silver-mid hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-cyan-accent" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 md:hidden animate-in fade-in duration-200">
          {/* Header row in mobile overlay */}
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-hairline bg-carbon flex items-center justify-center font-display font-bold text-xs text-white">
                NV
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-white">
                MOHAN<span className="text-cyan-accent">.</span>
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full border border-hairline text-silver-mid hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Nav links stack */}
          <div className="flex flex-col gap-2 py-6 overflow-y-auto">
            <span className="text-[10px] font-mono text-silver-dark uppercase tracking-widest mb-2">
              Navigation Directory // 10 Sections
            </span>
            {siteConfig.navigation.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-xl font-display font-semibold uppercase tracking-tight flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-cyan-accent bg-white/[0.05]"
                      : "text-silver-mid hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-silver-dark">0{idx + 1}</span>
                    <span>{item.label}</span>
                  </span>
                  {isActive && <Sparkles className="w-4 h-4 text-cyan-accent" />}
                </Link>
              );
            })}
          </div>

          {/* Footer CTAs in mobile overlay */}
          <div className="border-t border-hairline pt-4 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={handleNavClick}
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-center text-sm font-sans tracking-wide hover:bg-zinc-200 transition-colors"
            >
              Contact Me
            </Link>
            <div className="flex items-center justify-between text-[11px] font-mono text-silver-dark pt-1">
              <span>HOSUR / BANGALORE, IN</span>
              <span className="text-emerald-accent flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
                AVAILABLE FOR HIRE
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
