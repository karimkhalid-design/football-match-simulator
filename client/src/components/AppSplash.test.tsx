// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppSplash from "./AppSplash";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("AppSplash", () => {
  it("shows Kora Keda branding and exits after the short boot delay", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    expect(screen.getByRole("main", { name: /جارٍ تحميل كوره كده/ })).toBeTruthy();
    expect(screen.getByAltText("شعار كوره كده")).toBeTruthy();
    expect(screen.getByText("صناعة كريم")).toBeTruthy();
    expect(onDone).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(29999); });
    expect(onDone).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1); });
    expect(onDone).toHaveBeenCalledOnce();
  });
});
