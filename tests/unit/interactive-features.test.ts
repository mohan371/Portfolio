import { describe, it, expect } from "vitest";
import { toSpotifyEmbedUrl } from "@/content/data/music";
import { generateAssistantResponse } from "@/lib/ai/engine";
import { checkRateLimit } from "@/lib/ai/rate-limiter";
import { arcadeChallenges } from "@/content/data/arcade";

describe("FEATURE 01: MOHAN.FM Spotify Embed Conversions", () => {
  it("converts standard Spotify track URL to official embed URL", () => {
    const url = "https://open.spotify.com/track/1Tu2b1Y2eGZ86p8yD8eO9O";
    const embed = toSpotifyEmbedUrl(url);
    expect(embed).toContain("https://open.spotify.com/embed/track/1Tu2b1Y2eGZ86p8yD8eO9O");
  });

  it("converts Spotify playlist URL to official embed URL", () => {
    const url = "https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM";
    const embed = toSpotifyEmbedUrl(url);
    expect(embed).toContain("https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM");
  });

  it("preserves an already formatted embed URL without mangling", () => {
    const embedUrl = "https://open.spotify.com/embed/track/12345?utm_source=generator";
    expect(toSpotifyEmbedUrl(embedUrl)).toBe(embedUrl);
  });
});

describe("FEATURE 02: Ask Mohan Verified AI Assistant Engine", () => {
  it("answers current role as Software Engineer at Veda Scholars", async () => {
    const res = await generateAssistantResponse("What is your current role and employer?");
    expect(res.answer).toContain("Veda Scholars");
    expect(res.answer).toContain("Software Engineer");
  });

  it("answers education credentials with First Class MCA (9.2 CGPA)", async () => {
    const res = await generateAssistantResponse("Tell me about your education and college");
    expect(res.answer).toContain("Master of Computer Applications");
    expect(res.answer).toContain("Adhiyamaan College of Engineering");
    expect(res.answer).toContain("9.2 CGPA");
  });

  it("accurately recalls corporate tenure at Gabriel India Ltd", async () => {
    const res = await generateAssistantResponse("What did you do at Gabriel India?");
    expect(res.answer).toContain("Gabriel India Ltd");
    expect(res.answer).toContain("Bill Booking Accountant");
  });

  it("enforces rate limiter after threshold", () => {
    const testIp = `test-ip-${Date.now()}`;
    const limit = 5;

    for (let i = 0; i < limit; i++) {
      const check = checkRateLimit(testIp, limit, 10000);
      expect(check.allowed).toBe(true);
    }

    const blocked = checkRateLimit(testIp, limit, 10000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});

describe("FEATURE 03: Engineering Arcade Bug Challenges Validity", () => {
  it("covers all 5 difficulty levels", () => {
    const levels = new Set(arcadeChallenges.map((c) => c.level));
    expect(levels.has(1)).toBe(true);
    expect(levels.has(2)).toBe(true);
    expect(levels.has(3)).toBe(true);
    expect(levels.has(4)).toBe(true);
    expect(levels.has(5)).toBe(true);
  });

  it("ensures every challenge has exactly one correct option", () => {
    arcadeChallenges.forEach((challenge) => {
      const correctOptions = challenge.options.filter((o) => o.isCorrect);
      expect(correctOptions.length).toBe(1);
    });
  });

  it("ensures all challenges possess an educational explanation and hint", () => {
    arcadeChallenges.forEach((challenge) => {
      expect(challenge.hint.length).toBeGreaterThan(10);
      expect(challenge.explanation.length).toBeGreaterThan(20);
      expect(challenge.buggyCode.length).toBeGreaterThan(10);
    });
  });
});
