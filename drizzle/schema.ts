import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  username: varchar("username", { length: 24 }).unique(),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const teams = mysqlTable("teams", {
  id: varchar("id", { length: 80 }).primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  shortName: varchar("shortName", { length: 16 }).notNull(),
  country: varchar("country", { length: 80 }).notNull(),
  colour: varchar("colour", { length: 20 }).notNull(),
  accent: varchar("accent", { length: 20 }).notNull(),
  status: mysqlEnum("status", ["active", "retired"]).notNull(),
  strength: int("strength").notNull(),
  playerIds: json("playerIds").notNull(),
  source: varchar("source", { length: 120 }).notNull().default("simulator-catalogue"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const playerProfiles = mysqlTable("player_profiles", {
  id: varchar("id", { length: 120 }).primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  nationality: varchar("nationality", { length: 80 }).notNull(),
  position: mysqlEnum("position", ["GK", "DF", "MF", "FW"]).notNull(),
  club: varchar("club", { length: 160 }).notNull(),
  age: int("age").notNull(),
  status: mysqlEnum("status", ["active", "retired"]).notNull(),
  overall: int("overall").notNull(),
  appearances: int("appearances").notNull().default(0),
  goals: int("goals").notNull().default(0),
  assists: int("assists").notNull().default(0),
  passes: int("passes").notNull().default(0),
  tackles: int("tackles").notNull().default(0),
  source: varchar("source", { length: 120 }).notNull().default("simulator-catalogue"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const playerCareers = mysqlTable("player_careers", {
  id: int("id").autoincrement().primaryKey(),
  playerId: varchar("playerId", { length: 120 }).notNull(),
  period: varchar("period", { length: 80 }).notNull(),
  club: varchar("club", { length: 160 }).notNull(),
  appearances: int("appearances").notNull().default(0),
  goals: int("goals").notNull().default(0),
  note: varchar("note", { length: 180 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const matchRecords = mysqlTable("match_records", {
  id: varchar("id", { length: 48 }).primaryKey(),
  ownerOpenId: varchar("ownerOpenId", { length: 64 }),
  homeTeamId: varchar("homeTeamId", { length: 80 }).notNull(),
  homeTeamName: varchar("homeTeamName", { length: 160 }).notNull(),
  awayTeamId: varchar("awayTeamId", { length: 80 }).notNull(),
  awayTeamName: varchar("awayTeamName", { length: 160 }).notNull(),
  homeScore: int("homeScore").notNull(),
  awayScore: int("awayScore").notNull(),
  homeLineupIds: json("homeLineupIds").notNull(),
  awayLineupIds: json("awayLineupIds").notNull(),
  matchStats: json("matchStats").notNull(),
  playedAt: timestamp("playedAt").defaultNow().notNull(),
});

export const matchEvents = mysqlTable("match_events", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 48 }).notNull(),
  minute: int("minute").notNull(),
  eventType: mysqlEnum("eventType", ["goal", "yellow", "red", "substitution", "chance"]).notNull(),
  team: mysqlEnum("team", ["home", "away"]).notNull(),
  player: varchar("player", { length: 160 }).notNull(),
  assist: varchar("assist", { length: 160 }),
  detail: varchar("detail", { length: 240 }).notNull(),
});

export const customLineups = mysqlTable("custom_lineups", {
  id: varchar("id", { length: 48 }).primaryKey(),
  ownerOpenId: varchar("ownerOpenId", { length: 64 }),
  name: varchar("name", { length: 120 }).notNull(),
  playerIds: json("playerIds").notNull(),
  formation: varchar("formation", { length: 20 }).notNull().default("4-3-3"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
