import { useEffect } from "react";

import { eventBus } from "@/core/events";
import type { AppEventMap, EventEnvelope } from "@/core/events";

export function useEventBus<K extends keyof AppEventMap>(
  name: K,
  handler: (event: EventEnvelope<AppEventMap[K]>) => void | Promise<void>,
  deps: unknown[] = [],
): void {
  useEffect(() => {
    const sub = eventBus.on(name, handler);
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}