import { describe, it, expect } from "vitest";
import { getProjects, getProjectBySlug } from "@/lib/repositories/projects.repository";
import { getSkills } from "@/lib/repositories/skills.repository";
import { getEducation } from "@/lib/repositories/education.repository";
import { getExperience } from "@/lib/repositories/experience.repository";

describe("Repository Offline Fallback & Data Truth Integrity", () => {
  it("returns authentic Mohan N.V. projects when database is offline", async () => {
    const projects = await getProjects();
    expect(projects.length).toBeGreaterThanOrEqual(3);

    // Verify key projects
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toContain("mapup-fleet-geofencing");
    expect(slugs.some((s) => s.includes("veda"))).toBe(true);
    expect(slugs.some((s) => s.includes("saas"))).toBe(true);

    // Check MapUp project content
    const mapup = await getProjectBySlug("mapup-fleet-geofencing");
    expect(mapup).toBeDefined();
    expect(mapup?.title).toContain("MapUp");
    expect(mapup?.technologies).toContain("Go");
    expect(mapup?.technologies).toContain("PostgreSQL");
  });

  it("returns authentic education data (MCA 2026, BCA 2022)", async () => {
    const education = await getEducation();
    expect(education.length).toBeGreaterThanOrEqual(2);

    const mca = education.find((e) => e.degree.includes("MCA") || e.degree.includes("Master of Computer Applications"));
    expect(mca).toBeDefined();
    expect(mca?.institution).toContain("Adhiyamaan");
    expect(mca?.year).toContain("2026");

    const bca = education.find((e) => e.degree.includes("BCA") || e.degree.includes("Bachelor of Computer Applications"));
    expect(bca).toBeDefined();
    expect(bca?.institution).toContain("MGR");
    expect(bca?.year).toContain("2022");
  });

  it("returns authentic corporate experience (Gabriel India Ltd 2022-2024)", async () => {
    const experience = await getExperience();
    expect(experience.length).toBeGreaterThanOrEqual(1);

    const gabriel = experience.find((e) => e.company.includes("Gabriel India"));
    expect(gabriel).toBeDefined();
    expect(gabriel?.role).toContain("Accountant");
    expect(gabriel?.period).toContain("2022");
    expect(gabriel?.period).toContain("2024");
  });

  it("returns authentic skill set containing Java, Go, React, Next.js, Docker", async () => {
    const skills = await getSkills();
    expect(skills.length).toBeGreaterThanOrEqual(10);

    const skillNames = skills.map((s) => s.name.toLowerCase());
    expect(skillNames.some((n) => n.includes("java"))).toBe(true);
    expect(skillNames.some((n) => n.includes("go"))).toBe(true);
    expect(skillNames.some((n) => n.includes("react"))).toBe(true);
    expect(skillNames.some((n) => n.includes("next.js"))).toBe(true);
    expect(skillNames.some((n) => n.includes("postgresql"))).toBe(true);
    expect(skillNames.some((n) => n.includes("docker"))).toBe(true);
  });
});
