import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiClient } from "@/core/api/ApiClient";
import { AppError } from "@/core/errors/AppError";

describe("ApiClient", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("parses JSON responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const client = new ApiClient();
    const res = await client.get<{ ok: boolean }>("https://example.test/x");
    expect(res.data.ok).toBe(true);
  });

  it("throws AppError with correct kind on 404", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 404 })));
    const client = new ApiClient({ retry: { retries: 0 } });
    await expect(client.get("https://example.test/y")).rejects.toMatchObject({
      kind: "not_found",
      status: 404,
    });
  });
});
