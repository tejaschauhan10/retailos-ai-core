import { useCallback, useEffect, useState } from "react";

import { useActiveOrg } from "@/providers/ActiveOrgProvider";

const STORAGE_PREFIX = "retailos.workspace.recent";
const MAX_RECENTS = 6;

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

export function useRecentWorkspaces() {
  const { activeOrgId } = useActiveOrg();
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    setRecents(read(activeOrgId));
  }, [activeOrgId]);

  const push = useCallback(
    (id: string) => {
      setRecents((prev) => {
        const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX_RECENTS);
        write(activeOrgId, next);
        return next;
      });
    },
    [activeOrgId],
  );

  return { recents, push };
}
