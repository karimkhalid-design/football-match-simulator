import { describe, expect, it } from "vitest";
import { simulateMatch } from "./football";

const home = { id: "home", name: "Home", strength: 89, playerNames: ["A", "B", "C"] };
const away = { id: "away", name: "Away", strength: 84, playerNames: ["D", "E", "F"] };

describe("simulateMatch", () => {
  it("returns balanced possession and ordered events for a fixed seed", () => {
    const result = simulateMatch(home, away, "fixed-seed");
    expect(result.homeStats.possession + result.awayStats.possession).toBe(100);
    expect(result.events.map((event) => event.minute)).toEqual([...result.events.map((event) => event.minute)].sort((a, b) => a - b));
    expect(result.homeScore).toBeGreaterThanOrEqual(0);
    expect(result.awayScore).toBeGreaterThanOrEqual(0);
  });
});
