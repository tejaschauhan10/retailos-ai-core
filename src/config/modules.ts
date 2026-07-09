import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  Building2,
  Gauge,
  LineChart,
  Megaphone,
  PieChart,
  PlugZap,
  Receipt,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  UserCog,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";

import type { FeatureFlag } from "@/core/config/featureFlags";
import type { Permission } from "@/config/roles";

/**
 * Module Registry — the single source of truth for the Retail Workspace.
 * Every application module (current or future) MUST register here.
 * The Workspace launcher, command palette and global search render
 * dynamically from this list. Never hardcode module cards in components.
 */

export const MODULE_CATEGORIES = ["operations", "intelligence", "platform"] as const;
export type ModuleCategoryId = (typeof MODULE_CATEGORIES)[number];

export interface ModuleCategoryMeta {
  id: ModuleCategoryId;
  label: string;
  description: string;
  accent: string;
}

export const MODULE_CATEGORY_META: Record<ModuleCategoryId, ModuleCategoryMeta> = {
  operations: {
    id: "operations",
    label: "Operations",
    description: "Run the day-to-day of your retail business.",
    accent: "text-brand",
  },
  intelligence: {
    id: "intelligence",
    label: "Intelligence",
    description: "AI, analytics and forecasting across your store.",
    accent: "text-violet-500",
  },
  platform: {
    id: "platform",
    label: "Platform",
    description: "Reports, integrations and administration.",
    accent: "text-emerald-500",
  },
};

export type ModuleStatus = "live" | "beta" | "coming_soon" | "planned";
export type ModulePlan = "starter" | "growth" | "enterprise";

export interface WorkspaceModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  category: ModuleCategoryId;
  status: ModuleStatus;
  featureFlag?: FeatureFlag;
  requiredPlan?: ModulePlan;
  permissions?: Permission[];
  comingSoon?: boolean;
  shortcut?: string;
  keywords?: string[];
}

