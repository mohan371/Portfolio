import Link from "next/link";
import { siteConfig } from "@/content/data/site-config";
import { Badge } from "@/components/ui/badge";
import { Mail, ShieldCheck, Terminal } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-void relative z-10 pt-20 pb-14 overflow-hidden">
      {/* Hairline Grid Accent */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-hairline">
          {/* Brand Identity & Architectural Stance */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-hairline bg-carbon flex items-center justify-center font-display font-bold text-xs text-white">
                NV
              </div>
              <span className="font-display font-bold text-white text-base tracking-wider">
                {siteConfig.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-silver-mid font-light max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Badge variant="emerald" dot>
                {siteConfig.availability.status}
              </Badge>
              <span className="text-[11px] font-mono text-silver-dark">
                {siteConfig.location.city}, {siteConfig.location.country}
              </span>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase text-silver-dark tracking-widest">
              Directory
            </span>
            <div className="flex flex-col gap-2 text-xs font-mono text-silver-mid">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
              <Link href="/experience" className="hover:text-white transition-colors">Experience</Link>
              <Link href="/lab" className="hover:text-white transition-colors">Lab</Link>
            </div>
          </div>

          {/* Directory Column 2 */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase text-silver-dark tracking-widest">
              Platform
            </span>
            <div className="flex flex-col gap-2 text-xs font-mono text-silver-mid">
              <Link href="/journal" className="hover:text-white transition-colors">Journal</Link>
              <Link href="/studio" className="hover:text-white transition-colors">Studio</Link>
              <Link href="/resume" className="hover:text-white transition-colors">Resume</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/admin/login" className="hover:text-white text-silver-dark transition-colors">Admin</Link>
            </div>
          </div>

          {/* Security & Direct Transmission */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase text-silver-dark tracking-widest">
              Direct Transmission
            </span>
            <div className="flex flex-col gap-3 text-xs text-silver-mid">
              <a
                href={`mailto:${siteConfig.socials.email}`}
                className="hover:text-cyan-accent font-mono transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                {siteConfig.socials.email}
              </a>

              <div className="flex items-center gap-2 text-[10px] font-mono text-silver-dark pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-accent" />
                <span>PGP: 4A7F 92B1 C83E 55E0</span>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-hairline bg-carbon hover:border-white/30 text-silver-mid hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-hairline bg-carbon hover:border-white/30 text-silver-mid hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-hairline bg-carbon hover:border-white/30 text-silver-mid hover:text-white transition-colors"
                  aria-label="Twitter Profile"
                >
                  <TwitterXIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates & Engineering Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-silver-dark gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-cyan-accent" />
            <span>© {new Date().getFullYear()} {siteConfig.name}. ARCHITECTURAL SYSTEM v16.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>COORDINATES: {siteConfig.location.coordinates}</span>
            <span>•</span>
            <span>TIMEZONE: {siteConfig.location.timezone}</span>
          </div>

          <div className="text-silver-dark/80">
            ENGINEERED WITH ZERO COMPROMISE
          </div>
        </div>
      </div>
    </footer>
  );
}
