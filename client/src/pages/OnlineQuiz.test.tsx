/** @vitest-environment happy-dom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import OnlineQuiz from "./OnlineQuiz";

const socketMock = { on: vi.fn(), emit: vi.fn(), disconnect: vi.fn() };
vi.mock("socket.io-client", () => ({ io: () => socketMock }));

afterEach(() => { document.body.innerHTML = ""; vi.clearAllMocks(); });

describe("online quiz entry flow", () => {
  it("shows the real game identity and opens nickname entry", () => {
    render(<OnlineQuiz onBack={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "هتعرف تجاوب؟" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /اعمل لعبة/ }));
    expect(screen.getByRole("heading", { name: "اكتب اسمك" })).toBeTruthy();
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
