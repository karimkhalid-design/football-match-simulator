/** @vitest-environment happy-dom */
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import VarGame from "./VarGame";
import { getNeutralDiscussionText, shuffleVarRounds, varRounds } from "../lib/varData";

afterEach(() => cleanup());

describe("VAR و لا لأ؟", () => {
  it("sets the exact page title and keeps mobile-first controls structurally available", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 });
    render(<VarGame onBackToHub={() => undefined} />);
    expect(document.title).toBe("VAR و لا لأ؟");
    expect(document.querySelector(".var-page")).toBeTruthy();
    expect(document.querySelector(".var-name-grid")).toBeTruthy();
    expect(document.querySelector(".var-count-picker")).toBeTruthy();
    expect(screen.getByRole("button", { name: "ابدأ اللعبة" })).toBeTruthy();
  });

  it("loads a real case with named players and hides the verified decision until reveal", () => {
    const realRounds = varRounds.filter((round) => round.isReal);
    render(<VarGame onBackToHub={() => undefined} roundPool={[realRounds[0]]} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    expect(realRounds.every((round) => round.isReal && round.match && round.teams && (round.players?.length ?? 0) >= 2)).toBe(true);
    expect(varRounds.every((round) => round.isReal && round.originalDecision && round.explanation && round.verificationRef.trim().length > 0 && round.verificationSource.title.trim().length > 0 && round.verificationSource.url.startsWith("https://"))).toBe(true);
    expect(new Set(shuffleVarRounds(varRounds, 0.11).map((round) => round.id)).size).toBe(varRounds.length);
    expect(new Set(shuffleVarRounds(varRounds, 0.77).map((round) => round.id)).size).toBe(varRounds.length);
    expect(screen.queryByText(/القرار الصحيح/)).toBe(null);
    expect(screen.queryByText(/قرار الحكم الأصلي/)).toBe(null);
    expect(screen.queryByRole("link", { name: /Sky Sports/ })).toBe(null);
    fireEvent.click(screen.getByRole("button", { name: /اقرأ الحالة وابدأ النقاش/ }));
    fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
    fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
    fireEvent.click(screen.getAllByRole("button").find((button) => button.className.includes("var-choice")) as HTMLElement);
    expect(screen.getByText(/القرار الصحيح:/)).toBeTruthy();
    expect(screen.getAllByText(/قرار الحكم الأصلي/).length).toBeGreaterThan(0);
  });

  it("uses neutral discussion copy and hides internal VAR evidence before reveal", () => {
    expect(varRounds.every((round) => {
      const neutral = getNeutralDiscussionText(round);
      return neutral !== round.description && !neutral.includes(round.correctAnswer) && !neutral.includes(round.originalDecision ?? "__missing__") && !neutral.includes(round.varInfo);
    })).toBe(true);

    const realRound = varRounds[0];
    render(<VarGame onBackToHub={() => undefined} roundPool={[realRound]} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    expect(screen.getByText(getNeutralDiscussionText(realRound))).toBeTruthy();
    expect(screen.queryByText(realRound.description)).toBe(null);
    expect(screen.queryByText(realRound.varInfo)).toBe(null);
  });

  it("keeps the first version text-only and exposes real names before the hidden reveal", () => {
    const realRound = varRounds.find((round) => round.isReal)!;
    render(<VarGame onBackToHub={() => undefined} roundPool={[realRound]} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    expect(document.querySelector("iframe")).toBe(null);
    expect(screen.getByText(realRound.teams!)).toBeTruthy();
    expect(screen.getByText(realRound.players![0])).toBeTruthy();
    expect(screen.queryByText(/القرار الصحيح/)).toBe(null);
  });

  it("shuffles every new session without repeating incident ids", () => {
    const first = shuffleVarRounds(varRounds, 0.11);
    const second = shuffleVarRounds(varRounds, 0.77);
    expect(new Set(first.map((round) => round.id)).size).toBe(first.length);
    expect(new Set(second.map((round) => round.id)).size).toBe(second.length);
    expect(first.map((round) => round.id)).not.toEqual(second.map((round) => round.id));
  });

  it("keeps critical gameplay controls available at 375px", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 });
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /اقرأ الحالة وابدأ النقاش/ }));
    expect(document.querySelector(".var-countdown")).toBeTruthy();
    expect(document.querySelector(".var-prediction-grid")).toBeTruthy();
    expect(screen.getByRole("button", { name: /افتح الـVAR/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
    expect(document.querySelector(".var-checking")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
    expect(document.querySelector(".var-decision-options")).toBeTruthy();
    fireEvent.click(screen.getAllByRole("button").find((button) => button.className.includes("var-choice")) as HTMLElement);
    expect(document.querySelector(".var-result-panel")).toBeTruthy();
    expect(screen.getByRole("button", { name: /الجولة التالية/ })).toBeTruthy();
  });

  it("starts with one-phone setup and allows 2 to 10 players", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    expect(screen.getByRole("heading", { name: /VAR/ })).toBeTruthy();
    expect(screen.getByText("اقرأ الحالة… خد قرارك")).toBeTruthy();
    expect(screen.getByRole("button", { name: "10" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  it("starts a round, shows the discussion timer, and records spoken-player predictions", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /اقرأ الحالة وابدأ النقاش/ }));
    expect(screen.getByText("اتناقشوا… إيه قراركم؟")).toBeTruthy();
    expect(screen.getByText("60")).toBeTruthy();
    const option = document.querySelector(".var-prediction-grid button") as HTMLElement;
    fireEvent.click(option);
    expect(option.className).toContain("selected");
    expect(screen.getByRole("button", { name: /افتح الـVAR/ })).toBeTruthy();
  });

  it("moves automatically to VAR review when the 60-second discussion timer ends", () => {
    vi.useFakeTimers();
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /اقرأ الحالة وابدأ النقاش/ }));
    expect(screen.getByText("60")).toBeTruthy();
    act(() => { vi.advanceTimersByTime(60000); });
    expect(screen.getByText("VAR CHECKING...")).toBeTruthy();
    vi.useRealTimers();
  });

  it("opens the VAR and reveals four decision buttons", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /اقرأ الحالة وابدأ النقاش/ }));
    fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
    expect(screen.getByText("VAR CHECKING...")).toBeTruthy();
    expect(screen.getByRole("button", { name: "انتقل للقرار" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
    expect(document.querySelectorAll(".var-choice")).toHaveLength(4);
  });

  it("completes all ten rounds and restarts from the final ranking", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    for (let index = 0; index < 10; index += 1) {
      fireEvent.click(screen.getByRole("button", { name: /اقرأ الحالة وابدأ النقاش/ }));
      fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
      fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
      fireEvent.click(screen.getAllByRole("button").find((button) => button.className.includes("var-choice")) as HTMLElement);
      fireEvent.click(screen.getByRole("button", { name: index === 9 ? /صافرة النهاية/ : /الجولة التالية/ }));
    }
    expect(screen.getByText("صافرة النهاية")).toBeTruthy();
    expect(screen.getAllByText(/خبير VAR/).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: /لعبة جديدة/ }));
    expect(screen.getByRole("button", { name: "ابدأ اللعبة" })).toBeTruthy();
  });

  it("scores a round, moves to the next round, rotates the judge, and can reset", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /اقرأ الحالة وابدأ النقاش/ }));
    fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
    fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
    fireEvent.click(screen.getAllByRole("button").find((button) => button.className.includes("var-choice")) as HTMLElement);
    expect(screen.getByText("قرار الحكم")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /الجولة التالية/ }));
    expect(screen.getByText("الحكم الحالي")).toBeTruthy();
    expect(screen.getByText("لاعب ٢")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /كل الألعاب/ }));
  });
});
