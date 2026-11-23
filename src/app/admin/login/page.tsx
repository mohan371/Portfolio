"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/admin/ToastContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playTactileClick } from "@/lib/sound";
import { Shield, Lock, Mail, ArrowRight, Sparkles, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("mohannv.dev@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setIsLoading(true);

    try {
      const supabase = createClient();

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error("Authentication Failed", error.message);
          setIsLoading(false);
          return;
        }

        toast.success("Welcome Back, Mohan", "Session verified via Supabase Auth.");
        router.push("/admin");
        return;
      }

      // Local fallback / Developer mode authentication
      if (email === "mohannv.dev@gmail.com" && (password === "admin123" || password === "mohannv2026" || password.length >= 6)) {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_auth_token", "dev_token_mohan_nv");
          document.cookie = "admin_auth=authenticated; path=/; max-age=86400;";
        }
        toast.success("Authentication Verified", "Access granted in local developer mode.");
        router.push("/admin");
      } else {
        toast.error("Invalid Credentials", "Check your administrative email and password.");
      }
    } catch (err: any) {
      toast.error("Login Error", err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDevLogin = () => {
    playTactileClick();
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_auth_token", "dev_token_mohan_nv");
      document.cookie = "admin_auth=authenticated; path=/; max-age=86400;";
    }
    toast.success("Quick Login Activated", "Signed in with Superadmin authorization.");
    router.push("/admin");
  };

  return (
    <div className="w-full max-w-md">
      {/* Brand Monogram */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-carbon border border-cyan-500/50 flex items-center justify-center font-display font-bold text-lg text-cyan-accent shadow-[0_0_24px_rgba(0,245,255,0.25)] mx-auto mb-4">
          NV
        </div>
        <h1 className="font-display font-bold text-2xl text-white tracking-wide">
          MOHAN N.V. // CMS
        </h1>
        <p className="text-xs font-mono text-silver-dark mt-1">
          SECURE ADMINISTRATIVE GATEWAY // RESTRICTED ACCESS
        </p>
      </div>

      <Card hasDatumCorners className="p-8 bg-obsidian border-hairline">
        <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-accent" />
            <span className="font-mono text-xs text-white font-bold">ADMIN AUTHENTICATION</span>
          </div>
          <Badge variant="cyan" dot>RLS ENFORCED</Badge>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-silver-dark uppercase mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-silver-dark absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mohannv.dev"
                className="w-full bg-carbon border border-hairline rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-white outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-silver-dark uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-silver-dark absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-carbon border border-hairline rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-white outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full py-2.5 text-xs font-mono font-bold gap-2 mt-2 bg-cyan-400 text-obsidian hover:bg-cyan-300"
          >
            {isLoading ? "AUTHENTICATING..." : "SIGN IN TO CMS"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Quick Developer Bypass (for local testing without live Supabase cloud) */}
        <div className="mt-6 pt-4 border-t border-hairline text-center">
          <button
            type="button"
            onClick={handleQuickDevLogin}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-accent hover:underline"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Developer Quick Access (Superadmin Mode)</span>
          </button>
        </div>
      </Card>

      <div className="mt-6 text-center text-xs font-mono text-silver-dark">
        <Link href="/" className="hover:text-white transition-colors">
          ← Return to Public Portfolio
        </Link>
      </div>
    </div>
  );
}
