import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AppRole } from "@/config/roles";
import { useMyMemberships } from "@/features/organization/hooks/useMyMemberships";
import type { OrganizationMembership } from "@/features/organization/types";

const STORAGE_KEY = "retailos.activeOrgId";

interface ActiveOrgContextValue {
  activeOrgId: string | null;
  activeMembership: OrganizationMembership | null;
  memberships: OrganizationMembership[];
  role: AppRole | null;
  isLoading: boolean;
  setActiveOrgId: (id: string) => void;
  hasOrganization: boolean;
}

const ActiveOrgContext = createContext<ActiveOrgContextValue | undefined>(
  undefined,
);

export function ActiveOrgProvider({ children }: { children: ReactNode }) {
  const { data: memberships = [], isLoading } = useMyMemberships();
  const [activeOrgId, setActiveOrgIdState] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    if (isLoading || memberships.length === 0) return;
    const exists = memberships.some((m) => m.organization_id === activeOrgId);
    if (!exists) {
      const next = memberships[0]?.organization_id ?? null;
      setActiveOrgIdState(next);
      if (typeof window !== "undefined" && next) {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
    }
  }, [memberships, activeOrgId, isLoading]);

  const setActiveOrgId = useCallback((id: string) => {
    setActiveOrgIdState(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  const activeMembership = useMemo(
    () => memberships.find((m) => m.organization_id === activeOrgId) ?? null,
    [memberships, activeOrgId],
  );

  const value = useMemo<ActiveOrgContextValue>(
    () => ({
      activeOrgId,
      activeMembership,
      memberships,
      role: activeMembership?.role ?? null,
      isLoading,
      setActiveOrgId,
      hasOrganization: memberships.length > 0,
    }),
    [activeOrgId, activeMembership, memberships, isLoading, setActiveOrgId],
  );

  return (
    <ActiveOrgContext.Provider value={value}>
      {children}
    </ActiveOrgContext.Provider>
  );
}

export function useActiveOrg(): ActiveOrgContextValue {
  const ctx = useContext(ActiveOrgContext);
  if (!ctx)
    throw new Error("useActiveOrg must be used inside <ActiveOrgProvider>");
  return ctx;
}