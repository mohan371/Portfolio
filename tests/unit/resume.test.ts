import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/content/data/site-config";

describe("Resume Document & Asset Integrity Suite", () => {
  const publicResumePath = path.join(process.cwd(), "public", "resume", "Mohan_N_V_Resume.pdf");
  const fallbackResumePath = path.join(process.cwd(), "public", "resume", "Mohan_NV_Resume.pdf");

  it("1. Verifies Mohan_N_V_Resume.pdf exists in public/resume/", () => {
    expect(fs.existsSync(publicResumePath)).toBe(true);
  });

  it("2. Verifies Mohan_NV_Resume.pdf fallback exists in public/resume/", () => {
    expect(fs.existsSync(fallbackResumePath)).toBe(true);
  });

  it("3. Verifies PDF has valid %PDF- magic bytes and is not empty", () => {
    const stats = fs.statSync(publicResumePath);
    expect(stats.size).toBeGreaterThan(50000); // Actual uploaded PDF is ~202 KB

    const fd = fs.openSync(publicResumePath, "r");
    const buffer = Buffer.alloc(10);
    fs.readSync(fd, buffer, 0, 10, 0);
    fs.closeSync(fd);

    const header = buffer.toString("utf8");
    expect(header.startsWith("%PDF-")).toBe(true);
  });

  it("4. Verifies siteConfig.resumeUrl points to /resume/Mohan_N_V_Resume.pdf", () => {
    expect(siteConfig.resumeUrl).toBe("/resume/Mohan_N_V_Resume.pdf");
  });
});
