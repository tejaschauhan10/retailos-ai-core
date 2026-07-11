export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "restore"
  | "export"
  | "import"
  | "permission_change"
  | "settings_change"
  | "login"
  | "logout";

export interface AuditEntry {
  id: string;
  at: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  actorId?: string;
  orgId?: string;
  ip?: string;
  userAgent?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export type AuditSink = (entry: AuditEntry) => void | Promise<void>;