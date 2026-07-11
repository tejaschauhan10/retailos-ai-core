import { logger } from "@/core/logger";

import type {
  AppEventMap,
  EventEnvelope,
  EventHandler,
  EventName,
  Subscription,
} from "./types";

/**
 * In-memory pub/sub bus. Safe for SSR (no globals) and deterministic.
 * Future adapters (BroadcastChannel, Supabase Realtime, backend queue)
 * plug in by implementing the same surface.
 */
export class EventBus {
  private handlers = new Map<EventName, Set<EventHandler>>();

  on<K extends keyof AppEventMap>(
    name: K,
    handler: EventHandler<AppEventMap[K]>,
  ): Subscription;
  on<TPayload>(name: EventName, handler: EventHandler<TPayload>): Subscription;
  on(name: EventName, handler: EventHandler): Subscription {
    const set = this.handlers.get(name) ?? new Set();
    set.add(handler);
    this.handlers.set(name, set);
    return { unsubscribe: () => set.delete(handler) };
  }

  once<K extends keyof AppEventMap>(
    name: K,
    handler: EventHandler<AppEventMap[K]>,
  ): Subscription {
    const sub = this.on(name, async (event) => {
      sub.unsubscribe();
      await handler(event as EventEnvelope<AppEventMap[K]>);
    });
    return sub;
  }

  async emit<K extends keyof AppEventMap>(
    name: K,
    payload: AppEventMap[K],
    meta?: Partial<Omit<EventEnvelope, "name" | "payload" | "at">>,
  ): Promise<void>;
  async emit<TPayload>(
    name: EventName,
    payload: TPayload,
    meta?: Partial<Omit<EventEnvelope, "name" | "payload" | "at">>,
  ): Promise<void>;
  async emit(
    name: EventName,
    payload: unknown,
    meta: Partial<Omit<EventEnvelope, "name" | "payload" | "at">> = {},
  ): Promise<void> {
    const envelope: EventEnvelope = {
      name,
      at: new Date().toISOString(),
      payload,
      ...meta,
    };
    const set = this.handlers.get(name);
    if (!set || set.size === 0) return;
    await Promise.all(
      Array.from(set).map(async (handler) => {
        try {
          await handler(envelope);
        } catch (error) {
          logger.error("EventBus handler failed", { name, error });
        }
      }),
    );
  }

  clear(name?: EventName): void {
    if (name) this.handlers.delete(name);
    else this.handlers.clear();
  }
}

export const eventBus = new EventBus();