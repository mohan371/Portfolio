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
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 py-2 sm:py-2.5 rounded-full border border-border bg-white/95 dark:bg-obsidian/90 backdrop-blur-2xl shadow-nav transition-all duration-300 hover:border-blue-300 dark:hover:border-white/20">
          {/* Brand Identity / Monogram */}
          <Link
            href="/"
            onClick={handleNavClick}
            onMouseEnter={handleHover}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-9 h-9 rounded-full border border-border bg-surface-secondary dark:bg-carbon flex items-center justify-center font-display font-bold text-xs text-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300 shadow-xs">
              NV
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-display font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                MOHAN<span className="text-primary font-bold">.</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
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
                      ? "text-secondary-foreground bg-secondary font-semibold border border-blue-200/70 shadow-xs dark:text-white dark:bg-white/[0.08] dark:border-white/15"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-secondary dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-xs" />
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
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary-foreground ml-0.5" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-primary" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 dark:bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 md:hidden animate-in fade-in duration-200">
          {/* Header row in mobile overlay */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-border bg-surface-secondary flex items-center justify-center font-display font-bold text-xs text-foreground">
                NV
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-foreground">
                MOHAN<span className="text-primary font-bold">.</span>
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links stack */}
          <div className="flex flex-col gap-2 py-6 overflow-y-auto">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
              Navigation
            </span>
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-xl font-display font-bold tracking-tight py-2 border-b border-border/50 flex items-center justify-between ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-mono text-primary">// ACTIVE</span>}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={handleNavClick}
              className="text-xl font-display font-bold tracking-tight py-2 text-primary flex items-center justify-between mt-2"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Footer in mobile overlay */}
          <div className="border-t border-border pt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
            <span className="text-primary">{siteConfig.availability.status}</span>
          </div>
        </div>
      )}
    </>
  );
}
