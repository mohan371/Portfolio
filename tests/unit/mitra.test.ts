import { describe, it, expect, beforeEach } from "vitest";
import { useAssistantStore } from "@/store/use-assistant-store";

describe("MITRA AI Companion & Assistant Store Suite", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const store = useAssistantStore.getState();
    store.setIsOpen(false);
    store.setIsThinking(false);
    store.setInputFocused(false);
    store.setPaused(false);
    store.setQuietMode(false);
    store.setIsHidden(false);
    store.resetPosition();
    store.setSpeechBubble({
      visible: true,
      text: "Namaskaram! I'm Mitra, Mohan's little digital companion. Want to explore his portfolio?",
      actionText: "Explore Projects",
      actionType: "projects",
    });
    store.setMitraMood("idle");
  });

  it("1. Initializes with original Indian-inspired greeting and idle mood", () => {
    const state = useAssistantStore.getState();
    expect(state.mitraMood).toBe("idle");
    expect(state.isOpen).toBe(false);
    expect(state.isThinking).toBe(false);
    expect(state.isPaused).toBe(false);
    expect(state.isQuietMode).toBe(false);
    expect(state.isHidden).toBe(false);
    expect(state.speechBubble).not.toBeNull();
    expect(state.speechBubble?.text).toContain("Namaskaram! I'm Mitra");
    expect(state.speechBubble?.actionText).toBe("Explore Projects");
  });

  it("2. Transitions mood to 'listening' when assistant is opened", () => {
    const store = useAssistantStore.getState();
    store.setIsOpen(true);

    const updated = useAssistantStore.getState();
    expect(updated.isOpen).toBe(true);
    expect(updated.mitraMood).toBe("listening");
    // Speech bubble automatically dismisses when chat opens
    expect(updated.speechBubble).toBeNull();
  });

  it("3. Transitions mood to 'thinking' when AI assistant is generating response", () => {
    const store = useAssistantStore.getState();
    store.setIsThinking(true);

    const updated = useAssistantStore.getState();
    expect(updated.isThinking).toBe(true);
    expect(updated.mitraMood).toBe("thinking");

    store.setIsThinking(false);
    const resolved = useAssistantStore.getState();
    expect(resolved.isThinking).toBe(false);
    expect(resolved.mitraMood).toBe("idle");
  });

  it("4. Reflects input focus state as 'listening'", () => {
    const store = useAssistantStore.getState();
    store.setInputFocused(true);
    expect(useAssistantStore.getState().mitraMood).toBe("listening");

    store.setInputFocused(false);
    expect(useAssistantStore.getState().mitraMood).toBe("idle");
  });

  it("5. Respects Quiet Mode and suppresses speech bubbles", () => {
    const store = useAssistantStore.getState();
    store.toggleQuietMode();

    const quietState = useAssistantStore.getState();
    expect(quietState.isQuietMode).toBe(true);
    expect(quietState.speechBubble).toBeNull();

    // Trying to set speech bubble in quiet mode should be ignored
    store.setSpeechBubble({
      visible: true,
      text: "Testing quiet suppression",
    });
    expect(useAssistantStore.getState().speechBubble).toBeNull();
  });

  it("6. Freezes animations and sets mood to 'paused' when pause is toggled", () => {
    const store = useAssistantStore.getState();
    store.togglePaused();

    const pausedState = useAssistantStore.getState();
    expect(pausedState.isPaused).toBe(true);
    expect(pausedState.mitraMood).toBe("paused");

    // Other mood requests should not override paused state
    store.setMitraMood("happy");
    expect(useAssistantStore.getState().mitraMood).toBe("paused");

    // Resuming restores idle
    store.togglePaused();
    expect(useAssistantStore.getState().isPaused).toBe(false);
    expect(useAssistantStore.getState().mitraMood).toBe("idle");
  });

  it("7. Handles position persistence and reset", () => {
    const store = useAssistantStore.getState();
    expect(store.position).toBeNull();

    store.setPosition({ x: -120, y: -80 });
    expect(useAssistantStore.getState().position).toEqual({ x: -120, y: -80 });

    store.resetPosition();
    expect(useAssistantStore.getState().position).toBeNull();
  });

  it("8. Allows hiding and restoring Mitra companion", () => {
    const store = useAssistantStore.getState();
    store.setIsHidden(true);

    const hiddenState = useAssistantStore.getState();
    expect(hiddenState.isHidden).toBe(true);
    expect(hiddenState.speechBubble).toBeNull();

    store.setIsHidden(false);
    expect(useAssistantStore.getState().isHidden).toBe(false);
  });
});
