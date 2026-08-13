/** @vitest-environment happy-dom */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import GameHub from "./GameHub";

describe("game hub", () => {
  it("shows both active game cards with their separate logos", () => {
    render(<GameHub onSelectAuction={() => undefined} />);
    expect(screen.getByRole("button", { name: /اعمل الصح/ })).toBeTruthy();
    expect(screen.getByAltText("شعار كوره كده واعمل الصح").getAttribute("src")).toContain("kora-e3mal-elsah-logo");
    expect(screen.getByAltText("شعار اعمل الصح").getAttribute("src")).toContain("e3mal-elsah-logo");
    expect(screen.queryByAltText("شعار كورة واعمل الصح")).toBe(null);
    expect(screen.getByText("كوره كده · ألعاب كتير.")).toBeTruthy();
    expect(screen.getByText("أفتكر")).toBeTruthy();
    expect(screen.getByText("ابدأ التحدي")).toBeTruthy();
    expect(screen.getByAltText("شعار أفتكر").getAttribute("src")).toContain("aftakar-logo");
    expect(screen.getByRole("button", { name: /VAR و لا لأ/ })).toBeTruthy();
    expect(screen.getByAltText("شعار VAR و لا لأ؟").getAttribute("src")).toContain("4A3546B6-12EE-496E-B7CF-41A005590FB6");
    expect(screen.getByRole("button", { name: /مين بيهبد/ })).toBeTruthy();
    expect(screen.getByAltText("شعار مين بيهبد؟").getAttribute("src")).toContain("men-byehbad-logo");
  });

  it("enters the auction game from the active card", async () => {
    const user = userEvent.setup();
    const onSelectAuction = vi.fn();
    const { container } = render(<GameHub onSelectAuction={onSelectAuction} />);
    await user.click(container.querySelector(".game-card-auction") as HTMLElement);
    expect(onSelectAuction).toHaveBeenCalledOnce();
  });

  it("enters VAR from its active card", async () => {
    const user = userEvent.setup();
    const onSelectVar = vi.fn();
    const { container } = render(<GameHub onSelectAuction={() => undefined} onSelectVar={onSelectVar} />);
    await user.click(container.querySelector(".game-card-var") as HTMLElement);
    expect(onSelectVar).toHaveBeenCalledOnce();
  });

  it("enters مين بيهبد؟ from its active card", async () => {
    const user = userEvent.setup();
    const onSelectMenByehbad = vi.fn();
    const { container } = render(<GameHub onSelectAuction={() => undefined} onSelectMenByehbad={onSelectMenByehbad} />);
    await user.click(container.querySelector(".game-card-menbyehbad") as HTMLElement);
    expect(onSelectMenByehbad).toHaveBeenCalledOnce();
  });

  it("enters Aftakar from its active card", async () => {
    const user = userEvent.setup();
    const onSelectAftakar = vi.fn();
    const { container } = render(<GameHub onSelectAuction={() => undefined} onSelectAftakar={onSelectAftakar} />);
    await user.click(container.querySelector(".game-card-aftakar") as HTMLElement);
    expect(onSelectAftakar).toHaveBeenCalledOnce();
  });
});
