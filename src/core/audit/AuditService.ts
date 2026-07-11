import { logger } from "@/core/logger";

import type { AuditEntry, AuditSink } from "./types";

export class AuditService {
  private sinks = new Set<AuditSink>();

  registerSink(sink: AuditSink): () => void {
    this.sinks.add(sink);
    return () => this.sinks.delete(sink);
  }

  async log(
    entry: Omit<AuditEntry, "id" | "at"> &
      Partial<Pick<AuditEntry, "id" | "at">>,
  ): Promise<AuditEntry> {
    const full: AuditEntry = {
      id: entry.id ?? crypto.randomUUID(),
      at: entry.at ?? new Date().toISOString(),
      ...entry,
    };
    if (this.sinks.size === 0) {
      logger.debug("audit", full);
    } else {
      await Promise.all(
        Array.from(this.sinks).map(async (sink) => {
          try {
            await sink(full);
          } catch (error) {
            logger.error("audit sink failed", { error });
          }
        }),
      );
    }
    return full;
  }
}

export const auditService = new AuditService();