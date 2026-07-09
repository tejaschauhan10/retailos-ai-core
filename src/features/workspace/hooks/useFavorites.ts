import { useCallback, useEffect, useState } from "react";

import { useActiveOrg } from "@/providers/ActiveOrgProvider";

const STORAGE_PREFIX = "retailos.workspace.favorites";

function key(orgId: string | null): string {
  return `${STORAGE_PREFIX}:${orgId ?? "anon"}`;
}

function read(orgId: string | null): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key(orgId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(orgId: string | null, ids: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key(orgId), JSON.stringify(ids));
}

/**
 * Favorite modules — scoped by active organization, persisted in localStorage.
 * When a `user_preferences` table lands, this hook is the single migration point.
 */
export function useFavorites() {
  const { activeOrgId } = useActiveOrg();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read(activeOrgId));
  }, [activeOrgId]);

  const toggle = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        write(activeOrgId, next);
        return next;
      });
    },
    [activeOrgId],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, isFavorite, toggle };
}
