import { describe, expect, it } from "vitest";
import { AFTAKAR_BANK_SIZE, aftakarQuestionBank, buildAftakarSession, freshAftakarSeed } from "./aftakarData";

describe("Aftakar question bank", () => {
  it("contains a large varied bank with indirect clues and four unique choices", () => {
    expect(AFTAKAR_BANK_SIZE).toBeGreaterThanOrEqual(300);
    expect(aftakarQuestionBank.every((question) => question.options.length === 4)).toBe(true);
    expect(aftakarQuestionBank.every((question) => new Set(question.options).size === 4)).toBe(true);
    expect(aftakarQuestionBank.every((question) => question.options.includes(question.playerName))).toBe(true);
    expect(aftakarQuestionBank.filter((question) => question.category === "trivia").length).toBeGreaterThanOrEqual(50);
    expect(new Set(aftakarQuestionBank.map((question) => question.category)).size).toBeGreaterThanOrEqual(4);

    const giveawayWords = [
      "أرجنتين", "برتغال", "مصري", "فرنسي", "نرويجي", "برازيلي", "إيطالي", "ألماني", "سوفيتي", "إسباني", "كرواتي", "بولندي", "إيفواري", "كاميروني", "إنجليزي",
      "برشلونة", "ريال مدريد", "مانشستر", "ليفربول", "يوفنتوس", "باريس سان جيرمان", "187 مباراة", "إنجازاته", "لقبه", "الاسم المرتبط", "181 مباراة", "163 مشاركة", "تقييمه في الكتالوج",
    ];
    expect(aftakarQuestionBank.every((question) => question.clues.every((clue) => !giveawayWords.some((word) => clue.includes(word))))).toBe(true);
    expect(aftakarQuestionBank.every((question) => question.clues.every((clue) => !clue.includes(question.playerName)))).toBe(true);
    expect(aftakarQuestionBank.filter((question) => question.category === "tactical").length).toBeGreaterThan(50);
    for (const category of ["transfer", "competition", "award", "match-event", "era", "record"] as const) {
      expect(aftakarQuestionBank.filter((question) => question.category === category).length).toBeGreaterThan(50);
    }
    expect(aftakarQuestionBank.filter((question) => question.category === "career").length).toBeGreaterThan(50);
  });

  it("builds deterministic, no-repeat sessions while varying order and option placement by seed", () => {
    const first = buildAftakarSession(2026, 11);
    const second = buildAftakarSession(2026, 11);
    expect(first).toEqual(second);
    expect(new Set(first.map((question) => question.playerName)).size).toBe(first.length);
    expect(new Set(first.map((question) => question.category)).size).toBeGreaterThanOrEqual(3);

    const different = buildAftakarSession(2027, 11);
    expect(different.map((question) => question.playerName)).not.toEqual(first.map((question) => question.playerName));
    expect(different.some((question, index) => question.options.join("|") !== first[index].options.join("|"))).toBe(true);

    for (const seed of [1, 7, 42, 99, 2026]) {
      for (const size of [3, 5, 8]) {
        const session = buildAftakarSession(seed, size);
        expect(session).toHaveLength(size);
        expect(session.filter((question) => question.category === "trivia").length).toBeGreaterThanOrEqual(Math.min(3, size));
        expect(new Set(session.map((question) => question.playerName)).size).toBe(size);
        expect(session.every((question) => question.options.includes(question.playerName))).toBe(true);
      }
    }
  });

  it("provides a new seed for every fresh game entry", () => {
    const first = freshAftakarSeed();
    const second = freshAftakarSeed();
    expect(second).not.toBe(first);
  });
});
