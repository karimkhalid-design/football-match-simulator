// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import KhaleekWasthom, { chooseAgentIndices, resolveAgentVotes, shufflePlayers } from "./KhaleekWasthom";
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

  it("shuffles player order between games without losing names", () => {
    const players = ["كريم", "أحمد", "محمد", "يوسف", "عمر"];
    const firstOrder = shufflePlayers(players, () => 0.1);
    const secondOrder = shufflePlayers(players, () => 0.9);
    expect(firstOrder).not.toEqual(players);
    expect(secondOrder).not.toEqual(firstOrder);
    expect([...firstOrder].sort()).toEqual([...players].sort());
    expect([...secondOrder].sort()).toEqual([...players].sort());
  });

  it("keeps category selection and item libraries consistent", () => {
    expect(KHALEEK_CATEGORIES).toHaveLength(6);
    expect(KHALEEK_CATEGORIES.every((category) => SECRET_ITEMS[category.id].length > 0)).toBe(true);
  });

  it("provides a larger unique football-player library", () => {
    const players = SECRET_ITEMS.players;
    expect(players.length).toBeGreaterThanOrEqual(30);
    expect(new Set(players.map((player) => player.id)).size).toBe(players.length);
    expect(new Set(players.map((player) => player.difficulty)).size).toBe(3);
  });

  it("keeps agent count proportional and agent positions unique", () => {
    expect(chooseAgentIndices(3, 1, () => 0)).toEqual([0]);
    const agents = chooseAgentIndices(9, 3, () => 0);
    expect(agents).toHaveLength(3);
    expect(new Set(agents).size).toBe(3);
    expect(agents.every((index) => index >= 0 && index < 9)).toBe(true);
  });

  it("resolves multiple agent votes and preserves hidden agents", () => {
    const result = resolveAgentVotes([1, 4, 6], [[1, 4], [1, 2], [4, 3], [1, 4]], 3);
    expect(result.rankedTargets).toEqual([1, 4, 2]);
    expect(result.foundAgents).toEqual([1, 4]);
    expect(result.hiddenAgents).toEqual([6]);
  });

  it("shows the compatible agent-count choices for a larger group", () => {
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    fireEvent.click(screen.getByRole("button", { name: /9/ }));
    expect(screen.getByText("عدد العملاء السريين")).toBeTruthy();
    expect(screen.getByRole("button", { name: /3\s*عملاء/ })).toBeTruthy();
  });

  it("offers the plus mode without revealing the agent role", () => {
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب/ }));
    expect(screen.getByRole("button", { name: /خليك وسطهم \+/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /خليك وسطهم \+/ }));
    expect(screen.getByText("هنا المتعة كلها")).toBeTruthy();
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
    expect(screen.getByRole("heading", { name: /العملاء عرفوا السر وكسبوا/ })).toBeTruthy();
    randomSpy.mockRestore();
  });

  it("keeps a cumulative leaderboard for unchanged names and exposes score sharing", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
    const playRound = () => {
      fireEvent.click(screen.getByRole("button", { name: /ابدأ اللعب|جولة جديدة/ }));
      if (screen.queryByRole("button", { name: /10/ })) fireEvent.click(screen.getByRole("button", { name: /التالي/ }));
      if (screen.queryByRole("button", { name: /اختيار الأقسام/ })) fireEvent.click(screen.getByRole("button", { name: /اختيار الأقسام/ }));
      if (screen.queryByRole("button", { name: /ابدأ توزيع الأدوار/ })) fireEvent.click(screen.getByRole("button", { name: /ابدأ توزيع الأدوار/ }));
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
      const guessInput = screen.queryByLabelText("اكتب تخمينك");
      if (guessInput) {
        fireEvent.change(guessInput, { target: { value: SECRET_ITEMS.players[0].name } });
        fireEvent.click(screen.getByRole("button", { name: /تأكيد التخمين/ }));
      }
    };
    render(<KhaleekWasthom onBackToHub={() => undefined} />);
    playRound();
    expect(screen.getByText("الترتيب المستمر")).toBeTruthy();
    expect(screen.getByRole("button", { name: /شارك السكور/ })).toBeTruthy();
    expect(screen.getAllByText("100 نقطة").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: /جولة جديدة/ }));
    playRound();
    expect(screen.getAllByText("200 نقطة").length).toBeGreaterThan(0);
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
    expect(screen.getByText(/النتيجة|فرصة العملاء الأخيرة/)).toBeTruthy();
  });
});
