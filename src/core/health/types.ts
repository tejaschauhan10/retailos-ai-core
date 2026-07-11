export type HealthStatus = "healthy" | "degraded" | "down" | "unknown";

export interface HealthResult {
  status: HealthStatus;
  message?: string;
  latencyMs?: number;
  checkedAt: string;
}

export interface HealthCheck {
  id: string;
  label: string;
  subsystem: "database" | "storage" | "api" | "ai" | "integrations" | "queues";
  run(): Promise<HealthResult>;
}