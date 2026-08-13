/** @vitest-environment happy-dom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import OnlineQuiz from "./OnlineQuiz";

const socketMock = { on: vi.fn(), emit: vi.fn(), disconnect: vi.fn() };
vi.mock("socket.io-client", () => ({ io: () => socketMock }));

afterEach(() => { document.body.innerHTML = ""; socketMock.on.mockReset(); vi.clearAllMocks(); });

describe("online quiz entry flow", () => {
  it("shows the real game identity and opens nickname entry", () => {
    render(<OnlineQuiz onBack={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "هتعرف تجاوب؟" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /اعمل لعبة/ }));
    expect(screen.getByRole("heading", { name: "اكتب اسمك" })).toBeTruthy();
  });

  it("shows the full bonus meter and the elimination aid for its owner", () => {
    socketMock.on.mockImplementation((event: string, handler: (state: any) => void) => {
      if (event === "room_state") handler({ status: "question", roomCode: "ABCDE", round: 2, totalRounds: 10, players: [{ nickname: "Karim", isYou: true, connected: true }, { nickname: "Ahmed", isYou: false, connected: true }], scores: [], settings: {}, question: { prompt: "من اللاعب؟", options: ["أ", "ب", "ج", "د"], category: "كرة القدم", difficulty: "صعب", startedAt: Date.now(), durationMs: 20000, eliminatedOptions: [1, 3] }, ownAnswer: null, bonus: { charge: 100, aidAvailable: true, eliminatedOptions: [1, 3] } });
    });
    render(<OnlineQuiz onBack={vi.fn()} />);
    expect(screen.getByText("100%")).toBeTruthy();
    expect(screen.getByRole("button", { name: /احذف إجابتين غلط/ })).toBeTruthy();
    expect(screen.getAllByText("اختيار محذوف")).toHaveLength(2);
  });

  it("opens room settings after a nickname is entered", () => {
    render(<OnlineQuiz onBack={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /اعمل لعبة/ }));
    fireEvent.change(screen.getByPlaceholderText("اكتب اسمك هنا"), { target: { value: "Karim" } });
    fireEvent.click(screen.getByRole("button", { name: /^دخول/ }));
    expect(screen.getByRole("heading", { name: "اختار التحدي" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /اعمل الغرفة/ })).toBeTruthy();
  });
});
