import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";

import type { Permission } from "./roles";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  permission?: Permission;
  disabled?: boolean;
  badge?: string;
  comingSoon?: boolean;
  description?: string;
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
    label: "Home",
    items: [
      {
        label: "Dashboard",
        to: "/app",
        icon: LayoutDashboard,
        permission: "dashboard.view",
        description: "Your workspace overview",
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        label: "Customers",
        to: "/app/customers",
        icon: Users,
        comingSoon: true,
        description: "CRM, loyalty and segments",
      },
      {
        label: "Products",
        to: "/app/products",
        icon: ShoppingBag,
        comingSoon: true,
        description: "Catalog, variants and pricing",
      },
      {
        label: "Inventory",
        to: "/app/inventory",
        icon: Boxes,
        comingSoon: true,
        description: "Stock, transfers and counts",
      },
      {
        label: "Orders",
        to: "/app/orders",
        icon: Package,
        comingSoon: true,
        description: "Sales orders and fulfilment",
      },
      {
        label: "Point of Sale",
        to: "/app/pos",
        icon: ShoppingCart,
        comingSoon: true,
        description: "In-store checkout terminal",
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        label: "Reports",
        to: "/app/reports",
        icon: BarChart3,
        comingSoon: true,
        description: "Sales, stock and staff reports",
      },
      {
        label: "Finance",
        to: "/app/finance",
        icon: Receipt,
        comingSoon: true,
        description: "Ledgers, GST and payouts",
      },
      {
        label: "AI Copilot",
        to: "/app/ai",
        icon: Sparkles,
        comingSoon: true,
        description: "Ask questions across your store",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Billing",
        to: "/app/billing",
        icon: CreditCard,
        comingSoon: true,
        description: "Plans, invoices and usage",
      },
      {
        label: "Settings",
        to: "/app/settings",
        icon: Settings,
        permission: "org.settings.view",
        description: "Organization and preferences",
      },
      {
        label: "Help & Support",
        to: "/app/help",
        icon: LifeBuoy,
        comingSoon: true,
        description: "Docs, guides and contact us",
      },
    ],
  },
];

// Flat lookup for breadcrumbs and command palette.
export const NAV_LABELS: Record<string, string> = Object.fromEntries(
  APP_NAV.flatMap((g) => g.items.map((i) => [i.to, i.label] as const)),
);

export function getAllNavItems(): NavItem[] {
  return APP_NAV.flatMap((g) => g.items);
}

export { CircleHelp };