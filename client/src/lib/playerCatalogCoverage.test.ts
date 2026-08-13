import { describe, expect, it } from "vitest";
import { playerCatalogue } from "./auctionData";
import { aftakarQuestionBank } from "./aftakarData";
import { roadGamePlayers } from "./roadGameData";
import { playerLibrary } from "./playerLibrary";

describe("unified player catalogue coverage", () => {
  it("keeps one deduplicated catalogue with the full library", () => {
    expect(playerCatalogue.length).toBeGreaterThanOrEqual(500);
    expect(playerLibrary.length).toBe(playerCatalogue.length);
    expect(new Set(playerCatalogue.map((player) => player.name)).size).toBe(playerCatalogue.length);
  });

  it("makes every catalogue player available to Aftakar and Road", () => {
    const catalogueNames = new Set(playerCatalogue.map((player) => player.name));
    const aftakarNames = new Set(aftakarQuestionBank.map((question) => question.playerName));
    const roadNames = new Set(roadGamePlayers.map((player) => player.name));
    expect([...aftakarNames].every((name) => catalogueNames.has(name))).toBe(true);
    expect(aftakarNames.size).toBeGreaterThanOrEqual(30);
    expect([...catalogueNames].every((name) => roadNames.has(name))).toBe(true);
  });
});

