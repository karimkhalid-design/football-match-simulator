import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const manifestPath = new URL("../public/manifest.webmanifest", import.meta.url);
const serviceWorkerPath = new URL("../public/sw.js", import.meta.url);

describe("Kora Keda iPhone PWA prototype", () => {
  it("has install metadata for a standalone portrait app", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest.name).toBe("كوره كده");
    expect(manifest.display).toBe("standalone");
    expect(manifest.orientation).toBe("portrait");
    expect(manifest.start_url).toBe("/");
    expect(manifest.icons).toHaveLength(2);
  });

  it("ships a service worker for the installed prototype", () => {
    expect(existsSync(serviceWorkerPath)).toBe(true);
    expect(readFileSync(serviceWorkerPath, "utf8")).toContain("kora-keda-pwa-v1");
  });
});
