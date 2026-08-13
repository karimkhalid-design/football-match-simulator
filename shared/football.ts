export type MatchSideStats = {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  corners: number;
};

export type SimulatedEvent = {
  minute: number;
  type: "goal" | "yellow" | "red" | "substitution" | "chance";
  team: "home" | "away";
  player: string;
  assist?: string;
  detail: string;
};

export type SimulatedMatch = {
  homeScore: number;
  awayScore: number;
  homeStats: MatchSideStats;
  awayStats: MatchSideStats;
  events: SimulatedEvent[];
};

type SimulationTeam = { id: string; name: string; strength: number; playerNames: string[] };

function hash(value: string) {
  return Array.from(value).reduce((acc, character) => ((acc << 5) - acc + character.charCodeAt(0)) | 0, 0) >>> 0;
}

function seeded(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

export function simulateMatch(home: SimulationTeam, away: SimulationTeam, seedValue = `${home.id}-${away.id}-${Date.now()}`): SimulatedMatch {
  const random = seeded(hash(seedValue));
  const difference = home.strength - away.strength;
  const homePossession = Math.min(62, Math.max(38, Math.round(50 + difference * 0.7 + (random() - 0.5) * 7)));
  const homeShots = Math.max(5, Math.round(10 + difference * 0.3 + random() * 6));
  const awayShots = Math.max(4, Math.round(10 - difference * 0.25 + random() * 6));
  const homeGoals = Math.min(5, Math.max(0, Math.round(homeShots * (0.12 + random() * 0.1))));
  const awayGoals = Math.min(5, Math.max(0, Math.round(awayShots * (0.12 + random() * 0.1))));
  const goalMinutes = [...Array(homeGoals).fill("home"), ...Array(awayGoals).fill("away")]
    .map((team, index) => ({ team: team as "home" | "away", minute: Math.min(90, 5 + Math.floor(random() * 84) + index) }))
    .sort((a, b) => a.minute - b.minute);
  const events: SimulatedEvent[] = goalMinutes.map((goal) => {
    const squad = goal.team === "home" ? home.playerNames : away.playerNames;
    const scorer = squad[Math.max(0, Math.floor(random() * squad.length))] ?? "Forward";
    const assistant = squad[Math.max(0, Math.floor(random() * squad.length))] ?? "Midfielder";
    return { minute: goal.minute, type: "goal", team: goal.team, player: scorer, assist: assistant, detail: "Goal from open play" };
  });
  const addEvent = (type: SimulatedEvent["type"], team: "home" | "away", minute: number, detail: string) => {
    const squad = team === "home" ? home.playerNames : away.playerNames;
    events.push({ minute, type, team, player: squad[Math.floor(random() * squad.length)] ?? "Player", detail });
  };
  addEvent("yellow", random() > 0.5 ? "home" : "away", 20 + Math.floor(random() * 50), "Tactical foul");
  addEvent("chance", random() > 0.5 ? "home" : "away", 8 + Math.floor(random() * 75), "Big chance created");
  addEvent("substitution", "home", 62 + Math.floor(random() * 16), "Fresh legs introduced");
  addEvent("substitution", "away", 64 + Math.floor(random() * 15), "Tactical change");
  return {
    homeScore: homeGoals,
    awayScore: awayGoals,
    homeStats: { possession: homePossession, shots: homeShots, shotsOnTarget: Math.max(homeGoals, Math.round(homeShots * 0.42)), passes: Math.round(390 + homePossession * 4.5 + random() * 80), passAccuracy: 79 + Math.floor(random() * 12), corners: Math.floor(random() * 8) + 2 },
    awayStats: { possession: 100 - homePossession, shots: awayShots, shotsOnTarget: Math.max(awayGoals, Math.round(awayShots * 0.42)), passes: Math.round(390 + (100 - homePossession) * 4.5 + random() * 80), passAccuracy: 79 + Math.floor(random() * 12), corners: Math.floor(random() * 8) + 2 },
    events: events.sort((a, b) => a.minute - b.minute),
  };
}
