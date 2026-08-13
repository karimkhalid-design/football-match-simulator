/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(cleanup);
import RoadGame from "./RoadGame";
import { getRoadPlayerForDay } from "../lib/roadGameData";

vi.mock("../components/ShareResult", () => ({ default: () => <button type="button">مشاركة النتيجة</button> }));

describe("RoadGame", () => {
  it("starts a round and exposes the hint, score, timeline, and guess controls", () => {
    render(<RoadGame onBack={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    expect(screen.getByRole("heading", { name: /مين اللاعب/ })).toBeTruthy();
    expect(screen.getByText(/رصيدك الحالي/)).toBeTruthy();
    expect(document.querySelector(".road-hint-card")).toBeTruthy();
    expect(screen.getByRole("button", { name: "خمن" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /كشف التالي/ })).toBeTruthy();
  });

  it("reduces the score when a hint is revealed and keeps wrong guesses in the round", () => {
    render(<RoadGame onBack={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    expect(Number(document.querySelector(".road-potential b")?.textContent)).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: /كشف التالي/ }));
    const afterHintScore = Number(document.querySelector(".road-potential b")?.textContent);
    expect(afterHintScore).toBeGreaterThan(0);
    fireEvent.change(document.getElementById("road-guess")!, { target: { value: "لاعب غير صحيح" } });
    fireEvent.click(screen.getByRole("button", { name: "خمن" }));
    expect(screen.getByText(/مش هو/)).toBeTruthy();
  });

  it("accepts the daily player's Arabic name and shows the result actions", () => {
    render(<RoadGame onBack={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /لاعب اليوم/ }));
    const dailyPlayer = getRoadPlayerForDay();
    fireEvent.change(document.getElementById("road-guess")!, { target: { value: dailyPlayer.arabicName } });
    fireEvent.click(screen.getByRole("button", { name: "خمن" }));
    expect(screen.getByText(/عرفت اللاعب/)).toBeTruthy();
    expect(screen.getByText(dailyPlayer.arabicName)).toBeTruthy();
    expect(screen.getByRole("button", { name: /مشاركة النتيجة/ })).toBeTruthy();
  });
});
