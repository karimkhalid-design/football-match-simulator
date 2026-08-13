import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, matchEvents, matchRecords, playerProfiles, teams, users } from "../drizzle/schema";
import { ENV } from "./_core/env";
import type { SimulatedMatch } from "../shared/football";
import type { FootballPlayer, FootballTeam } from "./footballCatalog";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId, lastSignedIn: user.lastSignedIn ?? new Date() };
  const updateSet: Record<string, unknown> = { lastSignedIn: values.lastSignedIn };
  (["name", "email", "loginMethod"] as const).forEach((field) => {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  });
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserByUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return result[0];
}

export async function updateUserUsername(openId: string, username: string) {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(users).set({ username, updatedAt: new Date() }).where(eq(users.openId, openId));
  return getUserByOpenId(openId);
}

export async function persistMatch(input: {
  id: string;
  ownerOpenId?: string;
  homeTeamId: string;
  homeTeamName: string;
  awayTeamId: string;
  awayTeamName: string;
  homePlayerIds: string[];
  awayPlayerIds: string[];
  result: SimulatedMatch;
}) {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(matchRecords).values({
      id: input.id,
      ownerOpenId: input.ownerOpenId,
      homeTeamId: input.homeTeamId,
      homeTeamName: input.homeTeamName,
      awayTeamId: input.awayTeamId,
      awayTeamName: input.awayTeamName,
      homeScore: input.result.homeScore,
      awayScore: input.result.awayScore,
      homeLineupIds: input.homePlayerIds,
      awayLineupIds: input.awayPlayerIds,
      matchStats: input.result,
    });
    if (input.result.events.length) {
      await db.insert(matchEvents).values(input.result.events.map((event) => ({
        matchId: input.id,
        minute: event.minute,
        eventType: event.type,
        team: event.team,
        player: event.player,
        assist: event.assist,
        detail: event.detail,
      })));
    }
  } catch (error) {
    console.warn("[Database] Match history could not be persisted:", error);
  }
}

export async function getRecentMatches(limit = 24) {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(matchRecords).orderBy(desc(matchRecords.playedAt)).limit(limit);
  } catch (error) {
    console.warn("[Database] Match history could not be loaded:", error);
    return [];
  }
}

export async function syncTeams(teamRows: FootballTeam[]) {
  const db = await getDb();
  if (!db || !teamRows.length) return;
  try {
    for (const team of teamRows) {
      await db.insert(teams).values({
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        country: team.country,
        colour: team.colour,
        accent: team.accent,
        status: team.status,
        strength: team.strength,
        playerIds: team.playerIds,
      }).onDuplicateKeyUpdate({
        set: {
          name: team.name,
          shortName: team.shortName,
          country: team.country,
          colour: team.colour,
          accent: team.accent,
          status: team.status,
          strength: team.strength,
          playerIds: team.playerIds,
        },
      });
    }
  } catch (error) {
    console.warn("[Database] Team catalogue could not be synchronized:", error);
  }
}

export async function getStoredTeams(): Promise<FootballTeam[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const storedTeams = await db.select().from(teams);
    return storedTeams as unknown as FootballTeam[];
  } catch (error) {
    console.warn("[Database] Persistent teams could not be loaded:", error);
    return [];
  }
}

export async function syncCatalogue(teamRows: FootballTeam[], playerRows: FootballPlayer[]) {
  const db = await getDb();
  if (!db || !playerRows.length) return;
  try {
    for (const player of playerRows) {
      await db.insert(playerProfiles).values({
        id: player.id,
        name: player.name,
        nationality: player.nationality,
        position: player.position,
        club: player.club,
        age: player.age,
        status: player.status,
        overall: player.overall,
        appearances: player.appearances,
        goals: player.goals,
        assists: player.assists,
        passes: player.passes,
        tackles: player.tackles,
      }).onDuplicateKeyUpdate({
        set: {
          name: player.name,
          nationality: player.nationality,
          position: player.position,
          club: player.club,
          age: player.age,
          status: player.status,
          overall: player.overall,
          appearances: player.appearances,
          goals: player.goals,
          assists: player.assists,
          passes: player.passes,
          tackles: player.tackles,
        },
      });
    }
  } catch (error) {
    console.warn("[Database] Player catalogue could not be synchronized:", error);
  }
}

export async function getMatchById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const records = await db.select().from(matchRecords).where(eq(matchRecords.id, id)).limit(1);
    const record = records[0];
    if (!record) return undefined;
    const events = await db.select().from(matchEvents).where(eq(matchEvents.matchId, id)).orderBy(asc(matchEvents.minute));
    return { ...record, events };
  } catch (error) {
    console.warn("[Database] Match record could not be loaded:", error);
    return undefined;
  }
}
