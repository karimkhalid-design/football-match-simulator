// @vitest-environment happy-dom
import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppSplash, { isAppInstalled } from "./AppSplash";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("AppSplash", () => {
  it("shows Kora Keda branding and exits after the 30-second boot delay", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    expect(screen.getByRole("main", { name: /جارٍ تحميل كورة كده/ })).toBeTruthy();
    expect(screen.getByAltText("شعار كورة كده")).toBeTruthy();
    expect(screen.getByText("صناعة كريم")).toBeTruthy();
    expect(screen.getByRole("button", { name: "تخطي" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "طريقة تثبيت الموقع" })).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => { vi.advanceTimersByTime(900); });
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => { screen.getByRole("button", { name: "طريقة تثبيت الموقع" }).click(); });
    expect(screen.getByRole("dialog", { name: "ثبّت كورة كده على جهازك" })).toBeTruthy();
    expect(screen.getAllByText(/إضافة إلى الشاشة الرئيسية/)).toHaveLength(2);
    act(() => { screen.getByRole("button", { name: "إغلاق طريقة التثبيت" }).click(); });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onDone).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(29099); });
    expect(onDone).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1); });
    expect(onDone).toHaveBeenCalledOnce();
  });

  it("opens and closes the installation guide manually", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    act(() => { screen.getByRole("button", { name: "طريقة تثبيت الموقع" }).click(); });
    expect(screen.getByRole("dialog", { name: "ثبّت كورة كده على جهازك" })).toBeTruthy();
    act(() => { screen.getByRole("button", { name: "تمام، فهمت" }).click(); });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("supports direct PWA installation and remembers the dismissal choice", async () => {
    vi.useFakeTimers();
    window.localStorage.clear();
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    const installEvent = new Event("beforeinstallprompt");
    const prompt = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(installEvent, "prompt", { value: prompt });
    Object.defineProperty(installEvent, "userChoice", { value: Promise.resolve({ outcome: "accepted" }) });
    window.dispatchEvent(installEvent);
    act(() => { screen.getByRole("button", { name: "طريقة تثبيت الموقع" }).click(); });
    expect(screen.getByRole("button", { name: "تثبيت التطبيق الآن" })).toBeTruthy();
    await act(async () => { screen.getByRole("button", { name: "تثبيت التطبيق الآن" }).click(); await Promise.resolve(); });
    expect(prompt).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => { screen.getByRole("button", { name: "طريقة تثبيت الموقع" }).click(); });
    act(() => { screen.getByRole("checkbox", { name: "عدم إظهار هذه الرسالة مرة أخرى" }).click(); });
    expect(window.localStorage.getItem("kora-keda-pwa-guide-dismissed")).toBe("1");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("hides direct install controls when already running as an installed app", () => {
    vi.useFakeTimers();
    window.localStorage.clear();
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", { configurable: true, value: vi.fn(() => ({ matches: true, media: "(display-mode: standalone)", onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) });
    expect(isAppInstalled()).toBe(true);
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    act(() => { screen.getByRole("button", { name: "طريقة تثبيت الموقع" }).click(); });
    expect(screen.queryByRole("button", { name: "تثبيت التطبيق الآن" })).toBeNull();
    Object.defineProperty(window, "matchMedia", { configurable: true, value: originalMatchMedia });
  });

  it("lets the user skip the loading screen immediately", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<AppSplash onDone={onDone} />);
    act(() => { screen.getByRole("button", { name: "تخطي" }).click(); });
    expect(onDone).toHaveBeenCalledOnce();
  });
});
