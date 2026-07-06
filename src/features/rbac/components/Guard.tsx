import type { ReactNode } from "react";

import type { Permission } from "@/config/roles";

import { usePermission } from "../hooks/usePermission";

interface GuardProps {
  permission: Permission;
  fallback?: ReactNode;
  children: ReactNode;
}

export function Guard({ permission, fallback = null, children }: GuardProps) {
  const allowed = usePermission(permission);
  return <>{allowed ? children : fallback}</>;
}