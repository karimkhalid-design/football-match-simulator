export type CataloguePlayer = {
  name: string;
  nationality: string;
  position: string;
  club: string;
  status: "active" | "retired";
};

export type PlayerFilters = {
  search: string;
  position: string;
  status: string;
  club: string;
  nationality: string;
};

export function filterPlayers<T extends CataloguePlayer>(players: T[], filters: PlayerFilters) {
  const query = filters.search.trim().toLowerCase();
  return players.filter((player) => {
    const searchable = `${player.name} ${player.nationality} ${player.club}`.toLowerCase();
    return (!query || searchable.includes(query)) &&
      (filters.position === "all" || player.position === filters.position) &&
      (filters.status === "all" || player.status === filters.status) &&
      (filters.club === "all" || player.club === filters.club) &&
      (filters.nationality === "all" || player.nationality === filters.nationality);
  });
}
