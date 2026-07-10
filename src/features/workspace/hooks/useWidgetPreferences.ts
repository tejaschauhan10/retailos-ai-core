import { useCallback, useEffect, useMemo, useState } from "react";

import { getDefaultWidgetIds, WIDGET_REGISTRY, type WorkspaceWidget } from "@/config/widgets";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";

const STORAGE_PREFIX = "retailos.workspace.widgets";

interface Prefs {
  order: string[];
  hidden: string[];
  pinned: string[];
}

function key(orgId: string | null): string {
  return `${STORAGE_PREFIX}:${orgId ?? "anon"}`;
}

function read(orgId: string | null): Prefs {
  const empty: Prefs = { order: getDefaultWidgetIds(), hidden: [], pinned: [] };
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(key(orgId));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      order: Array.isArray(parsed.order) ? parsed.order.filter((x): x is string => typeof x === "string") : empty.order,
      hidden: Array.isArray(parsed.hidden) ? parsed.hidden.filter((x): x is string => typeof x === "string") : [],
      pinned: Array.isArray(parsed.pinned) ? parsed.pinned.filter((x): x is string => typeof x === "string") : [],
    };
  } catch {
    return empty;
  }
}

function write(orgId: string | null, prefs: Prefs): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key(orgId), JSON.stringify(prefs));
}

/**
 * Widget personalization — pin, hide, reorder, reset. Org-scoped,
 * localStorage today, ready to migrate to `user_preferences` table.
 */
export function useWidgetPreferences() {
  const { activeOrgId } = useActiveOrg();
  const [prefs, setPrefs] = useState<Prefs>(() => read(activeOrgId));

  useEffect(() => {
    setPrefs(read(activeOrgId));
  }, [activeOrgId]);

  const persist = useCallback(
    (updater: (prev: Prefs) => Prefs) => {
      setPrefs((prev) => {
        const next = updater(prev);
        write(activeOrgId, next);
        return next;
      });
    },
    [activeOrgId],
  );

  const togglePinned = useCallback(
    (id: string) =>
      persist((prev) => ({
        ...prev,
        pinned: prev.pinned.includes(id) ? prev.pinned.filter((x) => x !== id) : [...prev.pinned, id],
      })),
    [persist],
  );

  const toggleHidden = useCallback(
    (id: string) =>
      persist((prev) => ({
        ...prev,
        hidden: prev.hidden.includes(id) ? prev.hidden.filter((x) => x !== id) : [...prev.hidden, id],
      })),
    [persist],
  );

  const reset = useCallback(
    () => persist(() => ({ order: getDefaultWidgetIds(), hidden: [], pinned: [] })),
    [persist],
  );

  const visibleWidgets: WorkspaceWidget[] = useMemo(() => {
    const byId = new Map(WIDGET_REGISTRY.map((w) => [w.id, w] as const));
    const ordered = [
      ...prefs.order.map((id) => byId.get(id)).filter((w): w is WorkspaceWidget => Boolean(w)),
      ...WIDGET_REGISTRY.filter((w) => !prefs.order.includes(w.id)),
    ];
    const notHidden = ordered.filter((w) => !prefs.hidden.includes(w.id));
    const pinned = notHidden.filter((w) => prefs.pinned.includes(w.id));
    const rest = notHidden.filter((w) => !prefs.pinned.includes(w.id));
    return [...pinned, ...rest];
  }, [prefs]);

  const isPinned = useCallback((id: string) => prefs.pinned.includes(id), [prefs]);
  const isHidden = useCallback((id: string) => prefs.hidden.includes(id), [prefs]);

  return { prefs, visibleWidgets, togglePinned, toggleHidden, reset, isPinned, isHidden };
}
