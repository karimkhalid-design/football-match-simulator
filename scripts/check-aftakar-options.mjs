import fs from "node:fs";
const source = fs.readFileSync("client/src/lib/aftakarData.ts", "utf8");
const catalogue = fs.readFileSync("client/src/lib/auctionData.ts", "utf8");
const names = [...source.matchAll(/options: \[(.*?)\]/g)].flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]));
const missing = [...new Set(names.filter((name) => !catalogue.includes(`name: "${name}"`)))];
console.log(JSON.stringify(missing, null, 2));
