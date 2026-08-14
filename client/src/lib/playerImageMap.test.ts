import { describe, expect, it } from "vitest";
import { playerCatalogue } from "./auctionData";
import { PLAYER_IMAGE_URLS } from "./playerImageMap";
import { GENERATED_WIKIPEDIA_IMAGE_URLS } from "./generatedWikipediaImageMap";

describe("player image catalogue coverage", () => {
  it("maps every catalogue player to a deterministic Wikimedia thumbnail", () => {
    expect(playerCatalogue.length).toBeGreaterThanOrEqual(500);

    for (const player of playerCatalogue) {
      const url = PLAYER_IMAGE_URLS[player.name];
      expect(url, `${player.name} is missing from PLAYER_IMAGE_URLS`).toMatch(/^(\/manus-storage\/[a-z0-9-]+_[a-f0-9]+\.jpg|https:\/\/(commons\.wikimedia\.org\/wiki\/Special:FilePath|upload\.wikimedia\.org\/))/);
    }

    expect(Object.keys(PLAYER_IMAGE_URLS)).toEqual(expect.arrayContaining(playerCatalogue.map((player) => player.name)));
    expect(Object.keys(GENERATED_WIKIPEDIA_IMAGE_URLS).length).toBeGreaterThanOrEqual(350);
    expect(Object.keys(PLAYER_IMAGE_URLS)).toEqual(expect.arrayContaining(Object.keys(GENERATED_WIKIPEDIA_IMAGE_URLS)));
  });
});
