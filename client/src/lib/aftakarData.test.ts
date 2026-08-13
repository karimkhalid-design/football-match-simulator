import { describe, expect, it } from "vitest";
import { AFTAKAR_BANK_SIZE, aftakarQuestionBank, buildAftakarSession, freshAftakarSeed } from "./aftakarData";
import { playerCatalogue } from "./auctionData";

describe("Aftakar question bank", () => {
  it("contains only football facts, four unique choices, and no generic clue templates", () => {
    expect(AFTAKAR_BANK_SIZE).toBeGreaterThanOrEqual(300);
    expect(aftakarQuestionBank.every((question) => question.options.length === 4)).toBe(true);
    expect(aftakarQuestionBank.every((question) => new Set(question.options).size === 4)).toBe(true);
    expect(aftakarQuestionBank.every((question) => question.options.includes(question.playerName))).toBe(true);
    expect(aftakarQuestionBank.filter((question) => question.category === "trivia").length).toBeGreaterThanOrEqual(250);
    expect(new Set(aftakarQuestionBank.map((question) => question.category)).size).toBeGreaterThanOrEqual(4);

    const forbiddenGenericPhrases = ["تقييمه في الكتالوج", "من نجوم", "العلامة الفنية", "التفصيلة الفنية", "أسلوبه الأقرب", "لا تعتمد على الرقم"];
    const factualMarkers = /الأندية|إنجاز|مركز|الكرة الذهبية|هدفاً|موسم 20|الحذاء الذهبي|دوري أبطال|كأس العالم|لقب/;
    expect(aftakarQuestionBank.every((question) => question.clues.every((clue) => !forbiddenGenericPhrases.some((phrase) => clue.includes(phrase))))).toBe(true);
    expect(aftakarQuestionBank.every((question) => question.clues.some((clue) => factualMarkers.test(clue)))).toBe(true);
    expect(aftakarQuestionBank.every((question) => question.clues.every((clue) => !clue.includes(question.playerName)))).toBe(true);

    const factualQuestions = aftakarQuestionBank.filter((question) => ["record", "award", "competition"].includes(question.category) && question.clues.some((clue) => /هدفاً|الكرة الذهبية|الحذاء الذهبي|موسم 20|عام 20|يلعب مع/.test(clue)));
    expect(factualQuestions.length).toBeGreaterThanOrEqual(10);
    expect(factualQuestions.every((question) => {
      const target = playerCatalogue.find((player) => player.name === question.playerName);
      const options = question.options.map((option) => playerCatalogue.find((player) => player.name === option));
      return target && options.every((option) => option && option.position === target.position);
    })).toBe(true);
  });

  it("builds deterministic, no-repeat sessions while varying order and option placement by seed", () => {
    const first = buildAftakarSession(2026, 11);
    const second = buildAftakarSession(2026, 11);
    expect(first).toEqual(second);
    expect(new Set(first.map((question) => question.playerName)).size).toBe(first.length);
    expect(new Set(first.map((question) => question.category)).size).toBeGreaterThanOrEqual(2);
    expect(first.some((question) => ["record", "award", "competition"].includes(question.category))).toBe(true);

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
        if (size >= 4) expect(session.some((question) => ["record", "award", "competition"].includes(question.category))).toBe(true);
      }
    }
  });

  it("provides a new seed for every fresh game entry", () => {
    const first = freshAftakarSeed();
    const second = freshAftakarSeed();
    expect(second).not.toBe(first);
  });
});
