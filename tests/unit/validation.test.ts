import { describe, it, expect } from "vitest";
import { studioEnquirySchema } from "@/lib/validations/studio";
import { projectSchema, adminLoginSchema, skillSchema } from "@/lib/validations";

describe("Validation Schemas Integrity", () => {
  describe("Studio Client Enquiry Schema", () => {
    it("successfully validates a complete legitimate enquiry", () => {
      const validPayload = {
        name: "Vikram Ramanathan",
        email: "vikram@techdynamics.io",
        phone: "+91 98765 43210",
        businessName: "Tech Dynamics India",
        projectType: "Full-Stack Web Application",
        budgetRange: "₹3,50,000 — ₹7,50,000 (Enterprise Tier)",
        requirements: "We need an end-to-end telemetry dashboard with WebSockets and PostgreSQL time-series analytics.",
        expectedTimeline: "1 — 2 Months (Standard Milestone)",
      };

      const result = studioEnquirySchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("vikram@techdynamics.io");
        expect(result.data.name).toBe("Vikram Ramanathan");
      }
    });

    it("rejects invalid email formats", () => {
      const invalidEmail = {
        name: "Vikram Ramanathan",
        email: "not-an-email",
        phone: "+91 98765 43210",
        projectType: "Dynamic Website",
        budgetRange: "₹50,000 — ₹1,50,000 (Starter / MVP)",
        requirements: "Needs high performance SEO landing page with Next.js.",
        expectedTimeline: "< 2 Weeks (Rapid Launch)",
      };

      const result = studioEnquirySchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
      if (!result.success) {
        const emailErr = result.error.issues.find((i) => i.path[0] === "email");
        expect(emailErr).toBeDefined();
      }
    });

    it("rejects requirement descriptions under 15 characters", () => {
      const shortReq = {
        name: "Vikram Ramanathan",
        email: "vikram@techdynamics.io",
        phone: "+91 98765 43210",
        projectType: "Dynamic Website",
        budgetRange: "₹50,000 — ₹1,50,000 (Starter / MVP)",
        requirements: "Build app", // Only 9 chars
        expectedTimeline: "< 2 Weeks (Rapid Launch)",
      };

      const result = studioEnquirySchema.safeParse(shortReq);
      expect(result.success).toBe(false);
    });

    it("rejects phone numbers with invalid characters or too short", () => {
      const invalidPhone = {
        name: "Vikram Ramanathan",
        email: "vikram@techdynamics.io",
        phone: "123", // Too short
        projectType: "Dynamic Website",
        budgetRange: "₹50,000 — ₹1,50,000 (Starter / MVP)",
        requirements: "Build high-speed landing page with custom CMS integration.",
        expectedTimeline: "< 2 Weeks (Rapid Launch)",
      };

      const result = studioEnquirySchema.safeParse(invalidPhone);
      expect(result.success).toBe(false);
    });
  });

  describe("Admin Login Schema", () => {
    it("validates legitimate admin email and password", () => {
      const valid = {
        email: "admin@mohannv.dev",
        password: "supersecurepassword123",
      };
      const result = adminLoginSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects passwords under 8 characters", () => {
      const invalid = {
        email: "admin@mohannv.dev",
        password: "short",
      };
      const result = adminLoginSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("Project & Skill Schemas", () => {
    it("validates a full project payload with architecture nodes and engineering challenges", () => {
      const validProject = {
        title: "MapUp Telemetry & Geofencing Engine",
        slug: "mapup-geofencing-telemetry",
        short_description: "Real-time fleet tracking and polygon boundary breach calculation.",
        detailed_description: "Built using Go, PostgreSQL PostGIS, and React with Leaflet for geospatial tracking.",
        category: "Distributed Systems & Telemetry",
        thumbnail_url: "/projects/mapup-thumb.webp",
        github_url: "https://github.com/Mohan-NV/mapup-fleet-telemetry",
        live_demo_url: "https://mapup.mohannv.dev",
        status: "Production",
        is_featured: true,
        is_published: true,
        architecture_nodes: [
          { layer: "Ingestion", technology: "Go WebSocket Hub", responsibility: "Ingest GPS pings at 10k/sec" },
          { layer: "Processing", technology: "Jordan Curve Ray-Caster", responsibility: "Geofence containment test" },
        ],
        key_features: ["Sub-50ms breach notification", "Real-time replay canvas"],
        challenges: [
          { title: "Ray-casting performance", challenge: "O(N) edge test under heavy load", resolution: "Spatial indexing with bounding boxes" },
        ],
      };

      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it("rejects invalid slugs with uppercase or special characters", () => {
      const invalidSlug = {
        name: "PostgreSQL",
        slug: "PostgreSQL_Database!", // uppercase and special char
        category: "databases",
        level: "Advanced",
        years_of_experience: 2,
      };

      const result = skillSchema.safeParse(invalidSlug);
      expect(result.success).toBe(false);
    });
  });
});
