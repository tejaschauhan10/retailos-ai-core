import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Settings } from "lucide-react";

import type { Permission } from "./roles";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  permission?: Permission;
  disabled?: boolean;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * Sidebar navigation. Modules append groups here as they land.
 * Empty placeholders are intentionally omitted — we don't ship dead links.
 */
export const APP_NAV: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        to: "/app",
        icon: LayoutDashboard,
        permission: "dashboard.view",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Settings",
        to: "/app/settings",
        icon: Settings,
        permission: "org.settings.view",
      },
    ],
  },
];