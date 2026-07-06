/**
 * Central role + permission registry.
 *
 * Roles are stored in `public.organization_members.role` (Postgres enum `app_role`).
 * Permissions live here — data-driven, never hardcoded in components.
 * Future modules extend PERMISSIONS and ROLE_PERMISSIONS, no component changes required.
 */

export const ROLES = [
  "owner",
  "manager",
  "cashier",
  "inventory_staff",
  "accountant",
] as const;

export type AppRole = (typeof ROLES)[number];

export const ROLE_META: Record<
  AppRole,
  { label: string; description: string }
> = {
  owner: {
    label: "Owner",
    description: "Full access, billing and organization settings.",
  },
  manager: {
    label: "Manager",
    description: "Manages staff, inventory and daily operations.",
  },
  cashier: {
    label: "Cashier",
    description: "Runs the point of sale and customer checkout.",
  },
  inventory_staff: {
    label: "Inventory Staff",
    description: "Receives stock, manages catalog and stock counts.",
  },
  accountant: {
    label: "Accountant",
    description: "Views financial reports and reconciles books.",
  },
};

/**
 * Namespaced permission keys. Modules add their own keys as they land.
 * Format: `<module>.<action>`.
 */
export const PERMISSIONS = [
  "org.settings.view",
  "org.settings.manage",
  "org.members.view",
  "org.members.manage",
  "dashboard.view",
  // Reserved namespaces for future modules — kept here so the registry is discoverable.
  // "crm.*", "inventory.*", "pos.*", "orders.*", "finance.*", "reports.*",
  // "suppliers.*", "marketing.*", "analytics.*", "ai.*", "automation.*"
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<AppRole, ReadonlyArray<Permission>> = {
  owner: [
    "org.settings.view",
    "org.settings.manage",
    "org.members.view",
    "org.members.manage",
    "dashboard.view",
  ],
  manager: [
    "org.settings.view",
    "org.members.view",
    "org.members.manage",
    "dashboard.view",
  ],
  cashier: ["dashboard.view"],
  inventory_staff: ["dashboard.view"],
  accountant: ["dashboard.view"],
};

export function roleHasPermission(role: AppRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}