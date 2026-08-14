import { describe, expect, it } from "vitest";
import { applyStrengthAdvantage, canOutbid, canPlaceBid, createTeams, parseBidAmount, simulateDraftMatch, totalBidAmount, totalSpent } from "./auctionLogic";
import { buildAuctionRounds } from "./auctionData";

describe("auction match competition", () => {
  it("breaks an equal score toward the stronger team when the advantage wins the probability roll", () => {
    expect(applyStrengthAdvantage(1, 1, 12, 0.2)).toEqual([2, 1]);
    expect(applyStrengthAdvantage(1, 1, -12, 0.2)).toEqual([1, 2]);
  });

  it("keeps a realistic upset path for a weak advantage or an unlucky roll", () => {
    expect(applyStrengthAdvantage(1, 1, 2, 0.1)).toEqual([1, 1]);
    expect(applyStrengthAdvantage(1, 1, 12, 0.95)).toEqual([1, 1]);
  });
});

describe("auction budget rules", () => {
  it("prevents a bid that leaves less than the minimum reserve for future rounds", () => {
    const [team] = createTeams();
    expect(canPlaceBid(team, 70, 11)).toBe(false);
    expect(canPlaceBid(team, 8, 10)).toBe(true);
  });

  it("treats the entered amount as the total player price", () => {
    expect(parseBidAmount("")).toBeNull();
    expect(parseBidAmount("20M")).toBe(20);
    expect(parseBidAmount("6")).toBe(6);
    expect(totalBidAmount(null, 9, 20)).toBe(20);
    expect(totalBidAmount(14, 9, 20)).toBe(20);
    expect(totalBidAmount(14, 9, null)).toBe(15);
    expect(canOutbid(null, 9, 9)).toBe(true);
    expect(canOutbid(null, 6, 9)).toBe(false);
    expect(canOutbid(14, 20, 9)).toBe(true);
    expect(canOutbid(14, 14, 9)).toBe(false);
    expect(canOutbid(14, 13, 9)).toBe(false);
  });

  it("allows larger total-price bids when the budget is safe", () => {
    const [team] = createTeams();
    expect(canPlaceBid(team, 13, 10)).toBe(true);
    expect(canPlaceBid(team, 18, 10)).toBe(true);
    expect(canPlaceBid(team, 75, 10)).toBe(false);
    team.budget = 19;
    expect(canPlaceBid(team, 15, 1)).toBe(true);
    expect(canPlaceBid(team, 17, 1)).toBe(false);
  });

  it("calculates money spent from the original team budget", () => {
    const [team] = createTeams();
    team.budget = 73;
    expect(totalSpent(team)).toBe(27);
  });

  it("creates teams with user-provided display names", () => {
    const teams = createTeams({ ali: "فريق كريم", hussein: "نجوم القاهرة" });
    expect(teams.map((team) => team.name)).toEqual(["فريق كريم", "نجوم القاهرة"]);
  });

  it("simulates a final match with score, events, and core statistics", () => {
    const teams = createTeams();
    const rounds = buildAuctionRounds();
    teams.forEach((team, teamIndex) => {
      team.players = rounds.map((round) => ({ ...(teamIndex === 0 ? round.auction : round.hidden), position: round.position, paid: teamIndex === 0 ? round.startPrice : 0, source: teamIndex === 0 ? "auction" as const : "hidden" as const }));
    });
    const result = simulateDraftMatch(teams[0], teams[1]);
    expect(result.homeStats.possession + result.awayStats.possession).toBe(100);
    expect(result.homeStats.shots).toBeGreaterThanOrEqual(result.homeGoals);
    expect(result.awayStats.shots).toBeGreaterThanOrEqual(result.awayGoals);
    expect(result.events).toHaveLength(result.homeGoals + result.awayGoals);
    expect(result.manOfTheMatch.length).toBeGreaterThan(0);
  });
});
