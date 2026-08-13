import { describe, expect, it } from "vitest";
import { playerCatalogue } from "./auctionData";
import { PLAYER_IMAGE_URLS } from "./playerImageMap";

describe("player image catalogue coverage", () => {
  it("maps every catalogue player to a deterministic Wikimedia thumbnail", () => {
    expect(playerCatalogue).toHaveLength(122);

    for (const player of playerCatalogue) {
      const url = PLAYER_IMAGE_URLS[player.name];
      expect(url, `${player.name} is missing from PLAYER_IMAGE_URLS`).toMatch(
        /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/.+\/250px-.+\?utm_source=en\.wikipedia\.org&utm_campaign=api&utm_content=thumbnail$/,
      );
    }

    expect(Object.keys(PLAYER_IMAGE_URLS)).toHaveLength(playerCatalogue.length);
  });
});
