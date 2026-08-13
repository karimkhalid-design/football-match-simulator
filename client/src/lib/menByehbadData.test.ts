import { describe, expect, it } from "vitest";
import { menByehbadStatements, shuffleMenByehbad } from "./menByehbadData";

describe("مين بيهبد؟ data", () => {
  it("contains valid truth/bluff statements across football categories", () => {
    expect(menByehbadStatements.length).toBeGreaterThanOrEqual(20);
    expect(new Set(menByehbadStatements.map((item) => item.category)).size).toBe(4);
    expect(new Set(menByehbadStatements.map((item) => item.correctAnswer)).size).toBe(2);
    expect(menByehbadStatements.every((item) => item.statement && item.explanation && typeof item.correctAnswer === "boolean")).toBe(true);
  });

  it("shuffles rounds without changing the pool or introducing duplicates", () => {
    const first = shuffleMenByehbad(menByehbadStatements, () => 0.12);
    const second = shuffleMenByehbad(menByehbadStatements, () => 0.88);
    expect(first).toHaveLength(menByehbadStatements.length);
    expect(new Set(first.map((item) => item.id)).size).toBe(first.length);
    expect(first.map((item) => item.id)).not.toEqual(second.map((item) => item.id));
    expect(new Set(first.map((item) => item.id))).toEqual(new Set(menByehbadStatements.map((item) => item.id)));
  });
});
