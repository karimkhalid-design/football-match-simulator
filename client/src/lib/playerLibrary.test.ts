/** @vitest-environment happy-dom */
import { describe, expect, it } from "vitest";
import { playerLibrary, searchLibraryPlayers } from "./playerLibrary";

describe("player library", () => {
  it("contains a broad current and retired catalogue", () => {
    expect(playerLibrary.length).toBeGreaterThanOrEqual(500);
    expect(playerLibrary.some((player) => player.status === "active")).toBe(true);
    expect(playerLibrary.some((player) => player.status === "legend")).toBe(true);
    expect(playerLibrary.every((player) => player.arabicName && player.position && player.rating)).toBe(true);
    expect(new Set(playerLibrary.map((player) => player.position)).size).toBe(9);
  });

  it("searches Arabic aliases and filters without changing the source list", () => {
    const result = searchLibraryPlayers(playerLibrary, "محمد صلاح");
    expect(result.some((player) => player.name === "Mohamed Salah")).toBe(true);
    expect(playerLibrary.length).toBeGreaterThan(result.length);
  });
});