export const MODULE_REGISTRY: WorkspaceModule[] = [
  { id: "customers", title: "Customer CRM", description: "Profiles, loyalty, segments and journeys.", icon: Users, route: "/app/customers", category: "operations", status: "coming_soon", featureFlag: "crm", requiredPlan: "starter", comingSoon: true, shortcut: "G C", keywords: ["crm", "clients", "loyalty"] },
  { id: "products", title: "Products", description: "Catalog, variants, pricing and media.", icon: ShoppingBag, route: "/app/products", category: "operations", status: "coming_soon", featureFlag: "products", requiredPlan: "starter", comingSoon: true, shortcut: "G P", keywords: ["catalog", "sku"] },
  { id: "inventory", title: "Inventory", description: "Stock, transfers, counts and adjustments.", icon: Boxes, route: "/app/inventory", category: "operations", status: "coming_soon", featureFlag: "inventory", requiredPlan: "starter", comingSoon: true, keywords: ["stock", "warehouse"] },
  { id: "sales", title: "Sales", description: "Orders, quotes, returns and fulfilment.", icon: TrendingUp, route: "/app/sales", category: "operations", status: "coming_soon", featureFlag: "orders", requiredPlan: "starter", comingSoon: true },
  { id: "billing", title: "Billing", description: "Invoices, receipts and tax documents.", icon: Receipt, route: "/app/billing", category: "operations", status: "coming_soon", featureFlag: "billing", requiredPlan: "starter", comingSoon: true },
  { id: "pos", title: "Point of Sale", description: "In-store checkout with tender and receipts.", icon: ShoppingCart, route: "/app/pos", category: "operations", status: "coming_soon", featureFlag: "pos", requiredPlan: "growth", comingSoon: true, shortcut: "G O" },
  { id: "suppliers", title: "Suppliers", description: "Purchase orders, vendors and receiving.", icon: Truck, route: "/app/suppliers", category: "operations", status: "coming_soon", comingSoon: true },
  { id: "employees", title: "Employees", description: "Staff, shifts and attendance.", icon: UserCog, route: "/app/employees", category: "operations", status: "coming_soon", comingSoon: true },
  { id: "marketing", title: "Marketing", description: "Campaigns, coupons and WhatsApp broadcasts.", icon: Megaphone, route: "/app/marketing", category: "operations", status: "coming_soon", featureFlag: "marketing", requiredPlan: "growth", comingSoon: true },
  { id: "bi", title: "Business Intelligence", description: "Cross-module KPIs and executive dashboards.", icon: Gauge, route: "/app/intelligence/business", category: "intelligence", status: "coming_soon", featureFlag: "analytics", requiredPlan: "growth", comingSoon: true },
  { id: "customer-intelligence", title: "Customer Intelligence", description: "Cohorts, RFM and lifetime value analytics.", icon: PieChart, route: "/app/intelligence/customers", category: "intelligence", status: "coming_soon", featureFlag: "analytics", requiredPlan: "growth", comingSoon: true },
  { id: "inventory-intelligence", title: "Inventory Intelligence", description: "Stock health, ageing and dead stock signals.", icon: Boxes, route: "/app/intelligence/inventory", category: "intelligence", status: "coming_soon", featureFlag: "analytics", requiredPlan: "growth", comingSoon: true },
  { id: "sales-intelligence", title: "Sales Intelligence", description: "Trends, category mix and staff performance.", icon: LineChart, route: "/app/intelligence/sales", category: "intelligence", status: "coming_soon", featureFlag: "analytics", requiredPlan: "growth", comingSoon: true },
  { id: "finance-intelligence", title: "Finance Intelligence", description: "Margins, cash flow and P&L insights.", icon: Wallet, route: "/app/intelligence/finance", category: "intelligence", status: "coming_soon", featureFlag: "finance", requiredPlan: "enterprise", comingSoon: true },
  { id: "forecasting", title: "Forecasting", description: "Demand, replenishment and revenue forecasts.", icon: Target, route: "/app/intelligence/forecasting", category: "intelligence", status: "planned", featureFlag: "analytics", requiredPlan: "enterprise", comingSoon: true },
  { id: "ai-copilot", title: "AI Copilot", description: "Ask questions across your store's data.", icon: Sparkles, route: "/app/ai", category: "intelligence", status: "coming_soon", featureFlag: "aiAssistant", requiredPlan: "growth", comingSoon: true, shortcut: "⌘ /", keywords: ["ai", "assistant", "chat", "copilot"] },
  { id: "automation", title: "Automation", description: "Workflows, triggers and background jobs.", icon: Workflow, route: "/app/automation", category: "intelligence", status: "planned", featureFlag: "automation", requiredPlan: "enterprise", comingSoon: true },
  { id: "reports", title: "Reports", description: "Sales, stock, staff and finance reports.", icon: BarChart3, route: "/app/reports", category: "platform", status: "coming_soon", featureFlag: "reports", requiredPlan: "starter", comingSoon: true },
  { id: "integrations", title: "Integrations", description: "Payments, accounting, shipping and comms.", icon: PlugZap, route: "/app/integrations", category: "platform", status: "coming_soon", featureFlag: "integrations", comingSoon: true },
  { id: "marketplace", title: "Marketplace", description: "Extensions and partner apps from the ecosystem.", icon: Store, route: "/app/marketplace", category: "platform", status: "planned", featureFlag: "marketplace", comingSoon: true },
  { id: "settings", title: "Settings", description: "Organization, preferences and branding.", icon: Settings, route: "/app/settings", category: "platform", status: "live", permissions: ["org.settings.view"], shortcut: "⌘ ," },
  { id: "administration", title: "Administration", description: "Team, roles, billing and workspace controls.", icon: Building2, route: "/app/administration", category: "platform", status: "coming_soon", permissions: ["org.members.manage"], comingSoon: true },
];

export function getModulesByCategory(category: ModuleCategoryId): WorkspaceModule[] {
  return MODULE_REGISTRY.filter((m) => m.category === category);
}

export function getModuleById(id: string): WorkspaceModule | undefined {
  return MODULE_REGISTRY.find((m) => m.id === id);
}
