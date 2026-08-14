// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import KhaleekWasthom from "./KhaleekWasthom";
import { KHALEEK_CATEGORIES, SECRET_ITEMS } from "../lib/khaleekWasthomData";

afterEach(() => cleanup());

describe("خليك وسطهم", () => {
  it("exposes a one-phone local game with 3 to 10 players and the correct sections", () => {
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    expect(screen.getByRole("heading", { name: /خليك/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    expect(screen.getByRole("button", { name: /10/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /7/ }));
    fireEvent.click(screen.getByRole("button", { name: /التالي/ }));
    expect(screen.getAllByRole("textbox")).toHaveLength(7);
    fireEvent.click(screen.getByRole("button", { name: /اختيار الأقسام/ }));
    expect(screen.getByText("مدربين")).toBeTruthy();
    expect(screen.getByText("استادات")).toBeTruthy();
    expect(screen.getByText("منتخبات")).toBeTruthy();
  });

  it("keeps category selection and item libraries consistent", () => {
    expect(KHALEEK_CATEGORIES).toHaveLength(6);
    expect(KHALEEK_CATEGORIES.every((category) => SECRET_ITEMS[category.id].length > 0)).toBe(true);
  });

  it("requires a selected category and begins private role distribution", () => {
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    fireEvent.click(screen.getByRole("button", { name: /التالي/ }));
    fireEvent.click(screen.getByRole("button", { name: /اختيار الأقسام/ }));
    fireEvent.click(screen.getByRole("button", { name: /مدربين/ }));
    fireEvent.click(screen.getByRole("button", { name: /ابدأ توزيع الأدوار/ }));
    expect(screen.getByText(/مرر الهاتف إلى/)).toBeTruthy();
    expect(screen.getByText(/اللاعب 1 من 5/)).toBeTruthy();
  });

  it("moves through private reveals, discussion, secret voting, and final result", () => {
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    fireEvent.click(screen.getByRole("button", { name: /التالي/ }));
    fireEvent.click(screen.getByRole("button", { name: /اختيار الأقسام/ }));
    fireEvent.click(screen.getByRole("button", { name: /ابدأ توزيع الأدوار/ }));
    fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
    fireEvent.click(screen.getByRole("button", { name: /تم|ابدأ الأسئلة/ }));
    for (let index = 1; index < 5; index += 1) {
      fireEvent.click(screen.getByRole("button", { name: /تم|ابدأ الأسئلة/ }));
    }
    expect(screen.getByRole("heading", { name: /مين مش عارف السر/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /ابدأ التصويت/ }));
    for (let index = 0; index < 5; index += 1) {
      if (screen.queryByRole("button", { name: /أنا جاهز/ })) fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
      const voteButton = screen.getAllByRole("button").find((button) => !button.className.includes("disabled") && button.querySelector("strong"));
      fireEvent.click(voteButton as HTMLElement);
    }
    expect(screen.getByText(/النتيجة|فرصة العميل الأخيرة/)).toBeTruthy();
  });
});
