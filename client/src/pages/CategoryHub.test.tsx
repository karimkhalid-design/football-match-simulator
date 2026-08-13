/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => cleanup());
import CategoryHub from "./CategoryHub";
import SoloGames from "./SoloGames";

describe("category hub", () => {
  it("shows the three branded categories and routes the active cards", () => {
    const onSelectGroup = vi.fn();
    const onSelectSolo = vi.fn();
    const onSelectLibrary = vi.fn();
    const onSelectOnline = vi.fn();
    render(<CategoryHub onSelectGroup={onSelectGroup} onSelectSolo={onSelectSolo} onSelectLibrary={onSelectLibrary} onSelectOnline={onSelectOnline} />);
    expect(screen.getByRole("heading", { name: "ألعاب جماعية" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "ألعاب فردية" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "هتعرف تجاوب؟" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "شعار الألعاب الجماعية" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "شعار الألعاب الفردية" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "شعار هتعرف تجاوب؟" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /ادخل الألعاب/ }));
    fireEvent.click(screen.getByRole("button", { name: /استكشف القسم/ }));
    expect(onSelectGroup).toHaveBeenCalledOnce();
    expect(onSelectSolo).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: /اعمل تحدي/ }));
    expect(onSelectOnline).toHaveBeenCalledOnce();
  });

  it("routes the online category to the first real multiplayer game", () => {
    const onSelectOnline = vi.fn();
    render(<CategoryHub onSelectGroup={vi.fn()} onSelectSolo={vi.fn()} onSelectLibrary={vi.fn()} onSelectOnline={onSelectOnline} />);
    fireEvent.click(screen.getByRole("button", { name: /اعمل تحدي/ }));
    expect(onSelectOnline).toHaveBeenCalledOnce();
    expect(screen.getByRole("heading", { name: "هتعرف تجاوب؟" })).toBeTruthy();
  });
});

describe("solo games page", () => {
  it("shows the future-games message and back action", () => {
    const onBack = vi.fn();
    const onSelectRoad = vi.fn();
    render(<SoloGames onBack={onBack} onSelectRoad={onSelectRoad} />);
    expect(screen.getByRole("heading", { name: /اللعب لوحدك/ })).toBeTruthy();
    expect(screen.getByText("قسم جديد · ألعاب تتطور معك")).toBeTruthy();
    expect(screen.getByAltText("شعار الطريق ما يتوهش")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /الطريق ما يتوهش/ }));
    expect(onSelectRoad).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: /التصنيفات/ }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
