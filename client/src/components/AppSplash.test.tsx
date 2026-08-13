// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppSplash from "./AppSplash";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("AppSplash", () => {
  it("shows Kora Keda branding and exits after the 30-second boot delay", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    expect(screen.getByRole("main", { name: /جارٍ تحميل كوره كده/ })).toBeTruthy();
    expect(screen.getByAltText("شعار كوره كده")).toBeTruthy();
    expect(screen.getByText("صناعة كريم")).toBeTruthy();
    expect(screen.getByRole("button", { name: "تخطي" })).toBeTruthy();
    expect(onDone).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(29999); });
    expect(onDone).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1); });
    expect(onDone).toHaveBeenCalledOnce();
  });

  it("lets the user skip the loading screen immediately", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    act(() => { screen.getByRole("button", { name: "تخطي" }).click(); });
    expect(onDone).toHaveBeenCalledOnce();
  });
});
