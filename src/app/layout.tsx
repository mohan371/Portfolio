import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MohanFmPlayer } from "@/components/music/MohanFmPlayer";
import { PersistentSpotifyHost } from "@/components/music/PersistentSpotifyHost";
import { AskMohanAssistant } from "@/components/assistant/AskMohanAssistant";
import { CustomCursor } from "@/components/creative/CustomCursor";
import { GridHUD } from "@/components/creative/GridHUD";
import { NoiseOverlay } from "@/components/creative/NoiseOverlay";
import { PageProgress } from "@/components/creative/PageProgress";
import { AnimatedBackgroundGrid } from "@/components/creative/AnimatedBackgroundGrid";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/content/data/site-config";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Mohan N.V.",
    "Full-Stack Developer",
    "Software Engineer",
    "Java",
    "Go",
    "React",
    "Next.js",
    "PostgreSQL",
    "Docker",
    "Full-Stack Web Development",
    "Adhiyamaan College of Engineering",
    "Bangalore Software Engineer",
  ],
  authors: [{ name: siteConfig.name, url: "https://mohannv.dev" }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohannv.dev",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.tagline,
    creator: "@mohannv",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mohannv.dev/#person",
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        url: "https://mohannv.dev",
        sameAs: [
          "https://github.com/mohannv",
          "https://linkedin.com/in/mohannv",
        ],
        alumnusOf: [
          {
            "@type": "EducationalOrganization",
            name: "Adhiyamaan College of Engineering",
            url: "http://adhiyamaan.ac.in/",
          },
          {
            "@type": "EducationalOrganization",
            name: "MGR College of Arts and Science",
          },
        ],
        worksFor: {
          "@type": "Organization",
          name: "Veda Scholars",
        },
        knowsAbout: [
          "Java",
          "Go (Golang)",
          "React",
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "MongoDB",
          "MySQL",
          "Docker",
          "REST APIs",
          "WebSockets",
          "Distributed Systems",
        ],
        description: siteConfig.tagline,
      },
      {
        "@type": "WebSite",
        "@id": "https://mohannv.dev/#website",
        url: "https://mohannv.dev",
        name: "Mohan N.V. — Portfolio & Engineering Lab",
        description: siteConfig.positioning,
        publisher: {
          "@id": "https://mohannv.dev/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("nv-theme")!==null){localStorage.removeItem("nv-theme");}var s=localStorage.getItem("mohan-theme-v2");if(s==="light"){document.documentElement.setAttribute("data-theme","light");document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");}else{document.documentElement.setAttribute("data-theme","dark");document.documentElement.classList.remove("light");document.documentElement.classList.add("dark");}}catch(e){document.documentElement.setAttribute("data-theme","dark");document.documentElement.classList.remove("light");document.documentElement.classList.add("dark");}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-white font-sans transition-colors duration-200">
        <TooltipProvider delayDuration={150}>
          {/* Real-time Page Progress Line */}
          <PageProgress />

          {/* Atmospheric Ambient Visual Layers */}
          <AnimatedBackgroundGrid />
          <NoiseOverlay />
          <CustomCursor />
          <GridHUD />

          {/* Global Floating Navigation Shell */}
          <Navbar />

          {/* Main Content Viewport */}
          <main className="flex-1 pt-24">{children}</main>

          {/* Architectural Technical Footer */}
          <Footer />

          {/* Interactive Mohan Experiences: FM & AI Assistant */}
          <PersistentSpotifyHost />
          <MohanFmPlayer />
          <AskMohanAssistant />
        </TooltipProvider>
      </body>
    </html>
  );
}
