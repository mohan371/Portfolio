"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playTactileClick } from "@/lib/sound";
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Layers,
  Building2,
  Mail,
  Image as ImageIcon,
  Settings,
  Shield,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Journal Articles", href: "/admin/journal", icon: BookOpen },
  { label: "Content & Chronology", href: "/admin/content", icon: Layers },
  { label: "Studio & Services", href: "/admin/studio", icon: Building2 },
  { label: "Contact Enquiries", href: "/admin/enquiries", icon: Mail },
  { label: "Media Assets", href: "/admin/media", icon: ImageIcon },
  { label: "Website Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleNavClick = () => {
    playTactileClick();
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-hairline bg-surface-1 min-h-screen flex flex-col justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-hairline flex items-center justify-between">
          <Link href="/admin" onClick={handleNavClick} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-carbon border border-cyan-500/40 flex items-center justify-center font-display font-bold text-xs text-cyan-accent shadow-[0_0_12px_rgba(0,245,255,0.2)]">
              NV
            </div>
            <div>
              <h4 className="font-display font-bold text-xs text-white tracking-wider">
                MOHAN N.V.
              </h4>
              <span className="text-[10px] font-mono text-cyan-accent block">
                ADMIN CONSOLE // v1.0
              </span>
            </div>
          </Link>
          <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" title="System Online" />
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1 font-mono text-xs">
          <div className="px-3 py-1.5 text-[10px] text-silver-dark uppercase tracking-wider">
            Workspace
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-cyan-950/60 border border-cyan-500/50 text-white font-bold shadow-[0_0_15px_rgba(0,245,255,0.1)]"
                    : "text-silver-mid hover:text-white hover:bg-surface-2 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-accent" : "text-silver-dark"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-accent font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Public Site Link */}
      <div className="p-4 border-t border-hairline space-y-3 font-mono text-xs">
        <Link
          href="/"
          target="_blank"
          onClick={handleNavClick}
          className="flex items-center justify-between p-2 rounded-lg bg-carbon border border-hairline text-silver-light hover:text-white hover:border-cyan-500/50 transition-all text-[11px]"
        >
          <span className="flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-cyan-accent" />
            View Live Portfolio
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-silver-dark" />
        </Link>

        <div className="text-[10px] text-silver-dark flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-accent" />
            RLS Active
          </span>
          <span>PostgreSQL 16</span>
        </div>
      </div>
    </aside>
  );
}
