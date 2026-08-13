import { describe, expect, it } from "vitest";

describe("Supabase realtime configuration", () => {
  it("accepts the configured project URL and service key", async () => {
    const baseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(baseUrl).toMatch(/^https:\/\/[^\s]+$/);
    expect(serviceKey).toBeTruthy();
    const response = await fetch(`${baseUrl}/rest/v1/`, {
      headers: {
        apikey: serviceKey as string,
        Authorization: `Bearer ${serviceKey}`,
      },
    });
    expect([200, 204]).toContain(response.status);
  }, 15000);
});
