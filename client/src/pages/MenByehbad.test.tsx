// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MenByehbad from "./MenByehbad";

afterEach(() => { cleanup(); vi.useRealTimers(); });

const testNames = ["لاعب أ", "لاعب ب", "لاعب ج"];

function startRound() {
  fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعبة/ }));
  fireEvent.click(screen.getByRole("button", { name: /فهمت، ابدأ الجولة/ }));
  fireEvent.click(screen.getByRole("button", { name: /خلصنا النقاش/ }));
}

describe("مين بيهبد؟", () => {
  it("renders mobile-first setup with 3 to 10 dynamic players", () => {
    render(<MenByehbad onBackToHub={() => undefined} />);
    expect(document.title).toBe("مين بيهبد؟");
    expect(screen.getByRole("heading", { name: /مين بيهبد/ })).toBeTruthy();
    expect(screen.getByText("3 / 10 لاعبين")).toBeTruthy();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    fireEvent.change(screen.getAllByRole("textbox")[0], { target: { value: "كريم" } });
    fireEvent.click(screen.getByRole("button", { name: /إضافة لاعب/ }));
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("requires complete unique names before starting", () => {
    render(<MenByehbad onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعبة/ }));
    expect(screen.getByText(/اكتب أسماء كل اللاعبين/)).toBeTruthy();
    cleanup();
    render(<MenByehbad onBackToHub={() => undefined} initialNames={["لاعب أ", "لاعب أ", "لاعب ج"]} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعبة/ }));
    expect(screen.getByText(/اسم مختلف/)).toBeTruthy();
  });

  it("keeps each answer private while moving the phone between players", () => {
    render(<MenByehbad onBackToHub={() => undefined} initialNames={testNames} />);
    startRound();
    expect(screen.getByRole("heading", { name: /دور لاعب أ/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /حقيقة/ }));
    expect(screen.getByRole("heading", { name: /دور لاعب ب/ })).toBeTruthy();
    expect(screen.queryByText("حقيقة", { selector: ".menbyehbad-secret small" })).toBe(null);
    fireEvent.click(screen.getByRole("button", { name: /هبد/ }));
    fireEvent.click(screen.getByRole("button", { name: /حقيقة/ }));
    expect(screen.getByRole("button", { name: /اكشف الحقيقة/ })).toBeTruthy();
  });

  it("scores a round and completes the ten-round game", () => {
    vi.useFakeTimers();
    render(<MenByehbad onBackToHub={() => undefined} initialNames={testNames} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعبة/ }));
    fireEvent.click(screen.getByRole("button", { name: /فهمت، ابدأ الجولة/ }));
    for (let round = 0; round < 10; round += 1) {
      fireEvent.click(screen.getByRole("button", { name: /خلصنا النقاش/ }));
      fireEvent.click(screen.getByRole("button", { name: /حقيقة/ }));
      fireEvent.click(screen.getByRole("button", { name: /هبد/ }));
      fireEvent.click(screen.getByRole("button", { name: /حقيقة/ }));
      fireEvent.click(screen.getByRole("button", { name: /اكشف الحقيقة/ }));
      act(() => { vi.advanceTimersByTime(800); });
      expect(screen.getByText("الحقيقة ظهرت")).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: round === 9 ? /النتيجة النهائية/ : /الجولة الجاية/ }));
      if (round < 9) fireEvent.click(screen.getByRole("button", { name: /فهمت، ابدأ الجولة/ }));
    }
    expect(screen.getByText("انتهت اللعبة")).toBeTruthy();
    expect(screen.getByText(/كاشف الهبد/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /لعبة جديدة/ }));
    expect(screen.getByRole("button", { name: /ابدأ اللعبة/ })).toBeTruthy();
  });
});
