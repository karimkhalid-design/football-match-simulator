// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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

  it("hides the previous role while handing the phone to the named next player", () => {
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    fireEvent.click(screen.getByRole("button", { name: /التالي/ }));
    fireEvent.click(screen.getByRole("button", { name: /اختيار الأقسام/ }));
    fireEvent.click(screen.getByRole("button", { name: /ابدأ توزيع الأدوار/ }));
    fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
    fireEvent.click(screen.getByRole("button", { name: /تم · مرر الهاتف/ }));
    expect(screen.getByText(/مرر الهاتف الآن إلى/)).toBeTruthy();
    expect(screen.queryByText(/العنصر السري هو/)).toBeNull();
    expect(screen.queryByText(/أنت العميل السري/)).toBeNull();
    expect(screen.getByRole("button", { name: /تم تسليم الهاتف/ })).toBeTruthy();
  });

  it("lets the discovered agent type the secret and win with a correct guess", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    fireEvent.click(screen.getByRole("button", { name: /التالي/ }));
    fireEvent.click(screen.getByRole("button", { name: /اختيار الأقسام/ }));
    fireEvent.click(screen.getByRole("button", { name: /ابدأ توزيع الأدوار/ }));
    fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
    fireEvent.click(screen.getByRole("button", { name: /تم · مرر الهاتف/ }));
    for (let index = 1; index < 5; index += 1) {
      fireEvent.click(screen.getByRole("button", { name: /تم تسليم الهاتف/ }));
      fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
      fireEvent.click(screen.getByRole("button", { name: /تم · مرر الهاتف|ابدأ الأسئلة/ }));
    }
    fireEvent.click(screen.getByRole("button", { name: /ابدأ التصويت/ }));
    for (let index = 0; index < 5; index += 1) {
      if (screen.queryByRole("button", { name: /أنا جاهز/ })) fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
      const buttons = screen.getAllByRole("button").filter((button) => !button.className.includes("disabled") && button.querySelector("strong"));
      fireEvent.click(buttons[0]);
    }
    const guessInput = screen.getByLabelText("اكتب تخمينك");
    fireEvent.change(guessInput, { target: { value: SECRET_ITEMS.players[0].name } });
    fireEvent.click(screen.getByRole("button", { name: /تأكيد التخمين/ }));
    expect(screen.getByRole("heading", { name: /العميل عرف السر وكسب/ })).toBeTruthy();
    randomSpy.mockRestore();
  });

  it("moves through private reveals, discussion, secret voting, and final result", () => {
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    fireEvent.click(screen.getByRole("button", { name: /التالي/ }));
    fireEvent.click(screen.getByRole("button", { name: /اختيار الأقسام/ }));
    fireEvent.click(screen.getByRole("button", { name: /ابدأ توزيع الأدوار/ }));
    fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
    fireEvent.click(screen.getByRole("button", { name: /تم · مرر الهاتف/ }));
    for (let index = 1; index < 5; index += 1) {
      expect(screen.getByText(/مرر الهاتف الآن إلى/)).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: /تم تسليم الهاتف/ }));
      fireEvent.click(screen.getByRole("button", { name: /أنا جاهز/ }));
      fireEvent.click(screen.getByRole("button", { name: /تم · مرر الهاتف|ابدأ الأسئلة/ }));
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
