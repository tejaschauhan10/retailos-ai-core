import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { roleHasPermission, type Permission } from "@/config/roles";

export function usePermission(permission: Permission): boolean {
  const { role } = useActiveOrg();
  if (!role) return false;
  return roleHasPermission(role, permission);
}

export function useAnyPermission(permissions: Permission[]): boolean {
  const { role } = useActiveOrg();
  if (!role) return false;
  return permissions.some((p) => roleHasPermission(role, p));
}