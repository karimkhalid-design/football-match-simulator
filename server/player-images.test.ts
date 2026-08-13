import { describe, expect, it } from "vitest";

describe("player image source", () => {
  it("uses the configured public source and responds for a known player", async () => {
    const source = process.env.PUBLIC_PLAYER_IMAGES;
    expect(source).toBe("wikipedia");

    const response = await fetch(
      "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=160&titles=Lionel%20Messi",
    );
    expect(response.ok).toBe(true);
    const payload = (await response.json()) as {
      query?: { pages?: Record<string, { thumbnail?: { source?: string } }> };
    };
    const page = Object.values(payload.query?.pages ?? {})[0];
    expect(page?.thumbnail?.source).toMatch(/^https:\/\//);
  }, 10000);
});
