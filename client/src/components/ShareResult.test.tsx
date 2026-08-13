/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ShareResult from "./ShareResult";

afterEach(() => cleanup());

describe("ShareResult", () => {
  it("opens a score summary popup with winner and score details", () => {
    render(<ShareResult gameName="VAR و لا لأ؟" winnerName="كريم" winnerScore="850 نقطة" rows={[{ label: "كريم", score: "850" }, { label: "أحمد", score: "600" }]} />);
    fireEvent.click(screen.getByRole("button", { name: /شارك النتيجة/ }));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("VAR و لا لأ؟")).toBeTruthy();
    expect(screen.getByRole("img", { name: "شعار كورة كده" })).toBeTruthy();
    expect(screen.getAllByText("كريم").length).toBeGreaterThan(0);
    expect(screen.getByText("850 نقطة")).toBeTruthy();
    expect(screen.getByRole("button", { name: /^مشاركة$/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /حفظ الصورة/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /نسخ الرابط/ })).toBeTruthy();
  });

  it("supports closing the popup and copying the result link", async () => {
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<ShareResult gameName="أفتكر" winnerName="أنت" winnerScore="1000" rows={[{ label: "النقاط", score: "1000" }]} />);
    fireEvent.click(screen.getByRole("button", { name: /شارك النتيجة/ }));
    fireEvent.click(screen.getByRole("button", { name: /نسخ الرابط/ }));
    expect(writeText).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByText("تم النسخ")).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: "إغلاق نافذة المشاركة" }));
    expect(screen.queryByRole("dialog")).toBe(null);
  });
});
