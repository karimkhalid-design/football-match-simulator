import { mkdir, writeFile } from "node:fs/promises";
import { playerCatalogue } from "../client/src/lib/auctionData";

type WikiPage = { title?: string; thumbnail?: { source?: string } };
type WikiPayload = { query?: { pages?: Record<string, WikiPage> } };

const sourceByName = new Map<string, string>();
const names = [...new Set(playerCatalogue.map((player) => player.name))];

for (let index = 0; index < names.length; index += 50) {
  const batch = names.slice(index, index + 50);
  const url = new URL("https://en.wikipedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    origin: "*",
    format: "json",
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "240",
    titles: batch.join("|"),
  }).toString();
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Wikipedia request failed: ${response.status}`);
  const payload = (await response.json()) as WikiPayload;
  for (const page of Object.values(payload.query?.pages ?? {})) {
    if (page.title && page.thumbnail?.source) sourceByName.set(page.title, page.thumbnail.source);
  }
}

const resolved: Record<string, string> = {};
for (const name of names) {
  const exact = sourceByName.get(name);
  const normalized = [...sourceByName.entries()].find(([title]) => title.toLowerCase() === name.toLowerCase())?.[1];
  if (exact || normalized) resolved[name] = exact ?? normalized!;
}

await mkdir("client/src/lib", { recursive: true });
await writeFile(
  "client/src/lib/playerImageMap.ts",
  `// Generated from Wikipedia page-image thumbnails. Keep URLs immutable per catalogue name.\nexport const PLAYER_IMAGE_URLS: Record<string, string> = ${JSON.stringify(resolved, null, 2)};\n`,
);
console.log(`Resolved ${Object.keys(resolved).length}/${names.length} player images.`);
