/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "./LanguageContext";

afterEach(() => cleanup());
beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.dir = "rtl";
  document.documentElement.lang = "ar";
});

function LanguageProbe() {
  const { language, toggleLanguage } = useLanguage();
  return <button type="button" onClick={toggleLanguage}>{language}</button>;
}

describe("LanguageProvider", () => {
  it("switches direction and persists the selected language", () => {
    render(<LanguageProvider><LanguageProbe /></LanguageProvider>);
    expect(screen.getByRole("button").textContent).toBe("ar");

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button").textContent).toBe("en");
    expect(document.documentElement.dir).toBe("ltr");
    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("kora-keda-language")).toBe("en");
  });

  it("restores English after a new provider is mounted", () => {
    window.localStorage.setItem("kora-keda-language", "en");
    render(<LanguageProvider><LanguageProbe /></LanguageProvider>);
    expect(screen.getByRole("button").textContent).toBe("en");
  });
});
