/** @vitest-environment happy-dom */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

afterEach(() => cleanup());
import Home from "./Home";

describe("auction setup and total bid price control", () => {
  it("selects an auction section before starting and carries it into the auction", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const leagueButton = screen.getByRole("button", { name: /الدوري الإنجليزي/ });
    await user.click(leagueButton);
    expect(screen.getByText(/القسم المختار:/).textContent).toContain("الدوري الإنجليزي");
    await user.click(screen.getByRole("button", { name: "ابدأ المزاد الآن" }));
    expect(screen.getByText(/كتالوج اللعبة/).textContent).toContain("القسم:");
    expect(screen.getByText(/كتالوج اللعبة/).textContent).toContain("الدوري الإنجليزي");
  });

  it("shows the German, Egyptian, and mixed auction sections", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /الدوري الألماني/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /الدوري المصري/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /ميكس/ })).toBeTruthy();
  });

  it("resets the price input when the auction advances to a new round", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "ابدأ المزاد الآن" }));
    const input = screen.getByRole("textbox", { name: "السعر الإجمالي للاعب بالمليون" }) as HTMLInputElement;
    await user.type(input, "20");
    await user.click(screen.getAllByRole("button", { name: "ابدأ بـ 20M لاعب رقم ١" })[0]);
    const activePass = screen.getAllByRole("button", { name: /انسحاب/ }).find((button) => !(button as HTMLButtonElement).disabled);
    await user.click(activePass!);
    await user.click(screen.getByRole("button", { name: /حسم المزاد/ }));

    await new Promise((resolve) => setTimeout(resolve, 2800));
    const nextRoundInput = screen.getByRole("textbox", { name: "السعر الإجمالي للاعب بالمليون" }) as HTMLInputElement;
    expect(nextRoundInput.value).toBe("");
    expect(screen.getByText("السعر الحالي").parentElement?.querySelector("strong")?.textContent).not.toBe("20M");
  });

  it("uses the entered amount as the total price and rejects lower bids", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "ابدأ المزاد الآن" }));
    const input = screen.getByRole("textbox", { name: "السعر الإجمالي للاعب بالمليون" }) as HTMLInputElement;

    expect(input.value).toBe("");
    await user.type(input, "1");
    const belowStartBid = screen.getAllByRole("button", { name: /ابدأ بـ 1M/ })[0] as HTMLButtonElement;
    expect(belowStartBid.disabled).toBe(true);
    const invalidPricePassButtons = screen.getAllByRole("button", { name: /انسحاب/ }) as HTMLButtonElement[];
    expect(invalidPricePassButtons.every((button) => button.disabled)).toBe(true);
    await user.click(invalidPricePassButtons[0]);
    expect(screen.getAllByRole("button", { name: /ابدأ بـ 1M/ })[0]).toBeTruthy();
    await user.clear(input);
    await user.type(input, "20");
    expect(input.value).toBe("20");
    const openingBid = screen.getAllByRole("button", { name: "ابدأ بـ 20M لاعب رقم ١" })[0];
    expect((openingBid as HTMLButtonElement).disabled).toBe(false);
    await user.click(openingBid);

    await user.clear(input);
    await user.type(input, "20");
    expect(input.value).toBe("20");
    expect((screen.getByRole("button", { name: "ارفع إلى 20M لاعب رقم ٢" }) as HTMLButtonElement).disabled).toBe(true);

    await user.clear(input);
    await user.type(input, "6");
    expect(input.value).toBe("6");
    expect((screen.getByRole("button", { name: "ارفع إلى 6M لاعب رقم ٢" }) as HTMLButtonElement).disabled).toBe(true);

        await user.clear(input);
    await user.type(input, "25");
    const reentryBid = screen.getByRole("button", { name: "ارفع إلى 25M لاعب رقم ٢" }) as HTMLButtonElement;
    expect(reentryBid.disabled).toBe(false);
    await user.click(reentryBid);
    const secondTeamLeadingButton = screen.getAllByRole("button").find((button) => button.textContent?.includes("أنت متصدر المزاد") && button.textContent?.includes("لاعب رقم ٢"));
    expect(secondTeamLeadingButton).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "10M" }));
    expect(input.value).toBe("10");
    await user.click(screen.getByRole("button", { name: "20M" }));
    expect(input.value).toBe("20");
    await user.click(screen.getByRole("button", { name: "30M" }));
    expect(input.value).toBe("30");
  });
});
