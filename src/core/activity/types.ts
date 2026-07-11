/**
 * Activity feed contracts. Modules publish activities via `activityService`;
 * the workspace timeline / audit / notification services subscribe.
 */

export type ActivitySeverity = "info" | "success" | "warning" | "critical";

export interface ActivityActor {
  id: string;
  name?: string;
  avatarUrl?: string;
  type?: "user" | "system" | "integration" | "ai";
}

export interface ActivityTarget {
  type: string;
  id: string;
  label?: string;
  route?: string;
}

export interface ActivityRecord {
  id: string;
  type: string;
  message: string;
  severity: ActivitySeverity;
  actor: ActivityActor;
  target?: ActivityTarget;
  orgId?: string;
  at: string;
  metadata?: Record<string, unknown>;
}

export type ActivityListener = (activity: ActivityRecord) => void;