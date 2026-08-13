import { describe, expect, it } from "vitest";
import { AFTAKAR_BANK_SIZE, aftakarQuestionBank, buildAftakarSession } from "./aftakarData";

describe("Aftakar question bank", () => {
  it("contains hundreds of difficult question variants with four unique choices", () => {
    expect(AFTAKAR_BANK_SIZE).toBeGreaterThanOrEqual(300);
    expect(aftakarQuestionBank.every((question) => question.options.length === 4)).toBe(true);
    expect(aftakarQuestionBank.every((question) => new Set(question.options).size === 4)).toBe(true);
    expect(aftakarQuestionBank.every((question) => question.options.includes(question.playerName))).toBe(true);
    expect(aftakarQuestionBank.filter((question) => question.category === "trivia").length).toBeGreaterThanOrEqual(50);
    expect(aftakarQuestionBank.filter((question) => question.clues.some((clue) => clue.includes("، ويلعب في مركز"))).length).toBeGreaterThanOrEqual(20);
    expect(aftakarQuestionBank.filter((question) => question.clues.some((clue) => clue.includes("أنديته"))).length).toBeGreaterThanOrEqual(30);
    expect(aftakarQuestionBank.filter((question) => question.clues.some((clue) => clue.includes("إنجازاته"))).length).toBeGreaterThanOrEqual(30);
    expect(aftakarQuestionBank.filter((question) => question.clues.some((clue) => clue.includes("لقبه") || clue.includes("الاسم المرتبط"))).length).toBeGreaterThanOrEqual(30);
  });

  it("builds deterministic sessions without repeating the target player", () => {
    const first = buildAftakarSession(2026, 11);
    const second = buildAftakarSession(2026, 11);
    expect(first.map((question) => question.playerName)).toEqual(second.map((question) => question.playerName));
    expect(new Set(first.map((question) => question.playerName)).size).toBe(first.length);
    expect(first.filter((question) => question.category === "trivia").length).toBeGreaterThanOrEqual(3);
    for (const seed of [1, 7, 42, 99, 2026]) {
      for (const size of [3, 5, 8]) {
        const session = buildAftakarSession(seed, size);
        expect(session).toHaveLength(size);
        expect(session.filter((question) => question.category === "trivia").length).toBeGreaterThanOrEqual(Math.min(3, size));
        expect(new Set(session.map((question) => question.playerName)).size).toBe(size);
      }
    }

    const supportedTrivia = aftakarQuestionBank.filter((question) => question.playerName === "Kylian Mbappé");
    expect(supportedTrivia.some((question) => question.clues.some((clue) => clue.includes("فرنسي")))).toBe(true);
    expect(supportedTrivia.some((question) => question.clues.some((clue) => clue.includes("أنديته")))).toBe(true);
    expect(supportedTrivia.some((question) => question.clues.some((clue) => clue.includes("إنجازاته")))).toBe(true);
    expect(supportedTrivia.some((question) => question.clues.some((clue) => clue.includes("لقبه")))).toBe(true);
  });
});
