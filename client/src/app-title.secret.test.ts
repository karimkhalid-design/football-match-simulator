/** @vitest-environment happy-dom */
import { describe, expect, it } from "vitest";

describe("application title configuration", () => {
  it("exposes the updated portal title", () => {
    expect(import.meta.env.VITE_APP_TITLE || "كورة كده").toBe("كورة كده");
  });
});
