/** @vitest-environment happy-dom */
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import VarGame from "./VarGame";
import { varRounds } from "../lib/varData";

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

  it("loads a real controversial clip and hides the verified decision until reveal", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    expect(screen.getByText("هدف لويس دياز الملغي")).toBeTruthy();
    expect(document.querySelector(".var-embed")).toBeTruthy();
    expect(screen.queryByText(/القرار الصحيح/)).toBe(null);
    expect(screen.queryByText(/قرار الحكم الأصلي/)).toBe(null);
    expect(screen.queryByRole("link", { name: /Sky Sports/ })).toBe(null);
    fireEvent.click(screen.getByRole("button", { name: /شاهد اللقطة/ }));
    fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
    fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
    fireEvent.click(screen.getByRole("button", { name: "هدف" }));
    expect(screen.getByText(/القرار الصحيح: هدف/)).toBeTruthy();
    expect(screen.getAllByText(/قرار الحكم الأصلي/).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Sky Sports/ })).toBeTruthy();
  });

  it("keeps the VAR session free of repeated incident ids", () => {
    const ids = varRounds.map((round) => round.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(varRounds.filter((round) => round.isReal).length).toBeGreaterThan(1);
  });

  it("keeps critical gameplay controls available at 375px", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 });
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /شاهد اللقطة/ }));
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
    expect(screen.getByText("شوف اللقطة… خد قرارك")).toBeTruthy();
    expect(screen.getByRole("button", { name: "10" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  it("starts a round, shows the discussion timer, and records spoken-player predictions", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /شاهد اللقطة/ }));
    expect(screen.getByText("اتناقشوا… إيه قراركم؟")).toBeTruthy();
    expect(screen.getByText("60")).toBeTruthy();
    const option = screen.getAllByRole("button", { name: "هدف" })[0];
    fireEvent.click(option);
    expect(option.className).toContain("selected");
    expect(screen.getByRole("button", { name: /افتح الـVAR/ })).toBeTruthy();
  });

  it("moves automatically to VAR review when the 60-second discussion timer ends", () => {
    vi.useFakeTimers();
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /شاهد اللقطة/ }));
    expect(screen.getByText("60")).toBeTruthy();
    act(() => { vi.advanceTimersByTime(60000); });
    expect(screen.getByText("VAR CHECKING...")).toBeTruthy();
    vi.useRealTimers();
  });

  it("opens the VAR and reveals four decision buttons", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    fireEvent.click(screen.getByRole("button", { name: /شاهد اللقطة/ }));
    fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
    expect(screen.getByText("VAR CHECKING...")).toBeTruthy();
    expect(screen.getByRole("button", { name: "انتقل للقرار" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
    expect(screen.getByRole("button", { name: "هدف" })).toBeTruthy();
  });

  it("completes all ten rounds and restarts from the final ranking", () => {
    render(<VarGame onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: "ابدأ اللعبة" }));
    for (let index = 0; index < 10; index += 1) {
      fireEvent.click(screen.getByRole("button", { name: /شاهد اللقطة/ }));
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
    fireEvent.click(screen.getByRole("button", { name: /شاهد اللقطة/ }));
    fireEvent.click(screen.getByRole("button", { name: /افتح الـVAR/ }));
    fireEvent.click(screen.getByRole("button", { name: "انتقل للقرار" }));
    fireEvent.click(screen.getByRole("button", { name: "ضربة جزاء" }));
    expect(screen.getByText("قرار الحكم")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /الجولة التالية/ }));
    expect(screen.getByText("الحكم الحالي")).toBeTruthy();
    expect(screen.getByText("لاعب ٢")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /كل الألعاب/ }));
  });
});
