import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);
const seedsSource = await fs.readFile(new URL("client/src/lib/expandedPlayerSeeds.ts", root), "utf8");
const names = [...seedsSource.matchAll(/\["([^"\n]+)",\s*\d+(?:,\s*"[^"]+")?\]/g)].map((match) => match[1]);
const uniqueNames = [...new Set(names)];
const headers = { "User-Agent": "KoraKeda/1.0 player-library-image-map (https://footy-sim-kfztyeag.manus.space)" };

async function fetchOne(name) {
  const title = encodeURIComponent(name.replaceAll(" ", "_"));
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`, { headers });
    if (!response.ok) return null;
    const data = await response.json();
    const source = data?.thumbnail?.source;
    const pageTitle = data?.title;
    if (!source || !pageTitle || !/football|soccer|player|midfielder|defender|goalkeeper|forward/i.test(`${data.description ?? ""} ${data.extract ?? ""}`)) return null;
    return [name, source];
  } catch {
    return null;
  }
}

const results = [];
for (let index = 0; index < uniqueNames.length; index += 8) {
  const batch = uniqueNames.slice(index, index + 8);
  const resolved = await Promise.all(batch.map(fetchOne));
  results.push(...resolved.filter(Boolean));
  process.stdout.write(`\rResolved ${Math.min(index + batch.length, uniqueNames.length)}/${uniqueNames.length}`);
}

const entries = results.sort(([a], [b]) => a.localeCompare(b)).map(([name, url]) => `  ${JSON.stringify(name)}: ${JSON.stringify(url)},`).join("\n");
await fs.writeFile(new URL("client/src/lib/expandedPlayerImageMap.ts", root), `// Generated from Wikipedia REST page thumbnails. Review mappings before changing sources.\nexport const EXPANDED_PLAYER_IMAGE_URLS: Record<string, string> = {\n${entries}\n};\n`);
console.log(`\nWrote ${results.length} verified thumbnail mappings.`);
