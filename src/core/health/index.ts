export * from "./types";

import type { HealthCheck, HealthResult } from "./types";

const checks = new Map<string, HealthCheck>();

export function registerHealthCheck(check: HealthCheck): () => void {
  checks.set(check.id, check);
  return () => checks.delete(check.id);
}

export function listHealthChecks(): HealthCheck[] {
  return Array.from(checks.values());
}

export async function runHealthChecks(): Promise<Record<string, HealthResult>> {
  const results: Record<string, HealthResult> = {};
  await Promise.all(
    listHealthChecks().map(async (c) => {
      try {
        results[c.id] = await c.run();
      } catch (error) {
        results[c.id] = {
          status: "down",
          message: error instanceof Error ? error.message : String(error),
          checkedAt: new Date().toISOString(),
        };
      }
    }),
  );
  return results;
}