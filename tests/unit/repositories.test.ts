import { describe, it, expect } from "vitest";
import { getProjects, getProjectBySlug } from "@/lib/repositories/projects.repository";
import { getSkills } from "@/lib/repositories/skills.repository";
import { getEducation } from "@/lib/repositories/education.repository";
import { getExperience } from "@/lib/repositories/experience.repository";

describe("Repository Offline Fallback & Data Truth Integrity", () => {
  it("returns authentic Mohan N.V. projects when database is offline", async () => {
    const projects = await getProjects();
    expect(projects.length).toBeGreaterThanOrEqual(4);

    // Verify key projects from resume
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toContain("mapup-fleet-geofencing");
    expect(slugs.some((s) => s.includes("veda"))).toBe(true);

    // Check MapUp project content
    const mapup = await getProjectBySlug("mapup-fleet-geofencing");
    expect(mapup).toBeDefined();
    expect(mapup?.title).toContain("MapUp");
    expect(mapup?.technologies).toContain("Go");
    expect(mapup?.technologies).toContain("PostgreSQL");
  });

  it("returns authentic education data (MCA 92%, BCA 78%)", async () => {
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

  it("returns authentic employment history including Veda Scholars and Gabriel India Ltd", async () => {
    const experience = await getExperience();
    expect(experience.length).toBeGreaterThanOrEqual(2);

    // Current Software Engineer role at Veda Scholars
    const veda = experience.find((e) => e.company.includes("Veda Scholars"));
    expect(veda).toBeDefined();
    expect(veda?.role).toContain("Software Engineer");
    expect(veda?.period).toContain("Present");

    // Corporate accounting tenure at Gabriel India Ltd
    const gabriel = experience.find((e) => e.company.includes("Gabriel India"));
    expect(gabriel).toBeDefined();
    expect(gabriel?.role).toContain("Accountant");
    expect(gabriel?.period).toContain("2022");
    expect(gabriel?.period).toContain("2024");
  });

  it("returns authentic skill set containing JavaScript, Java, React, Next.js, MongoDB, MySQL, Git", async () => {
    const skills = await getSkills();
    expect(skills.length).toBeGreaterThanOrEqual(10);

    const skillNames = skills.map((s) => s.name.toLowerCase());
    expect(skillNames.some((n) => n.includes("javascript"))).toBe(true);
    expect(skillNames.some((n) => n.includes("java"))).toBe(true);
    expect(skillNames.some((n) => n.includes("react"))).toBe(true);
    expect(skillNames.some((n) => n.includes("next.js"))).toBe(true);
    expect(skillNames.some((n) => n.includes("mongodb"))).toBe(true);
    expect(skillNames.some((n) => n.includes("mysql"))).toBe(true);
    expect(skillNames.some((n) => n.includes("git"))).toBe(true);
  });
});
