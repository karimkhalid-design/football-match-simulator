import { describe, expect, it } from "vitest";
import { drawMenByehbadAid, getMenByehbadAidPoints, hardMenByehbadStatements, menByehbadStatements, shuffleMenByehbad } from "./menByehbadData";

describe("مين بيهبد؟ data", () => {
  it("contains valid truth/bluff statements across football categories", () => {
    expect(menByehbadStatements.length).toBeGreaterThanOrEqual(20);
    expect(new Set(menByehbadStatements.map((item) => item.category)).size).toBe(4);
    expect(new Set(menByehbadStatements.map((item) => item.correctAnswer)).size).toBe(2);
    expect(menByehbadStatements.every((item) => item.statement && item.explanation && typeof item.correctAnswer === "boolean")).toBe(true);
  });

  it("contains a substantial hard pool across all football categories", () => {
    const hard = menByehbadStatements.filter((item) => item.difficulty === "hard");
    expect(hard.length).toBeGreaterThanOrEqual(15);
    expect(new Set(hard.map((item) => item.category))).toEqual(new Set(["players", "clubs", "competitions", "egypt"]));
    expect(hard.every((item) => item.statement.length >= 25 && item.explanation.length >= 35)).toBe(true);
    expect(hardMenByehbadStatements.length).toBeGreaterThanOrEqual(30);
    expect(new Set(hardMenByehbadStatements.map((item) => item.category))).toEqual(new Set(["players", "clubs", "competitions", "egypt"]));
    expect(hardMenByehbadStatements.every((item) => item.difficulty === "hard")).toBe(true);
  });

  it("draws an owner and one aid card deterministically from the participating players", () => {
    const aid = drawMenByehbadAid(["كريم", "محمد", "عمر"], () => 0);
    expect(aid.owner).toBe("كريم");
    expect(aid.title).toBeTruthy();
    expect(aid.description).toBeTruthy();
  });

  it("applies the aid only to its owner and keeps ordinary players at 100 points", () => {
    const aid = drawMenByehbadAid(["كريم", "محمد"], () => 0);
    expect(getMenByehbadAidPoints({ ...aid, kind: "bonus" }, aid.owner, "كريم", true)).toBe(150);
    expect(getMenByehbadAidPoints({ ...aid, kind: "double" }, aid.owner, "كريم", true)).toBe(200);
    expect(getMenByehbadAidPoints({ ...aid, kind: "risk" }, aid.owner, "كريم", false)).toBe(-50);
    expect(getMenByehbadAidPoints({ ...aid, kind: "shield" }, aid.owner, "كريم", false)).toBe(0);
    expect(getMenByehbadAidPoints({ ...aid, kind: "bonus" }, aid.owner, "محمد", true)).toBe(100);
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
