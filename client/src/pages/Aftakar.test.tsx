/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Aftakar from "./Aftakar";

describe("Aftakar game", () => {
  afterEach(() => cleanup());
  it("reveals extra clues and scores a correct answer", async () => {
    const user = userEvent.setup();
    render(<Aftakar onBackToHub={() => undefined} />);

    expect(screen.getByText("مين اللاعب؟")).toBeTruthy();
    expect(screen.getByText("أسطورة أرجنتينية حملت كأس العالم")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /تلميح إضافي/ }));
    expect(screen.getByText("لعب أغلب مسيرته مع برشلونة")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Lionel Messi" }));
    expect(screen.getByText("إجابة صحيحة! +700 نقطة")).toBeTruthy();
    expect(screen.getByAltText("Lionel Messi")).toBeTruthy();
    expect(screen.getByText("الجولة التالية")).toBeTruthy();
  });

  it("accepts a typed answer", async () => {
    const user = userEvent.setup();
    render(<Aftakar onBackToHub={() => undefined} />);

    await user.type(screen.getByLabelText("اكتب اسم اللاعب"), "lionel messi");
    await user.click(screen.getByRole("button", { name: "تخمين" }));
    expect(screen.getByText("إجابة صحيحة! +1000 نقطة")).toBeTruthy();
  });

  it("shows the correct answer after a wrong choice and returns to the hub", async () => {
    const user = userEvent.setup();
    const onBackToHub = vi.fn();
    render(<Aftakar onBackToHub={onBackToHub} />);

    await user.click(screen.getByRole("button", { name: "Mohamed Salah" }));
    expect(screen.getByText("الإجابة الصحيحة هي Lionel Messi.")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "كل الألعاب" }));
    expect(onBackToHub).toHaveBeenCalledOnce();
  });

  it("completes all rounds and can restart from the final score", async () => {
    const user = userEvent.setup();
    render(<Aftakar onBackToHub={() => undefined} />);
    const answers = ["Lionel Messi", "Cristiano Ronaldo", "Mohamed Salah", "Zinedine Zidane", "Erling Haaland"];

    for (let index = 0; index < answers.length; index += 1) {
      await user.type(screen.getByLabelText("اكتب اسم اللاعب"), answers[index]);
      await user.click(screen.getByRole("button", { name: "تخمين" }));
      await user.click(screen.getByRole("button", { name: index === answers.length - 1 ? "النتيجة" : "الجولة التالية" }));
    }

    expect(screen.getByText("انتهت اللعبة")).toBeTruthy();
    expect(screen.getByText("مجموع النقاط")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "العب من جديد" }));
    expect(screen.getByText("أسطورة أرجنتينية حملت كأس العالم")).toBeTruthy();
    expect(screen.getByLabelText("اكتب اسم اللاعب").getAttribute("value")).toBe("");
  });
});
