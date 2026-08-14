import { MINIMUM_FUTURE_PRICE, TEAM_STARTING_BUDGET, type AuctionPlayer, type PositionCode } from "./auctionData";

export type DraftedPlayer = AuctionPlayer & { position: PositionCode; paid: number; source: "auction" | "hidden" };
export type AuctionTeam = { id: "ali" | "hussein"; name: string; budget: number; players: DraftedPlayer[] };
export type TeamNames = { ali: string; hussein: string };

export function createTeams(names: Partial<TeamNames> = {}): AuctionTeam[] {
  const aliName = names.ali?.trim() || "علي مختار";
  const husseinName = names.hussein?.trim() || "حسين إيهاب";
  return [
    { id: "ali", name: aliName, budget: TEAM_STARTING_BUDGET, players: [] },
    { id: "hussein", name: husseinName, budget: TEAM_STARTING_BUDGET, players: [] },
  ];
}

export function parseBidAmount(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return null;
  const amount = Number(digits);
  return Number.isFinite(amount) && amount > 0 ? Math.floor(amount) : null;
}

export function totalBidAmount(currentBid: number | null, startPrice: number, enteredAmount: number | null) {
  if (enteredAmount !== null) return enteredAmount;
  return currentBid === null ? startPrice : currentBid + 1;
}

export function canOutbid(currentBid: number | null, proposedBid: number, startPrice: number) {
  return currentBid === null ? proposedBid >= startPrice : proposedBid > currentBid;
}

export function canPlaceBid(team: AuctionTeam, bid: number, remainingRounds: number) {
  return bid <= team.budget && team.budget - bid >= remainingRounds * MINIMUM_FUTURE_PRICE;
}

export function totalSpent(team: AuctionTeam) {
  return TEAM_STARTING_BUDGET - team.budget;
}

export function squadValue(team: AuctionTeam) {
  return team.players.reduce((sum, player) => sum + player.paid, 0);
}

export function teamStrength(team: AuctionTeam) {
  if (!team.players.length) return 0;
  return Math.round(team.players.reduce((sum, player) => sum + player.rating, 0) / team.players.length);
}

