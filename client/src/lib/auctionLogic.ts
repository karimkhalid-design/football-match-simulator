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

function scoreForPosition(players: DraftedPlayer[], positions: PositionCode[]) {
  const pool = players.filter((player) => positions.includes(player.position));
  return pool.length ? pool.reduce((sum, player) => sum + player.rating, 0) / pool.length : 72;
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

export function simulateDraftMatch(home: AuctionTeam, away: AuctionTeam): FinalMatch {
  const random = seeded(hash(`${home.players.map((player) => player.name).join("-")}-${away.players.map((player) => player.name).join("-")}-${Date.now()}`));
  const homeAttack = scoreForPosition(home.players, ["RW", "LW", "ST", "CAM"]);
  const awayAttack = scoreForPosition(away.players, ["RW", "LW", "ST", "CAM"]);
  const homeControl = scoreForPosition(home.players, ["CM", "CAM"]);
  const awayControl = scoreForPosition(away.players, ["CM", "CAM"]);
  const homeDefense = scoreForPosition(home.players, ["GK", "CB", "RB", "LB"]);
  const awayDefense = scoreForPosition(away.players, ["GK", "CB", "RB", "LB"]);
  const homePossession = Math.max(38, Math.min(62, Math.round(50 + (homeControl - awayControl) * 0.55 + (random() - .5) * 5)));
  const homeGoals = Math.max(0, Math.min(5, Math.round(1.25 + (homeAttack - awayDefense) * .055 + random() * 1.2)));
  const awayGoals = Math.max(0, Math.min(5, Math.round(1.15 + (awayAttack - homeDefense) * .055 + random() * 1.2)));
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
  const homeShots = Math.max(homeGoals + 3, Math.round(8 + (homeAttack - awayDefense) * .24 + random() * 5));
  const awayShots = Math.max(awayGoals + 3, Math.round(8 + (awayAttack - homeDefense) * .24 + random() * 5));
  return {
    homeGoals,
    awayGoals,
    homeStats: { possession: homePossession, shots: homeShots, onTarget: Math.max(homeGoals, Math.round(homeShots * .43)), chances: Math.max(1, Math.round(homeShots * .28)) },
    awayStats: { possession: 100 - homePossession, shots: awayShots, onTarget: Math.max(awayGoals, Math.round(awayShots * .43)), chances: Math.max(1, Math.round(awayShots * .28)) },
    events,
    manOfTheMatch,
  };
}
