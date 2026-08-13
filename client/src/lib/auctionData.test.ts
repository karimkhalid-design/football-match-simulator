import { describe, expect, it } from "vitest";
import { buildAuctionRounds, formationSlots, playerCatalogue } from "./auctionData";

describe("auction player catalogue", () => {
  it("contains a broad, varied catalogue across all formation positions", () => {
    expect(playerCatalogue.length).toBeGreaterThanOrEqual(120);
    expect(new Set(playerCatalogue.map((player) => player.position))).toEqual(new Set(formationSlots));
    expect(playerCatalogue.some((player) => player.status === "legend")).toBe(true);
    expect(playerCatalogue.some((player) => player.status === "active")).toBe(true);
  });

  it("builds eleven rounds with distinct visible and hidden players", () => {
    const rounds = buildAuctionRounds(42);
    expect(rounds).toHaveLength(11);
    expect(rounds.every((round) => round.auction.name !== round.hidden.name)).toBe(true);
    expect(rounds.map((round) => round.position)).toEqual(formationSlots);
  });
});
