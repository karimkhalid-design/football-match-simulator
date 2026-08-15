// @vitest-environment happy-dom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(() => {
  window.location.hash = "";
  window.localStorage.clear();
});

describe("App splash navigation", () => {
  it("moves from the splash screen to categories when skip is pressed", () => {
    window.location.hash = "";
    render(<App />);
    expect(screen.getByRole("main", { name: /جارٍ تحميل/ })).toBeTruthy();
    fireEvent.pointerUp(screen.getByRole("button", { name: "تخطي" }));
    expect(screen.queryByRole("main", { name: /جارٍ تحميل/ })).toBeNull();
    expect(screen.getByRole("heading", { name: /اللعب يبدأ/ })).toBeTruthy();
  });
});
