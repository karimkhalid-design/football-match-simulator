/** @vitest-environment happy-dom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import OnlineQuiz from "./OnlineQuiz";

const socketMock = { on: vi.fn(), emit: vi.fn(), disconnect: vi.fn() };
const authMock = vi.hoisted(() => ({ user: null as any, loading: false, isAuthenticated: false, logout: vi.fn(), setUsername: vi.fn().mockResolvedValue({}), settingUsername: false }));
vi.mock("socket.io-client", () => ({ io: () => socketMock }));
vi.mock("../_core/hooks/useAuth", () => ({ useAuth: () => authMock }));

afterEach(() => { document.body.innerHTML = ""; sessionStorage.clear(); socketMock.on.mockReset(); authMock.user = null; authMock.loading = false; authMock.isAuthenticated = false; authMock.settingUsername = false; authMock.setUsername.mockReset().mockResolvedValue({}); vi.clearAllMocks(); });

describe("online quiz entry flow", () => {
  it("shows the real game identity and opens nickname entry", () => {
    render(<OnlineQuiz onBack={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "هتعرف تجاوب؟" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /اعمل لعبة/ }));
    expect(screen.getByRole("heading", { name: "سجّل دخولك" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Google/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Apple/ })).toBeTruthy();
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

  it("requires a permanent username after first authentication", () => {
    authMock.user = { name: "Karim" };
    authMock.isAuthenticated = true;
    sessionStorage.setItem("kora-online-auth-intent", "create");
    render(<OnlineQuiz onBack={vi.fn()} />);
    expect(screen.getByRole("heading", { name: /اختار Username ثابت/ })).toBeTruthy();
    fireEvent.change(screen.getByPlaceholderText("مثال: karim_10"), { target: { value: "karim_10" } });
    fireEvent.click(screen.getByRole("button", { name: /حفظ Username/ }));
    expect(authMock.setUsername).toHaveBeenCalledWith({ username: "karim_10" });
  });

  it("opens room settings with the account name after authentication", () => {
    authMock.user = { name: "Karim", username: "karim_10" };
    authMock.isAuthenticated = true;
    render(<OnlineQuiz onBack={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /اعمل لعبة/ }));
    expect(screen.getByRole("heading", { name: "اختار التحدي" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /اعمل الغرفة/ })).toBeTruthy();
  });
});
