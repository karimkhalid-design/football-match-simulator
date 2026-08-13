import { describe, expect, it } from "vitest";
import { playerCatalogue } from "./auctionData";
import { PLAYER_IMAGE_URLS } from "./playerImageMap";

describe("player image catalogue coverage", () => {
  it("maps every catalogue player to a deterministic Wikimedia thumbnail", () => {
    expect(playerCatalogue).toHaveLength(124);

    for (const player of playerCatalogue) {
      const url = PLAYER_IMAGE_URLS[player.name];
      expect(url, `${player.name} is missing from PLAYER_IMAGE_URLS`).toMatch(/^(\/manus-storage\/[a-z0-9-]+_[a-f0-9]+\.jpg|https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\/)/);
    }

    expect(Object.keys(PLAYER_IMAGE_URLS)).toHaveLength(playerCatalogue.length);
  });
});
