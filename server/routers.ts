import { nanoid } from "nanoid";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { findPlayer, findTeam, getCatalogue } from "./footballCatalog";
import { getMatchById, getRecentMatches, getStoredTeams, persistMatch, syncCatalogue, syncTeams } from "./db";
import { simulateMatch } from "../shared/football";

const playerFilters = z.object({
  search: z.string().optional(),
  nationality: z.string().optional(),
  position: z.enum(["GK", "DF", "MF", "FW"]).optional(),
  club: z.string().optional(),
  status: z.enum(["active", "retired"]).optional(),
});

const matchInput = z.object({
  homeTeamId: z.string(),
  awayTeamId: z.string(),
  homePlayerIds: z.array(z.string()).max(18).optional(),
  awayPlayerIds: z.array(z.string()).max(18).optional(),
});

let catalogueSyncStarted = false;

function selectedPlayers(ids: string[] | undefined, fallbackIds: string[]) {
  const selected = (ids?.length ? ids : fallbackIds).map(findPlayer).filter((player): player is NonNullable<typeof player> => Boolean(player));
  return selected;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  football: router({
    catalogue: publicProcedure.query(async () => {
      const catalogue = getCatalogue();
      await syncTeams(catalogue.teams);
      if (!catalogueSyncStarted) {
        catalogueSyncStarted = true;
        void syncCatalogue([], catalogue.players);
      }
      const storedTeams = await getStoredTeams();
      return { ...catalogue, teams: storedTeams.length ? storedTeams : catalogue.teams };
    }),
    players: publicProcedure.input(playerFilters).query(({ input }) => {
      const query = input.search?.trim().toLowerCase();
      return getCatalogue().players.filter((player) => {
        const searchable = `${player.name} ${player.nationality} ${player.club}`.toLowerCase();
        return (!query || searchable.includes(query)) &&
          (!input.nationality || player.nationality === input.nationality) &&
          (!input.position || player.position === input.position) &&
          (!input.club || player.club === input.club) &&
          (!input.status || player.status === input.status);
      });
    }),
    player: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
      const player = findPlayer(input.id);
      if (!player) throw new Error("Player not found");
      return player;
    }),
    simulate: publicProcedure.input(matchInput).mutation(async ({ input, ctx }) => {
      const homeTeam = findTeam(input.homeTeamId);
      const awayTeam = findTeam(input.awayTeamId);
      if (!homeTeam || !awayTeam || homeTeam.id === awayTeam.id) throw new Error("Select two different teams");
      const homeSelection = selectedPlayers(input.homePlayerIds, homeTeam.playerIds);
      const awaySelection = selectedPlayers(input.awayPlayerIds, awayTeam.playerIds);
      const homeStrength = homeSelection.length ? Math.round(homeSelection.reduce((sum, player) => sum + player.overall, 0) / homeSelection.length) : homeTeam.strength;
      const awayStrength = awaySelection.length ? Math.round(awaySelection.reduce((sum, player) => sum + player.overall, 0) / awaySelection.length) : awayTeam.strength;
      const result = simulateMatch({ id: homeTeam.id, name: homeTeam.name, strength: homeStrength, playerNames: homeSelection.map((player) => player.name) }, { id: awayTeam.id, name: awayTeam.name, strength: awayStrength, playerNames: awaySelection.map((player) => player.name) });
      const id = nanoid(14);
      await persistMatch({ id, ownerOpenId: ctx.user?.openId, homeTeamId: homeTeam.id, homeTeamName: homeTeam.name, awayTeamId: awayTeam.id, awayTeamName: awayTeam.name, homePlayerIds: homeSelection.map((player) => player.id), awayPlayerIds: awaySelection.map((player) => player.id), result });
      return { id, homeTeam, awayTeam, homeSelection, awaySelection, result };
    }),
    history: publicProcedure.query(() => getRecentMatches()),
    match: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
      const match = await getMatchById(input.id);
      if (!match) throw new Error("Match not found");
      return match;
    }),
  }),
});

export type AppRouter = typeof appRouter;
