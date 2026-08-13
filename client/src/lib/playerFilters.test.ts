import { describe, expect, it } from "vitest";
import { filterPlayers } from "./playerFilters";

const players = [
  { name: "Cristiano Ronaldo", nationality: "Portugal", position: "FW", club: "Titan Icons", status: "retired" as const },
  { name: "Rodri", nationality: "Spain", position: "MF", club: "Manchester City", status: "active" as const },
  { name: "Ronaldo Nazário", nationality: "Brazil", position: "FW", club: "Royal Icons", status: "retired" as const },
];

describe("filterPlayers", () => {
  it("combines free-text search with status and position filters", () => {
    const result = filterPlayers(players, { search: "ronaldo", status: "retired", position: "FW", club: "all", nationality: "all" });
    expect(result.map((player) => player.name)).toEqual(["Cristiano Ronaldo", "Ronaldo Nazário"]);
  });
});
