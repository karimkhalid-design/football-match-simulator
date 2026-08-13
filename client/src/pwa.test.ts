import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const manifestPath = new URL("../public/manifest.webmanifest", import.meta.url);
const serviceWorkerPath = new URL("../public/sw.js", import.meta.url);

describe("Kora Keda iPhone PWA prototype", () => {
  it("has install metadata for a standalone portrait app", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest.name).toBe("كورة كده");
    expect(manifest.short_name).toBe("كورة كده");
    expect(manifest.display).toBe("standalone");
    expect(manifest.orientation).toBe("portrait");
    expect(manifest.start_url).toBe("/");
    expect(manifest.icons).toHaveLength(2);
    expect(manifest.icons.every((icon: { src: string }) => icon.src.includes("kora-keda-app-icon_9f5a2e2f.png"))).toBe(true);
  });

  it("ships a service worker for the installed prototype", () => {
    expect(existsSync(serviceWorkerPath)).toBe(true);
    const serviceWorker = readFileSync(serviceWorkerPath, "utf8");
    expect(serviceWorker).toContain("kora-keda-pwa-v3");
    expect(serviceWorker).toContain('event.request.mode === "navigate"');
  });

  it("ships a Safari fallback skip button in the HTML shell", () => {
    const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
    expect(html).toContain('id="safari-skip-fallback"');
    expect(html).toContain('rel="icon"');
    expect(html).toContain('content="كورة كده"');
    expect(html).toContain("<title>كورة كده — ألعاب كرة القدم</title>");
    expect(html).not.toContain("كوره كده");
    expect(html).toContain('rel="apple-touch-icon"');
    expect(html).toContain("kora-keda-app-icon_9f5a2e2f.png");
    expect(html).toContain('window.location.hash = "#hub"');
  });
});
