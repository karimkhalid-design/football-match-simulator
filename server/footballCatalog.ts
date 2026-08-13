import { getPlayerCareer } from "./careerArchive";

export type FootballPosition = "GK" | "DF" | "MF" | "FW";
export type PlayerStatus = "active" | "retired";

export type CareerStop = {
  period: string;
  club: string;
  appearances: number;
  goals: number;
  note: string;
};

export type FootballPlayer = {
  id: string;
  teamId: string;
  name: string;
  nationality: string;
  position: FootballPosition;
  club: string;
  age: number;
  status: PlayerStatus;
  overall: number;
  appearances: number;
  goals: number;
  assists: number;
  passes: number;
  tackles: number;
  pace: number;
  shooting: number;
  passing: number;
  defence: number;
  physical: number;
  career: CareerStop[];
};

export type FootballTeam = {
  id: string;
  name: string;
  shortName: string;
  country: string;
  colour: string;
  accent: string;
  status: PlayerStatus;
  strength: number;
  playerIds: string[];
};

type PlayerSeed = [string, string, FootballPosition, number, number];
type TeamSeed = {
  id: string;
  name: string;
  shortName: string;
  country: string;
  colour: string;
  accent: string;
  status: PlayerStatus;
  players: PlayerSeed[];
};

const teamSeeds: TeamSeed[] = [
  {
    id: "manchester-city",
    name: "Manchester City",
    shortName: "MCI",
    country: "England",
    colour: "#71B6E6",
    accent: "#E6F4FF",
    status: "active",
    players: [
      ["Ederson", "Brazil", "GK", 31, 88], ["Kyle Walker", "England", "DF", 34, 84], ["Rúben Dias", "Portugal", "DF", 27, 88], ["Joško Gvardiol", "Croatia", "DF", 23, 86], ["Nathan Aké", "Netherlands", "DF", 30, 84], ["Rodri", "Spain", "MF", 28, 91], ["Kevin De Bruyne", "Belgium", "MF", 33, 91], ["Phil Foden", "England", "MF", 24, 89], ["Bernardo Silva", "Portugal", "MF", 30, 88], ["Erling Haaland", "Norway", "FW", 24, 92], ["Jérémy Doku", "Belgium", "FW", 22, 84],
    ],
  },
  {
    id: "real-madrid",
    name: "Real Madrid",
    shortName: "RMA",
    country: "Spain",
    colour: "#F4F4F4",
    accent: "#D5AA37",
    status: "active",
    players: [
      ["Thibaut Courtois", "Belgium", "GK", 32, 90], ["Dani Carvajal", "Spain", "DF", 33, 86], ["Éder Militão", "Brazil", "DF", 27, 86], ["Antonio Rüdiger", "Germany", "DF", 32, 87], ["Ferland Mendy", "France", "DF", 29, 83], ["Aurélien Tchouaméni", "France", "MF", 25, 86], ["Federico Valverde", "Uruguay", "MF", 26, 89], ["Jude Bellingham", "England", "MF", 21, 90], ["Vinícius Júnior", "Brazil", "FW", 24, 91], ["Rodrygo", "Brazil", "FW", 24, 87], ["Kylian Mbappé", "France", "FW", 26, 92],
    ],
  },
  {
    id: "barcelona",
    name: "Barcelona",
    shortName: "BAR",
    country: "Spain",
    colour: "#A50044",
    accent: "#F7D117",
    status: "active",
    players: [
      ["Marc-André ter Stegen", "Germany", "GK", 32, 89], ["Jules Koundé", "France", "DF", 26, 86], ["Ronald Araújo", "Uruguay", "DF", 26, 87], ["Pau Cubarsí", "Spain", "DF", 18, 82], ["Alejandro Balde", "Spain", "DF", 21, 82], ["Frenkie de Jong", "Netherlands", "MF", 27, 87], ["Pedri", "Spain", "MF", 22, 89], ["Gavi", "Spain", "MF", 20, 86], ["Lamine Yamal", "Spain", "FW", 17, 88], ["Raphinha", "Brazil", "FW", 28, 86], ["Robert Lewandowski", "Poland", "FW", 36, 88],
    ],
  },
  {
    id: "bayern-munich",
    name: "Bayern Munich",
    shortName: "BAY",
    country: "Germany",
    colour: "#DC052D",
    accent: "#FFFFFF",
    status: "active",
    players: [
      ["Manuel Neuer", "Germany", "GK", 38, 88], ["Joshua Kimmich", "Germany", "DF", 30, 88], ["Dayot Upamecano", "France", "DF", 26, 84], ["Kim Min-jae", "South Korea", "DF", 28, 84], ["Alphonso Davies", "Canada", "DF", 24, 85], ["Aleksandar Pavlović", "Germany", "MF", 20, 82], ["Leon Goretzka", "Germany", "MF", 30, 85], ["Jamal Musiala", "Germany", "MF", 22, 90], ["Leroy Sané", "Germany", "FW", 29, 86], ["Kingsley Coman", "France", "FW", 28, 85], ["Harry Kane", "England", "FW", 31, 91],
    ],
  },
  {
    id: "liverpool",
    name: "Liverpool",
    shortName: "LIV",
    country: "England",
    colour: "#C8102E",
    accent: "#F6EB61",
    status: "active",
    players: [
      ["Alisson", "Brazil", "GK", 32, 89], ["Trent Alexander-Arnold", "England", "DF", 26, 87], ["Virgil van Dijk", "Netherlands", "DF", 33, 89], ["Ibrahima Konaté", "France", "DF", 25, 85], ["Andy Robertson", "Scotland", "DF", 30, 84], ["Alexis Mac Allister", "Argentina", "MF", 26, 87], ["Dominik Szoboszlai", "Hungary", "MF", 24, 85], ["Ryan Gravenberch", "Netherlands", "MF", 22, 84], ["Mohamed Salah", "Egypt", "FW", 32, 91], ["Luis Díaz", "Colombia", "FW", 28, 86], ["Darwin Núñez", "Uruguay", "FW", 25, 84],
    ],
  },
  {
    id: "arsenal",
    name: "Arsenal",
    shortName: "ARS",
    country: "England",
    colour: "#DB0007",
    accent: "#F5D549",
    status: "active",
    players: [
      ["David Raya", "Spain", "GK", 29, 85], ["Ben White", "England", "DF", 27, 84], ["William Saliba", "France", "DF", 24, 88], ["Gabriel Magalhães", "Brazil", "DF", 27, 86], ["Jurrien Timber", "Netherlands", "DF", 23, 84], ["Declan Rice", "England", "MF", 26, 89], ["Martin Ødegaard", "Norway", "MF", 26, 89], ["Kai Havertz", "Germany", "MF", 25, 84], ["Bukayo Saka", "England", "FW", 23, 89], ["Gabriel Martinelli", "Brazil", "FW", 23, 85], ["Leandro Trossard", "Belgium", "FW", 30, 84],
    ],
  },
  {
    id: "inter",
    name: "Inter",
    shortName: "INT",
    country: "Italy",
    colour: "#0068A8",
    accent: "#111111",
    status: "active",
    players: [
      ["Yann Sommer", "Switzerland", "GK", 36, 86], ["Benjamin Pavard", "France", "DF", 28, 85], ["Francesco Acerbi", "Italy", "DF", 37, 84], ["Alessandro Bastoni", "Italy", "DF", 25, 87], ["Denzel Dumfries", "Netherlands", "DF", 29, 84], ["Federico Dimarco", "Italy", "DF", 27, 85], ["Nicolò Barella", "Italy", "MF", 28, 88], ["Hakan Çalhanoğlu", "Türkiye", "MF", 31, 87], ["Henrikh Mkhitaryan", "Armenia", "MF", 36, 85], ["Marcus Thuram", "France", "FW", 27, 86], ["Lautaro Martínez", "Argentina", "FW", 27, 89],
    ],
  },
  {
    id: "icons-royal",
    name: "Royal Icons",
    shortName: "ROY",
    country: "Global",
    colour: "#B9902E",
    accent: "#FFF0C2",
    status: "retired",
    players: [
      ["Iker Casillas", "Spain", "GK", 43, 92], ["Cafu", "Brazil", "DF", 54, 91], ["Carles Puyol", "Spain", "DF", 46, 91], ["Fabio Cannavaro", "Italy", "DF", 51, 92], ["Roberto Carlos", "Brazil", "DF", 51, 91], ["Andrea Pirlo", "Italy", "MF", 45, 92], ["Xavi", "Spain", "MF", 45, 93], ["Zinedine Zidane", "France", "MF", 52, 94], ["Luís Figo", "Portugal", "FW", 52, 91], ["Ronaldo Nazário", "Brazil", "FW", 48, 94], ["Ronaldinho", "Brazil", "FW", 44, 94],
    ],
  },
  {
    id: "icons-titans",
    name: "Titan Icons",
    shortName: "TTN",
    country: "Global",
    colour: "#2D4777",
    accent: "#DDEBFF",
    status: "retired",
    players: [
      ["Gianluigi Buffon", "Italy", "GK", 47, 93], ["Philipp Lahm", "Germany", "DF", 41, 92], ["Rio Ferdinand", "England", "DF", 46, 90], ["Paolo Maldini", "Italy", "DF", 56, 95], ["Marcelo", "Brazil", "DF", 36, 90], ["Patrick Vieira", "France", "MF", 48, 92], ["Andrés Iniesta", "Spain", "MF", 40, 94], ["Kaká", "Brazil", "MF", 42, 92], ["Lionel Messi", "Argentina", "FW", 37, 96], ["Thierry Henry", "France", "FW", 47, 93], ["Cristiano Ronaldo", "Portugal", "FW", 40, 96],
    ],
  },
  {
    id: "icons-immortals",
    name: "Immortal XI",
    shortName: "IMX",
    country: "Global",
    colour: "#6D327C",
    accent: "#F9D2FF",
    status: "retired",
    players: [
      ["Lev Yashin", "Soviet Union", "GK", 95, 95], ["Javier Zanetti", "Argentina", "DF", 51, 91], ["Franz Beckenbauer", "Germany", "DF", 79, 96], ["Alessandro Nesta", "Italy", "DF", 48, 93], ["Ashley Cole", "England", "DF", 44, 89], ["Lothar Matthäus", "Germany", "MF", 64, 95], ["Ruud Gullit", "Netherlands", "MF", 62, 94], ["Diego Maradona", "Argentina", "MF", 64, 97], ["George Best", "Northern Ireland", "FW", 78, 94], ["Pelé", "Brazil", "FW", 84, 98], ["Johan Cruyff", "Netherlands", "FW", 77, 96],
    ],
  },
  {
    id: "icons-classic",
    name: "Classic XI",
    shortName: "CLX",
    country: "Global",
    colour: "#205D4A",
    accent: "#D0FFE9",
    status: "retired",
    players: [
      ["Peter Schmeichel", "Denmark", "GK", 61, 92], ["Dani Alves", "Brazil", "DF", 41, 91], ["Sergio Ramos", "Spain", "DF", 39, 92], ["Nemanja Vidić", "Serbia", "DF", 43, 91], ["Andreas Brehme", "Germany", "DF", 64, 90], ["Sergio Busquets", "Spain", "MF", 36, 91], ["Pavel Nedvěd", "Czech Republic", "MF", 52, 91], ["Zico", "Brazil", "MF", 71, 94], ["Rivaldo", "Brazil", "FW", 52, 93], ["Romário", "Brazil", "FW", 59, 94], ["Marco van Basten", "Netherlands", "FW", 60, 94],
    ],
  },
];

