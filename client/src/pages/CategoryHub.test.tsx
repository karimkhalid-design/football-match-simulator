/** @vitest-environment happy-dom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryHub from "./CategoryHub";
import SoloGames from "./SoloGames";

describe("category hub", () => {
  it("shows the three branded categories and routes the active cards", () => {
    const onSelectGroup = vi.fn();
    const onSelectSolo = vi.fn();
    render(<CategoryHub onSelectGroup={onSelectGroup} onSelectSolo={onSelectSolo} />);
    expect(screen.getByRole("heading", { name: "ألعاب جماعية" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "ألعاب فردية" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "العب أونلاين" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "شعار الألعاب الجماعية" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "شعار الألعاب الفردية" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "شعار العب أونلاين" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /ادخل الألعاب/ }));
    fireEvent.click(screen.getByRole("button", { name: /استكشف القسم/ }));
    expect(onSelectGroup).toHaveBeenCalledOnce();
    expect(onSelectSolo).toHaveBeenCalledOnce();
    expect(screen.getAllByText("قريباً").length).toBeGreaterThan(0);
  });

  it("does not make online play an interactive button", () => {
    render(<CategoryHub onSelectGroup={vi.fn()} onSelectSolo={vi.fn()} />);
    const onlineCard = document.querySelector(".category-card-online");
    expect(onlineCard).toBeTruthy();
    expect(onlineCard?.tagName).toBe("DIV");
  });
});

describe("solo games page", () => {
  it("shows the future-games message and back action", () => {
    const onBack = vi.fn();
    render(<SoloGames onBack={onBack} />);
    expect(screen.getByRole("heading", { name: /اللعب لوحدك/ })).toBeTruthy();
    expect(screen.getByText("أول لعبة فردية قريباً")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /التصنيفات/ }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
