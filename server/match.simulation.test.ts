import { describe, expect, it } from "vitest";
import { simulateMatch } from "../shared/football";
import { footballPlayers } from "./footballCatalog";

const home = { id: "home", name: "Home", strength: 89, playerNames: ["A", "B", "C"] };
const away = { id: "away", name: "Away", strength: 84, playerNames: ["D", "E", "F"] };

describe("football simulation engine", () => {
  it("creates an ordered, balanced timeline with summary statistics", () => {
    const result = simulateMatch(home, away, "fixed-seed");
    expect(result.homeStats.possession + result.awayStats.possession).toBe(100);
    expect(result.homeStats.shots).toBeGreaterThan(0);
    expect(result.awayStats.passes).toBeGreaterThan(0);
    expect(result.events.length).toBeGreaterThanOrEqual(4);
    expect(result.events.map((event) => event.minute)).toEqual([...result.events.map((event) => event.minute)].sort((a, b) => a - b));
  });

  it("gives every starter-catalogue player a five-stop career archive", () => {
    expect(footballPlayers).toHaveLength(121);
    expect(footballPlayers.every((player) => player.career.length >= 5)).toBe(true);
  });
});
