import { createServerSupabaseClient } from "@/lib/supabase/server";
import { companyProfileSchema, companyServiceSchema } from "@/lib/validations";

export interface CompanyProfile {
  name: string;
  tagline: string;
  mission: string;
  description: string;
  foundedYear: number;
  location: string;
  contactEmail: string;
  status: string;
  metrics: Record<string, string>;
}

export interface CompanyService {
  id: string;
  title: string;
  slug: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  isActive: boolean;
}

const FALLBACK_PROFILE: CompanyProfile = {
  name: "Nexora Engineering Labs",
  tagline: "Turning Complex Engineering Ideas into Reliable Working Software.",
  mission: "To engineer high-performance, fault-tolerant digital products and distributed backend systems with mathematical precision.",
  description: "Nexora Engineering Labs is a specialized digital product and software engineering studio founded by Mohan N.V.",
  foundedYear: 2026,
  location: "Hosur / Bangalore, India",
  contactEmail: "studio@mohannv.dev",
  status: "In Stealth / Formation",
  metrics: {
    codeQuality: "100% Strict TypeScript",
    targetUptime: "99.99%",
    avgResponseLatency: "<25ms",
    databaseGuarantees: "ACID Compliant",
  },
};

const FALLBACK_SERVICES: CompanyService[] = [
  {
    id: "serv-1",
    title: "Distributed Systems & Cloud Microservices",
    slug: "distributed-systems-architecture",
    description: "Design and implementation of high-throughput backend services using Go, Node.js, and PostgreSQL.",
    deliverables: [
      "Containerized microservices with Docker and Docker Compose",
      "REST API contract specifications",
      "Database schema modeling with PostgreSQL indexing and caching layers",
    ],
    technologies: ["Go", "PostgreSQL", "Docker", "REST APIs"],
    isActive: true,
  },
  {
    id: "serv-2",
    title: "Real-Time Telemetry & Spatial Systems",
    slug: "real-time-telemetry-geofencing",
    description: "Specialized engineering of GPS streaming, spatial boundary detection (Jordan Curve PIP), and WebSocket event distribution.",
    deliverables: [
      "In-memory point-in-polygon ray-casting engine",
      "Full-duplex WebSocket event streaming infrastructure",
      "Interactive 2D map canvas dashboards with Leaflet and React",
    ],
    technologies: ["Go", "WebSockets", "Canvas 2D", "PostgreSQL"],
    isActive: true,
  },
];

export async function getCompanyProfile(): Promise<CompanyProfile> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("company_profile")
        .select("*")
        .eq("is_published", true)
        .single();

      if (!error && data) {
        return {
          name: data.name,
          tagline: data.tagline,
          mission: data.mission,
          description: data.description,
          foundedYear: Number(data.founded_year) || 2026,
          location: data.location,
          contactEmail: data.contact_email,
          status: data.status,
          metrics: data.metrics || {},
        };
      }
    }
  } catch (err) {
    console.warn("[CompanyRepository] Profile fallback:", err);
  }

  return FALLBACK_PROFILE;
}

export async function getCompanyServices(): Promise<CompanyService[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase as any)
        .from("company_services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return (data as any[]).map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          description: s.description,
          deliverables: s.deliverables || [],
          technologies: s.technologies || [],
          isActive: Boolean(s.is_active),
        }));
      }
    }
  } catch (err) {
    console.warn("[CompanyRepository] Services fallback:", err);
  }

  return FALLBACK_SERVICES;
}
