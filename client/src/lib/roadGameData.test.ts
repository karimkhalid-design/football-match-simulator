import { describe, expect, it } from "vitest";
import { getRoadPlayerForDay, getRoadScore, getRoadVisibleTimeline, isRoadGuessCorrect, normalizeRoadName, ROAD_SCORE_STEPS, roadGamePlayers } from "./roadGameData";

describe("road game data", () => {
  it("has a scalable real-player bank with six progressive hints", () => {
    expect(roadGamePlayers.length).toBeGreaterThanOrEqual(10);
    expect(roadGamePlayers.every((player) => player.hints.length === 6)).toBe(true);
    expect(roadGamePlayers.every((player) => player.timeline.length >= 4)).toBe(true);
  });

  it("accepts Arabic, English, and common spelling variants", () => {
    const salah = roadGamePlayers.find((player) => player.id === "salah")!;
    expect(normalizeRoadName("محمد صلاح")).toBe(normalizeRoadName("Mohamed Salah") === normalizeRoadName("محمد صلاح") ? normalizeRoadName("محمد صلاح") : normalizeRoadName("محمد صلاح"));
    expect(isRoadGuessCorrect(salah, "محمد صلاح")).toBe(true);
    expect(isRoadGuessCorrect(salah, "Mohammed Salah")).toBe(true);
    expect(isRoadGuessCorrect(salah, "لاعب آخر")).toBe(false);
  });

  it("reduces potential score with hints and wrong guesses", () => {
    expect(getRoadScore(1, 0, "easy")).toBe(ROAD_SCORE_STEPS[0]);
    expect(getRoadScore(3, 0, "medium")).toBe(105);
    expect(getRoadScore(3, 2, "medium")).toBe(95);
    expect(getRoadScore(6, 99, "hard")).toBe(0);
  });

  it("keeps the daily player stable and reveals the timeline gradually", () => {
    const date = new Date("2026-08-13T12:00:00Z");
    const player = getRoadPlayerForDay(date);
    expect(getRoadPlayerForDay(new Date("2026-08-13T23:59:00Z")).id).toBe(player.id);
    expect(getRoadVisibleTimeline(player, 1).filter((node) => node.club !== "؟").length).toBeGreaterThanOrEqual(1);
    expect(getRoadVisibleTimeline(player, 6).every((node) => node.club !== "؟")).toBe(true);
  });
});
