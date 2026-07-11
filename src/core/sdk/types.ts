import type { LucideIcon } from "lucide-react";

export type IntegrationCategory =
  | "accounting"
  | "billing"
  | "commerce"
  | "communication"
  | "payments"
  | "shipping"
  | "productivity"
  | "storage"
  | "ai";

export type IntegrationStatus = "healthy" | "degraded" | "down" | "unknown";

export interface IntegrationHealth {
  status: IntegrationStatus;
  latencyMs?: number;
  checkedAt: string;
  message?: string;
}

export interface IntegrationAuthContext {
  orgId: string;
  userId: string;
  redirectUri?: string;
}

export interface IntegrationSyncOptions {
  since?: string;
  cursor?: string;
  full?: boolean;
  signal?: AbortSignal;
}

export interface IntegrationSyncResult {
  ok: boolean;
  synced: number;
  cursor?: string;
  nextRunAt?: string;
  message?: string;
}

export interface Connector {
  id: string;
  provider: string;
  category: IntegrationCategory;
  label: string;
  description: string;
  icon?: LucideIcon;
  authenticate(ctx: IntegrationAuthContext): Promise<void>;
  sync(options: IntegrationSyncOptions): Promise<IntegrationSyncResult>;
  disconnect(): Promise<void>;
  health(): Promise<IntegrationHealth>;
}