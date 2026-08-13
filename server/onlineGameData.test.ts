import { describe, expect, it } from "vitest";
import { onlineQuestions } from "./onlineGameData";

describe("online quiz question bank", () => {
  it("contains at least 100 questions", () => {
    expect(onlineQuestions.length).toBeGreaterThanOrEqual(100);
  });

  it("has unique IDs and four options per question", () => {
    expect(new Set(onlineQuestions.map((question) => question.id)).size).toBe(onlineQuestions.length);
    expect(onlineQuestions.every((question) => question.options.length === 4 && question.correctIndex >= 0 && question.correctIndex < 4)).toBe(true);
  });

  it("covers all ten categories and three difficulty levels", () => {
    expect(new Set(onlineQuestions.map((question) => question.category)).size).toBe(10);
    expect(new Set(onlineQuestions.map((question) => question.difficulty)).size).toBe(3);
  });

  it("keeps football questions available for the first game identity", () => {
    expect(onlineQuestions.filter((question) => question.category === "football").length).toBeGreaterThanOrEqual(10);
  });
});