function slug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function simulationStats(position: FootballPosition, overall: number, status: PlayerStatus) {
  const legacyBoost = status === "retired" ? 14 : 0;
  const base = Math.max(64, overall - 8);
  const appearances = (status === "retired" ? 470 : 115) + (overall - 80) * 19;
  const scoring = position === "FW" ? 1.15 : position === "MF" ? 0.31 : position === "DF" ? 0.09 : 0;
  const goals = Math.round(appearances * scoring + legacyBoost);
  const assists = Math.round(appearances * (position === "FW" ? 0.32 : position === "MF" ? 0.41 : position === "DF" ? 0.15 : 0.02));
  return {
    appearances,
    goals,
    assists,
    passes: Math.round(appearances * (position === "MF" ? 50 : position === "DF" ? 43 : position === "GK" ? 30 : 28)),
    tackles: Math.round(appearances * (position === "DF" ? 2.6 : position === "MF" ? 1.7 : 0.5)),
    pace: Math.min(98, base + (position === "FW" ? 10 : position === "DF" ? 5 : 2)),
    shooting: Math.min(98, base + (position === "FW" ? 12 : position === "MF" ? 5 : -12)),
    passing: Math.min(98, base + (position === "MF" ? 11 : position === "DF" ? 2 : -4)),
    defence: Math.min(98, base + (position === "DF" ? 14 : position === "MF" ? 4 : -17)),
    physical: Math.min(98, base + (position === "DF" ? 8 : position === "FW" ? 4 : 0)),
  };
}

