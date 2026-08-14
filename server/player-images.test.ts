import { describe, expect, it } from "vitest";

describe("player image source", () => {
  it("uses the configured public source and responds for a known player", async () => {
    const source = process.env.PUBLIC_PLAYER_IMAGES;
    expect(source).toBe("wikipedia");

    const response = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/summary/Lionel_Messi",
      { headers: { "User-Agent": "KoraKeda/1.0 image-catalogue" } },
    );
    expect(response.ok).toBe(true);
    const payload = (await response.json()) as { thumbnail?: { source?: string }; originalimage?: { source?: string } };
    expect(payload.thumbnail?.source ?? payload.originalimage?.source).toMatch(/^https:\/\//);
  }, 10000);
});
