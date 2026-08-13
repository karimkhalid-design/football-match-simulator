/** @vitest-environment happy-dom */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "./Home";

describe("flexible bid increment control", () => {
  it("can be cleared, typed, preset, and safely used for the next bid", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "ابدأ المزاد الآن" }));
    const input = screen.getByRole("textbox", { name: "قيمة الزيادة بالمليون" }) as HTMLInputElement;

    expect(input.value).toBe("1");
    await user.clear(input);
    expect(input.value).toBe("");

    const openingBid = screen.getAllByRole("button", { name: /ابدأ بـ/ })[0];
    await user.click(openingBid);
    expect((screen.getByRole("button", { name: /ارفع بـ 1M إلى/ }) as HTMLButtonElement).disabled).toBe(false);

    await user.clear(input);
    await user.type(input, "6");
    expect(input.value).toBe("6");
    expect((screen.getByRole("button", { name: /ارفع بـ 6M إلى/ }) as HTMLButtonElement).disabled).toBe(false);

    await user.click(screen.getByRole("button", { name: "+5" }));
    expect(input.value).toBe("5");
    await user.click(screen.getByRole("button", { name: "+10" }));
    expect(input.value).toBe("10");
    await user.click(screen.getByRole("button", { name: "+1" }));
    expect(input.value).toBe("1");
  });
});