function createCareer(team: TeamSeed, player: PlayerSeed, stats: ReturnType<typeof simulationStats>): CareerStop[] {
  const [name, , , , overall] = player;
  const isRetired = team.status === "retired";
  return [
    {
      period: isRetired ? "Academy years" : "Development",
      club: `${name.split(" ").at(-1)} Academy`,
      appearances: Math.max(12, Math.round(stats.appearances * 0.08)),
      goals: Math.max(0, Math.round(stats.goals * 0.04)),
      note: "Pathway record",
    },
    {
      period: isRetired ? "Early senior" : "First senior cycle",
      club: "Professional debut",
      appearances: Math.max(24, Math.round(stats.appearances * 0.16)),
      goals: Math.max(0, Math.round(stats.goals * 0.1)),
      note: "First-team archive",
    },
    {
      period: isRetired ? "Peak years" : "Breakthrough",
      club: isRetired ? "European elite" : "Professional first team",
      appearances: Math.max(42, Math.round(stats.appearances * 0.28)),
      goals: Math.max(0, Math.round(stats.goals * 0.25)),
      note: `Performance index ${overall}`,
    },
    {
      period: isRetired ? "Final era" : "Established cycle",
      club: isRetired ? "Global competition" : "Elite competition",
      appearances: Math.max(34, Math.round(stats.appearances * 0.21)),
      goals: Math.max(0, Math.round(stats.goals * 0.21)),
      note: isRetired ? "Legacy performance" : "Squad leadership record",
    },
    {
      period: isRetired ? "Legacy archive" : "Current cycle",
      club: team.name,
      appearances: Math.max(20, Math.round(stats.appearances * 0.27)),
      goals: Math.max(0, Math.round(stats.goals * 0.4)),
      note: isRetired ? "Hall of Fame record" : "Active squad record",
    },
  ];
}

export const footballTeams: FootballTeam[] = teamSeeds.map((team) => {
  const ratings = team.players.map((player) => player[4]);
  return {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    country: team.country,
    colour: team.colour,
    accent: team.accent,
    status: team.status,
    strength: Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length),
    playerIds: team.players.map((player) => slug(`${team.id}-${player[0]}`)),
  };
});

export const footballPlayers: FootballPlayer[] = teamSeeds.flatMap((team) =>
  team.players.map((player) => {
    const [name, nationality, position, age, overall] = player;
    const stats = simulationStats(position, overall, team.status);
    return {
      id: slug(`${team.id}-${name}`),
      teamId: team.id,
      name,
      nationality,
      position,
      club: team.name,
      age,
      status: team.status,
      overall,
      ...stats,
      career: getPlayerCareer({ name, status: team.status, teamName: team.name, appearances: stats.appearances, goals: stats.goals, overall }),
    };
  }),
);

export function getCatalogue() {
  return { teams: footballTeams, players: footballPlayers };
}

export function findPlayer(id: string) {
  return footballPlayers.find((player) => player.id === id);
}

export function findTeam(id: string) {
  return footballTeams.find((team) => team.id === id);
}
