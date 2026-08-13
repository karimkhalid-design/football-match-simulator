import type { CareerStop } from "./footballCatalog";

export const careerArchive: Record<string, CareerStop[]> = {
  "Cristiano Ronaldo": [
    { period: "2002–2003", club: "Sporting CP", appearances: 31, goals: 5, note: "Senior debut" },
    { period: "2003–2009", club: "Manchester United", appearances: 292, goals: 118, note: "First Ballon d'Or era" },
    { period: "2009–2018", club: "Real Madrid", appearances: 438, goals: 450, note: "Record scoring era" },
    { period: "2018–2021", club: "Juventus", appearances: 134, goals: 101, note: "Serie A chapter" },
    { period: "2021–2022", club: "Manchester United", appearances: 54, goals: 27, note: "Return chapter" },
    { period: "2023–present", club: "Al Nassr", appearances: 0, goals: 0, note: "Current chapter" },
  ],
  "Lionel Messi": [
    { period: "2003–2004", club: "Barcelona B", appearances: 22, goals: 6, note: "Reserve-team chapter" },
    { period: "2004–2021", club: "Barcelona", appearances: 778, goals: 672, note: "Academy to first-team legacy" },
    { period: "2021–2023", club: "Paris Saint-Germain", appearances: 75, goals: 32, note: "Ligue 1 chapter" },
    { period: "2023–present", club: "Inter Miami", appearances: 0, goals: 0, note: "Current chapter" },
    { period: "National team", club: "Argentina", appearances: 0, goals: 0, note: "International legacy" },
  ],
  "Ronaldo Nazário": [
    { period: "1993–1994", club: "Cruzeiro", appearances: 58, goals: 56, note: "Breakthrough" },
    { period: "1994–1996", club: "PSV Eindhoven", appearances: 57, goals: 54, note: "European launch" },
    { period: "1996–1997", club: "Barcelona", appearances: 49, goals: 47, note: "La Liga chapter" },
    { period: "1997–2002", club: "Inter", appearances: 99, goals: 59, note: "Serie A chapter" },
    { period: "2002–2007", club: "Real Madrid", appearances: 177, goals: 104, note: "Galácticos era" },
    { period: "2009–2011", club: "Corinthians", appearances: 69, goals: 35, note: "Final chapter" },
  ],
  "Zinedine Zidane": [
    { period: "1989–1992", club: "Cannes", appearances: 71, goals: 6, note: "Professional debut" },
    { period: "1992–1996", club: "Bordeaux", appearances: 179, goals: 39, note: "Breakthrough era" },
    { period: "1996–2001", club: "Juventus", appearances: 212, goals: 31, note: "Serie A chapter" },
    { period: "2001–2006", club: "Real Madrid", appearances: 230, goals: 49, note: "Final playing era" },
    { period: "National team", club: "France", appearances: 108, goals: 31, note: "International legacy" },
  ],
  "Ronaldinho": [
    { period: "1998–2001", club: "Grêmio", appearances: 72, goals: 28, note: "Brazilian breakthrough" },
    { period: "2001–2003", club: "Paris Saint-Germain", appearances: 77, goals: 25, note: "European arrival" },
    { period: "2003–2008", club: "Barcelona", appearances: 207, goals: 94, note: "Peak era" },
    { period: "2008–2011", club: "AC Milan", appearances: 95, goals: 26, note: "Serie A chapter" },
    { period: "2011–2012", club: "Flamengo", appearances: 72, goals: 28, note: "Brazil return" },
  ],
  "Thierry Henry": [
    { period: "1994–1999", club: "Monaco", appearances: 141, goals: 28, note: "Professional breakthrough" },
    { period: "1999", club: "Juventus", appearances: 19, goals: 3, note: "Serie A chapter" },
    { period: "1999–2007", club: "Arsenal", appearances: 377, goals: 228, note: "Club-record scoring era" },
    { period: "2007–2010", club: "Barcelona", appearances: 121, goals: 49, note: "Treble era" },
    { period: "2010–2014", club: "New York Red Bulls", appearances: 135, goals: 52, note: "Final league chapter" },
  ],
};

export function getPlayerCareer(input: {
  name: string;
  status: "active" | "retired";
  teamName: string;
  appearances: number;
  goals: number;
  overall: number;
}): CareerStop[] {
  const curated = careerArchive[input.name];
  if (curated) return curated;
  const isRetired = input.status === "retired";
  const surname = input.name.split(" ").at(-1) ?? input.name;
  return [
    { period: isRetired ? "Academy years" : "Development", club: `${surname} Academy`, appearances: Math.max(12, Math.round(input.appearances * 0.08)), goals: Math.max(0, Math.round(input.goals * 0.04)), note: "Starter archive" },
    { period: isRetired ? "Early senior" : "First senior cycle", club: "Professional debut", appearances: Math.max(24, Math.round(input.appearances * 0.16)), goals: Math.max(0, Math.round(input.goals * 0.1)), note: "Senior archive" },
    { period: isRetired ? "Peak years" : "Breakthrough", club: "Professional first team", appearances: Math.max(42, Math.round(input.appearances * 0.28)), goals: Math.max(0, Math.round(input.goals * 0.25)), note: `Performance index ${input.overall}` },
    { period: isRetired ? "Final era" : "Established cycle", club: "Elite competition", appearances: Math.max(34, Math.round(input.appearances * 0.21)), goals: Math.max(0, Math.round(input.goals * 0.21)), note: isRetired ? "Legacy archive" : "Squad archive" },
    { period: isRetired ? "Legacy archive" : "Current cycle", club: input.teamName, appearances: Math.max(20, Math.round(input.appearances * 0.27)), goals: Math.max(0, Math.round(input.goals * 0.4)), note: isRetired ? "Hall of Fame record" : "Active squad record" },
  ];
}
