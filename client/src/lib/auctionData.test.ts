import { describe, expect, it } from "vitest";
import { auctionSectionLabels, buildAuctionRounds, formationSlots, getPlayersForAuctionSection, playerCatalogue } from "./auctionData";
import { createTeams, simulateDraftMatch } from "./auctionLogic";

describe("auction player catalogue", () => {
  it("contains a broad, varied catalogue across all formation positions", () => {
    expect(playerCatalogue.length).toBeGreaterThanOrEqual(120);
    expect(new Set(playerCatalogue.map((player) => player.position))).toEqual(new Set(formationSlots));
    expect(playerCatalogue.some((player) => player.status === "legend")).toBe(true);
    expect(playerCatalogue.some((player) => player.status === "active")).toBe(true);
  });

  it("builds eleven rounds with globally unique visible and hidden players", () => {
    for (const seed of [0, 1, 42, 20260813, -17]) {
      const rounds = buildAuctionRounds(seed);
      const assignedNames = rounds.flatMap((round) => [round.auction.name, round.hidden.name]);
      expect(rounds).toHaveLength(11);
      expect(new Set(assignedNames).size, `duplicate assignment for seed ${seed}`).toBe(assignedNames.length);
      expect(rounds.every((round) => round.auction.name !== round.hidden.name)).toBe(true);
      expect(rounds.map((round) => round.position)).toEqual(formationSlots);
    }
  });

  it("keeps each selectable auction section isolated and playable", () => {
    for (const section of ["premier-league", "la-liga", "legends"] as const) {
      const sectionPlayers = getPlayersForAuctionSection(section);
      expect(sectionPlayers.length, auctionSectionLabels[section]).toBeGreaterThanOrEqual(22);
      for (const position of new Set(formationSlots)) { const required = position === "CB" ? 4 : 2; expect(sectionPlayers.filter((player) => player.position === position).length, `${auctionSectionLabels[section]} / ${position}`).toBeGreaterThanOrEqual(required); }
      const rounds = buildAuctionRounds(20260813, section);
      const catalogueNames = new Set(sectionPlayers.map((player) => player.name));
      const assignedNames = rounds.flatMap((round) => [round.auction.name, round.hidden.name]);
      expect(rounds).toHaveLength(11);
      expect(assignedNames.every((name) => catalogueNames.has(name))).toBe(true);
      expect(new Set(assignedNames).size).toBe(22);
    }
  });

  it("builds two complete squads with 22 unique players for the final match", () => {
    const rounds = buildAuctionRounds(20260813);
    const teams = createTeams({ ali: "الفريق الأول", hussein: "الفريق الثاني" });

    rounds.forEach((round, index) => {
      const winner = index % 2;
      const loser = 1 - winner;
      teams[winner].players.push({ ...round.auction, position: round.position, paid: round.startPrice, source: "auction" });
      teams[loser].players.push({ ...round.hidden, position: round.position, paid: 0, source: "hidden" });
    });

    const allNames = teams.flatMap((team) => team.players.map((player) => player.name));
    expect(teams[0].players).toHaveLength(11);
    expect(teams[1].players).toHaveLength(11);
    expect(new Set(teams[0].players.map((player) => player.name)).size).toBe(11);
    expect(new Set(teams[1].players.map((player) => player.name)).size).toBe(11);
    expect(new Set(allNames).size).toBe(22);

    const match = simulateDraftMatch(teams[0], teams[1]);
    expect(match.events.every((event) => new Set(allNames).has(event.scorer))).toBe(true);
  });
});
