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
import { Menu, X, ArrowUpRight } from "lucide-react";

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

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-40 flex justify-center px-4">
        <nav className="flex items-center justify-between w-full max-w-6xl px-4 py-2 rounded-full border border-hairline bg-obsidian/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          {/* Logo / Monogram */}
          <Link
            href="/"
            onClick={handleNavClick}
            onMouseEnter={handleHover}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full border border-hairline bg-carbon flex items-center justify-center font-display font-bold text-xs text-white group-hover:border-cyan-accent group-hover:text-cyan-accent transition-colors">
              NV
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-white">
                MOHAN N.V.
              </span>
              <span className="text-[9px] font-mono text-silver-dark uppercase tracking-wider">
                Systems Architect
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  onMouseEnter={handleHover}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 relative ${
                    isActive
                      ? "text-cyan-accent bg-cyan-950/40 border border-cyan-500/30"
                      : "text-silver-mid hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-accent shadow-[0_0_8px_#00f5ff]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Controls & CTA */}
          <div className="flex items-center gap-2">
            <AudioController />
            <ThemeSwitcher />

            <div className="hidden sm:block">
              <MagneticButton strength={0.25}>
                <Link href="/contact" onClick={handleNavClick}>
                  <Button variant="primary" size="xs" className="h-8">
                    Initiate
                    <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-hairline text-silver-mid hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-3xl flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
            <div className="text-[10px] font-mono text-silver-dark uppercase tracking-widest mb-2 border-b border-hairline pb-2 flex items-center justify-between">
              <span>System Directory // Index</span>
              <span>10 ROUTES</span>
            </div>
            {siteConfig.navigation.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-2xl font-display uppercase tracking-tight flex items-center justify-between py-2 border-b border-hairline ${
                    isActive ? "text-cyan-accent" : "text-silver-mid hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-silver-dark">0{idx + 1}</span>
                </Link>
              );
            })}
            <div className="pt-6 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={handleNavClick}
                className="w-full py-3 rounded-full bg-cyan-accent text-black font-semibold text-center text-xs font-mono uppercase tracking-wider"
              >
                Initiate Project / Studio Retainer
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
