import { describe, expect, it } from "vitest";
import { canPlaceBid, createTeams, simulateDraftMatch, totalSpent } from "./auctionLogic";
import { buildAuctionRounds } from "./auctionData";

describe("auction budget rules", () => {
  it("prevents a bid that leaves less than the minimum reserve for future rounds", () => {
    const [team] = createTeams();
    expect(canPlaceBid(team, 70, 11)).toBe(false);
    expect(canPlaceBid(team, 8, 10)).toBe(true);
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