function seeded(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function hash(input: string) {
  return Array.from(input).reduce((value, character) => ((value << 5) - value + character.charCodeAt(0)) | 0, 0) >>> 0;
}

function averageRole(players: DraftedPlayer[], positions: PositionCode[], fallback = 72) {
  const pool = players.filter((player) => positions.includes(player.position));
  return pool.length ? pool.reduce((sum, player) => sum + player.rating, 0) / pool.length : fallback;
}

const clamp = (value: number, minimum: number, maximum: number) => Math.max(minimum, Math.min(maximum, value));

export type MatchProfile = {
  goalkeeper: number;
  defensiveLine: number;
  midfield: number;
  creativity: number;
  attack: number;
  balance: number;
  buildUp: number;
};

export function getMatchProfile(team: AuctionTeam): MatchProfile {
  const goalkeeper = averageRole(team.players, ["GK"]);
  const defensiveLine = averageRole(team.players, ["CB", "RB", "LB"]);
  const midfield = averageRole(team.players, ["CM"]);
  const creativity = averageRole(team.players, ["CAM"]);
  const attack = averageRole(team.players, ["ST", "RW", "LW"]);
  const required = ["GK", "CB", "RB", "LB", "CM", "CAM", "RW", "LW", "ST"] as PositionCode[];
  const missingRoles = required.filter((position) => !team.players.some((player) => player.position === position)).length;
  const balance = clamp(100 - missingRoles * 7 - Math.abs(midfield - creativity) * 0.08, 70, 100);
  const buildUp = (midfield * 0.55 + creativity * 0.25 + defensiveLine * 0.2) * (balance / 100);
  return { goalkeeper, defensiveLine, midfield, creativity, attack, balance, buildUp };
}

export type FinalMatchEvent = { minute: number; team: 0 | 1; scorer: string; assist?: string };
export type FinalMatch = {
  homeGoals: number;
  awayGoals: number;
  homeStats: { possession: number; shots: number; onTarget: number; chances: number };
  awayStats: { possession: number; shots: number; onTarget: number; chances: number };
  events: FinalMatchEvent[];
  manOfTheMatch: string;
};

export function applyStrengthAdvantage(homeGoals: number, awayGoals: number, strengthDifference: number, randomValue: number) {
  if (homeGoals !== awayGoals || Math.abs(strengthDifference) < 3) return [homeGoals, awayGoals] as const;
  const strongerWinChance = Math.min(0.92, 0.58 + Math.abs(strengthDifference) * 0.025);
  if (randomValue >= strongerWinChance) return [homeGoals, awayGoals] as const;
  return strengthDifference > 0 ? [homeGoals + 1, awayGoals] as const : [homeGoals, awayGoals + 1] as const;
}

export function simulateDraftMatch(home: AuctionTeam, away: AuctionTeam): FinalMatch {
  const random = seeded(hash(`${home.players.map((player) => player.name).join("-")}-${away.players.map((player) => player.name).join("-")}-${Date.now()}`));
  const homeProfile = getMatchProfile(home);
  const awayProfile = getMatchProfile(away);
  const homeStrength = teamStrength(home);
  const awayStrength = teamStrength(away);
  const strengthDifference = homeStrength - awayStrength;
  const homePossession = clamp(Math.round(50 + (homeProfile.buildUp - awayProfile.buildUp) * 0.5 + (homeProfile.midfield - awayProfile.midfield) * 0.18 + strengthDifference * 0.08 + (random() - .5) * 4), 35, 65);
  const homeChanceCreation = homeProfile.attack * 0.52 + homeProfile.creativity * 0.2 + homeProfile.midfield * 0.18 + homeProfile.balance * 0.1;
  const awayChanceCreation = awayProfile.attack * 0.52 + awayProfile.creativity * 0.2 + awayProfile.midfield * 0.18 + awayProfile.balance * 0.1;
  const homeResistance = awayProfile.defensiveLine * 0.7 + awayProfile.goalkeeper * 0.3;
  const awayResistance = homeProfile.defensiveLine * 0.7 + homeProfile.goalkeeper * 0.3;
  const rawHomeGoals = clamp(Math.round(0.45 + (homeChanceCreation - homeResistance) * 0.065 + (homeProfile.attack - awayProfile.defensiveLine) * 0.025 + random() * 1.45), 0, 5);
  const rawAwayGoals = clamp(Math.round(0.4 + (awayChanceCreation - awayResistance) * 0.065 + (awayProfile.attack - homeProfile.defensiveLine) * 0.025 + random() * 1.45), 0, 5);
  const [homeGoals, awayGoals] = applyStrengthAdvantage(rawHomeGoals, rawAwayGoals, strengthDifference, random());
  const attackers = (team: AuctionTeam) => team.players.filter((player) => ["RW", "LW", "ST", "CAM", "CM"].includes(player.position));
  const events = [...Array(homeGoals).fill(0).map(() => ({ team: 0 as const, minute: 7 + Math.floor(random() * 82) })), ...Array(awayGoals).fill(0).map(() => ({ team: 1 as const, minute: 7 + Math.floor(random() * 82) }))]
    .sort((a, b) => a.minute - b.minute)
    .map((event) => {
      const squad = attackers(event.team === 0 ? home : away);
      const scorer = squad[Math.floor(random() * squad.length)] ?? (event.team === 0 ? home.players[10] : away.players[10]);
      const assistants = squad.filter((player) => player.name !== scorer?.name);
      const assist = assistants[Math.floor(random() * assistants.length)];
      return { ...event, scorer: scorer?.name ?? "لاعب", assist: assist?.name };
    });
  const all = [...home.players, ...away.players];
  const topScorer = events[0]?.scorer;
  const manOfTheMatch = topScorer ?? all.sort((a, b) => b.rating - a.rating)[0]?.name ?? "لاعب المباراة";
  const homeShots = Math.max(homeGoals + 3, Math.round(5 + homeChanceCreation * .09 + homeProfile.creativity * .08 - awayProfile.defensiveLine * .035 + random() * 5));
  const awayShots = Math.max(awayGoals + 3, Math.round(5 + awayChanceCreation * .09 + awayProfile.creativity * .08 - homeProfile.defensiveLine * .035 + random() * 5));
  return {
    homeGoals,
    awayGoals,
    homeStats: { possession: homePossession, shots: homeShots, onTarget: Math.max(homeGoals, Math.round(homeShots * .43)), chances: Math.max(1, Math.round(homeShots * .28)) },
    awayStats: { possession: 100 - homePossession, shots: awayShots, onTarget: Math.max(awayGoals, Math.round(awayShots * .43)), chances: Math.max(1, Math.round(awayShots * .28)) },
    events,
    manOfTheMatch,
  };
}
