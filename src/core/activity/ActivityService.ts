import { eventBus } from "@/core/events";

import type { ActivityListener, ActivityRecord } from "./types";

export class ActivityService {
  private buffer: ActivityRecord[] = [];
  private listeners = new Set<ActivityListener>();
  private capacity = 200;

  record(
    activity: Omit<ActivityRecord, "id" | "at"> &
      Partial<Pick<ActivityRecord, "id" | "at">>,
  ): ActivityRecord {
    const full: ActivityRecord = {
      id: activity.id ?? crypto.randomUUID(),
      at: activity.at ?? new Date().toISOString(),
      ...activity,
    };
    this.buffer.unshift(full);
    if (this.buffer.length > this.capacity) this.buffer.length = this.capacity;
    this.listeners.forEach((l) => l(full));
    void eventBus.emit(`activity.${full.type}`, full);
    return full;
  }

  list(limit = 20): ActivityRecord[] {
    return this.buffer.slice(0, limit);
  }

  subscribe(listener: ActivityListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  clear(): void {
    this.buffer = [];
  }
}

export const activityService = new ActivityService();