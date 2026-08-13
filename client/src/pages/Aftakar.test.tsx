/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Aftakar from "./Aftakar";
import { buildAftakarSession } from "../lib/aftakarData";

describe("Aftakar game", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("reveals extra clues and scores a correct answer", async () => {
    const user = userEvent.setup();
    vi.spyOn(Date, "now").mockReturnValue(2026000);
    render(<Aftakar onBackToHub={() => undefined} />);
    const firstQuestion = buildAftakarSession(2026000 + 997)[0];

    expect(screen.getByText("مين اللاعب؟")).toBeTruthy();
    expect(screen.getByText(firstQuestion.clues[0])).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /تلميح إضافي/ }));
    expect(screen.getByText(firstQuestion.clues[1])).toBeTruthy();

    await user.click(screen.getByRole("button", { name: firstQuestion.playerName }));
    expect(screen.getByText("إجابة صحيحة! +700 نقطة")).toBeTruthy();
    expect(screen.getByAltText(firstQuestion.playerName)).toBeTruthy();
    expect(screen.getByText("الجولة التالية")).toBeTruthy();
  });

  it("accepts a typed answer", async () => {
    const user = userEvent.setup();
    vi.spyOn(Date, "now").mockReturnValue(2027000);
    render(<Aftakar onBackToHub={() => undefined} />);
    const firstQuestion = buildAftakarSession(2027000 + 2 * 997)[0];

    await user.type(screen.getByLabelText("اكتب اسم اللاعب"), firstQuestion.playerName);
    await user.click(screen.getByRole("button", { name: "تخمين" }));
    expect(screen.getByText("إجابة صحيحة! +1000 نقطة")).toBeTruthy();
  });

  it("shows the correct answer after a wrong choice and returns to the hub", async () => {
    const user = userEvent.setup();
    const onBackToHub = vi.fn();
    vi.spyOn(Date, "now").mockReturnValue(2028000);
    render(<Aftakar onBackToHub={onBackToHub} />);
    const firstQuestion = buildAftakarSession(2028000 + 3 * 997)[0];

    const wrongOption = firstQuestion.options.find((option) => option !== firstQuestion.playerName)!;
    await user.click(screen.getByRole("button", { name: wrongOption }));
    expect(screen.getByText(`الإجابة الصحيحة هي ${firstQuestion.playerName}.`)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "كل الألعاب" }));
    expect(onBackToHub).toHaveBeenCalledOnce();
  });

  it("completes all rounds and can restart with a different fresh session", async () => {
    const user = userEvent.setup();
    let now = 2029000;
    vi.spyOn(Date, "now").mockImplementation(() => now);
    render(<Aftakar onBackToHub={() => undefined} />);
    const answers = buildAftakarSession(now + 4 * 997).map((question) => question.playerName);

    for (let index = 0; index < answers.length; index += 1) {
      await user.type(screen.getByLabelText("اكتب اسم اللاعب"), answers[index]);
      await user.click(screen.getByRole("button", { name: "تخمين" }));
      await user.click(screen.getByRole("button", { name: index === answers.length - 1 ? "النتيجة" : "الجولة التالية" }));
    }

    expect(screen.getByText("انتهت اللعبة")).toBeTruthy();
    expect(screen.getByText("مجموع النقاط")).toBeTruthy();
    now = 2030000;
    await user.click(screen.getByRole("button", { name: "العب من جديد" }));
    const restarted = buildAftakarSession(now + 5 * 997)[0];
    expect(screen.getByText(restarted.clues[0])).toBeTruthy();
    expect(screen.getByLabelText("اكتب اسم اللاعب").getAttribute("value")).toBe("");
  });
});
