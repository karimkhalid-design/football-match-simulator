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
  });

  it("enters the auction game from the active card", async () => {
    const user = userEvent.setup();
    const onSelectAuction = vi.fn();
    const { container } = render(<GameHub onSelectAuction={onSelectAuction} />);
    await user.click(container.querySelector(".game-card-auction") as HTMLElement);
    expect(onSelectAuction).toHaveBeenCalledOnce();
  });

  it("enters Aftakar from its active card", async () => {
    const user = userEvent.setup();
    const onSelectAftakar = vi.fn();
    const { container } = render(<GameHub onSelectAuction={() => undefined} onSelectAftakar={onSelectAftakar} />);
    await user.click(container.querySelector(".game-card-aftakar") as HTMLElement);
    expect(onSelectAftakar).toHaveBeenCalledOnce();
  });
});
