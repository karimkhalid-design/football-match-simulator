/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PlayerLibrary from "./PlayerLibrary";

afterEach(cleanup);

describe("player library page", () => {
  it("shows searchable player cards and opens a player profile drawer", () => {
    render(<PlayerLibrary onBack={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "مكتبة اللاعبين" })).toBeTruthy();
    expect(screen.getByText(/لاعب في الكتالوج/)).toBeTruthy();
    fireEvent.change(screen.getByRole("textbox", { name: "ابحث عن لاعب" }), { target: { value: "محمد صلاح" } });
    expect(screen.getByRole("button", { name: /محمد صلاح/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /محمد صلاح/ }));
    expect(screen.getByRole("dialog", { name: /ملف محمد صلاح/ })).toBeTruthy();
  });
});
