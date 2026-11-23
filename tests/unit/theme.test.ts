import { describe, it, expect, beforeEach } from "vitest";
import { THEME_STORAGE_KEY } from "@/components/creative/ThemeSwitcher";

describe("Theme System & Storage Migration Suite", () => {
  let store: Record<string, string> = {};
  let attributes: Record<string, string> = {};
  let classListSet = new Set<string>();

  const mockLocalStorage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => {
      store[key] = val;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };

  const mockDocElement = {
    setAttribute: (name: string, value: string) => {
      attributes[name] = value;
    },
    getAttribute: (name: string) => attributes[name] ?? null,
    removeAttribute: (name: string) => {
      delete attributes[name];
    },
    classList: {
      add: (cls: string) => classListSet.add(cls),
      remove: (cls: string) => classListSet.delete(cls),
      contains: (cls: string) => classListSet.has(cls),
    },
  };

  beforeEach(() => {
    store = {};
    attributes = {};
    classListSet = new Set<string>();
  });

  // Reusable runner simulating the inline <head> bootstrap script in layout.tsx
  const runHeadInitScript = (storage = mockLocalStorage, doc = mockDocElement) => {
    try {
      if (storage.getItem("nv-theme") !== null) {
        storage.removeItem("nv-theme");
      }
      const s = storage.getItem(THEME_STORAGE_KEY);
      if (s === "light") {
        doc.setAttribute("data-theme", "light");
        doc.classList.remove("dark");
        doc.classList.add("light");
      } else {
        doc.setAttribute("data-theme", "dark");
        doc.classList.remove("light");
        doc.classList.add("dark");
      }
    } catch {
      doc.setAttribute("data-theme", "dark");
      doc.classList.remove("light");
      doc.classList.add("dark");
    }
  };

  it("TEST A: First-time visitor with empty localStorage receives DARK theme", () => {
    expect(mockLocalStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    runHeadInitScript();
    expect(mockDocElement.getAttribute("data-theme")).toBe("dark");
    expect(mockDocElement.classList.contains("dark")).toBe(true);
    expect(mockDocElement.classList.contains("light")).toBe(false);
  });

  it("TEST B: Safely cleans up legacy 'nv-theme=light' without wiping admin auth or highscore, resetting to DARK", () => {
    mockLocalStorage.setItem("nv-theme", "light");
    mockLocalStorage.setItem("admin_auth_token", "dev_token_mohan_nv");
    mockLocalStorage.setItem("nv_arcade_highscore", "450");

    runHeadInitScript();

    // Legacy key must be safely migrated (deleted)
    expect(mockLocalStorage.getItem("nv-theme")).toBeNull();
    // Non-theme keys must remain intact
    expect(mockLocalStorage.getItem("admin_auth_token")).toBe("dev_token_mohan_nv");
    expect(mockLocalStorage.getItem("nv_arcade_highscore")).toBe("450");
    // Theme defaults to DARK
    expect(mockDocElement.getAttribute("data-theme")).toBe("dark");
    expect(mockDocElement.classList.contains("dark")).toBe(true);
  });

  it("TEST C: User manually switches to LIGHT and refreshes", () => {
    // User toggles to light
    mockLocalStorage.setItem(THEME_STORAGE_KEY, "light");

    // Simulating page refresh / reload
    runHeadInitScript();

    expect(mockDocElement.getAttribute("data-theme")).toBe("light");
    expect(mockDocElement.classList.contains("light")).toBe(true);
    expect(mockDocElement.classList.contains("dark")).toBe(false);
  });

  it("TEST D: User switches back to DARK and refreshes", () => {
    mockLocalStorage.setItem(THEME_STORAGE_KEY, "light");
    runHeadInitScript();
    expect(mockDocElement.getAttribute("data-theme")).toBe("light");

    // User toggles back to dark
    mockLocalStorage.setItem(THEME_STORAGE_KEY, "dark");

    // Simulating page refresh
    runHeadInitScript();

    expect(mockDocElement.getAttribute("data-theme")).toBe("dark");
    expect(mockDocElement.classList.contains("dark")).toBe(true);
    expect(mockDocElement.classList.contains("light")).toBe(false);
  });

  it("TEST E & F: Fallback error handling (e.g. storage disabled in private mode) enforces DARK default", () => {
    const brokenStorage = {
      ...mockLocalStorage,
      getItem: () => {
        throw new Error("QuotaExceededError");
      },
    };

    runHeadInitScript(brokenStorage, mockDocElement);

    expect(mockDocElement.getAttribute("data-theme")).toBe("dark");
    expect(mockDocElement.classList.contains("dark")).toBe(true);
  });
});
