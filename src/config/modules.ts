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
  Warehouse,
  ClipboardList,
  Landmark,
} from "lucide-react";

import type { FeatureFlag } from "@/core/config/featureFlags";
import type { Permission } from "@/config/roles";
import type { PlanId } from "@/config/plans";

/**
 * Module Registry — the single source of truth for the Retail Workspace.
 * Every application module (current or future) MUST register here.
 * The Workspace launcher, navigation, command palette, global search and
 * future Marketplace render dynamically from this list. Never hardcode
 * module cards, nav entries or search entities in components.
 */

export const MODULE_CATEGORIES = ["operations", "intelligence", "platform"] as const;
export type ModuleCategoryId = (typeof MODULE_CATEGORIES)[number];

export interface ModuleCategoryMeta {
  id: ModuleCategoryId;
  label: string;
  description: string;
  accent: string;
  order: number;
}

export const MODULE_CATEGORY_META: Record<ModuleCategoryId, ModuleCategoryMeta> = {
  operations: {
    id: "operations",
    label: "Operations",
    description: "Run the day-to-day of your retail business.",
    accent: "text-brand",
    order: 0,
  },
  intelligence: {
    id: "intelligence",
    label: "Intelligence",
    description: "AI, analytics and forecasting across your store.",
    accent: "text-violet-500",
    order: 1,
  },
  platform: {
    id: "platform",
    label: "Platform",
    description: "Reports, integrations and administration.",
    accent: "text-emerald-500",
    order: 2,
  },
};

export type ModuleStatus = "live" | "beta" | "coming_soon" | "planned";

export interface WorkspaceModule {
  /** Stable machine id — used for favorites, actions, deep links. */
  id: string;
  /** Human-readable module name (used as nav label & search title). */
  name: string;
  /** Alias for legacy consumers — mirrors `name`. */
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  category: ModuleCategoryId;
  status: ModuleStatus;
  version: string;
  featureFlag?: FeatureFlag;
  requiredPlan?: PlanId;
  permissions?: Permission[];
  comingSoon?: boolean;
  beta?: boolean;
  enabled?: boolean;
  /** IDs of modules this module depends on (data or auth). */
  dependencies?: string[];
  /** Searchable terms — used by command center and global search. */
  searchKeywords?: string[];
  /** Semantic accent color token (Tailwind). */
  color?: string;
  /** Sort order within category. Lower comes first. */
  order: number;
  shortcut?: string;
  /** @deprecated use `searchKeywords`. */
  keywords?: string[];
}

type ModuleInput = Omit<WorkspaceModule, "title" | "keywords" | "enabled" | "beta" | "version"> &
  Partial<Pick<WorkspaceModule, "version" | "beta" | "enabled">>;

function defineModule(m: ModuleInput): WorkspaceModule {
  return {
    ...m,
    title: m.name,
    version: m.version ?? "0.1.0",
    beta: m.beta ?? m.status === "beta",
    enabled: m.enabled ?? (m.status === "live" || m.status === "beta"),
    keywords: m.searchKeywords,
  };
}

export const MODULE_REGISTRY: WorkspaceModule[] = [
  // ── Operations ────────────────────────────────────────────────
  defineModule({
    id: "customers", name: "Customer CRM", description: "Profiles, loyalty, segments and journeys.",
    icon: Users, route: "/app/customers", category: "operations", status: "coming_soon",
    featureFlag: "crm", requiredPlan: "starter", comingSoon: true,
    shortcut: "G C", searchKeywords: ["crm", "clients", "loyalty", "customers"],
    color: "text-sky-500", order: 10,
  }),
  defineModule({
    id: "products", name: "Products", description: "Catalog, variants, pricing and media.",
    icon: ShoppingBag, route: "/app/products", category: "operations", status: "coming_soon",
    featureFlag: "products", requiredPlan: "starter", comingSoon: true,
    shortcut: "G P", searchKeywords: ["catalog", "sku", "barcode"],
    color: "text-brand", order: 20,
  }),
  defineModule({
    id: "inventory", name: "Inventory", description: "Stock, transfers, counts and adjustments.",
    icon: Boxes, route: "/app/inventory", category: "operations", status: "coming_soon",
    featureFlag: "inventory", requiredPlan: "starter", comingSoon: true,
    dependencies: ["products"], searchKeywords: ["stock", "warehouse", "godown"],
    color: "text-amber-500", order: 30,
  }),
  defineModule({
    id: "billing", name: "Billing", description: "Invoices, receipts and tax documents.",
    icon: Receipt, route: "/app/billing", category: "operations", status: "coming_soon",
    featureFlag: "billing", requiredPlan: "starter", comingSoon: true,
    dependencies: ["customers", "products"], searchKeywords: ["invoice", "gst", "tax", "billing"],
    color: "text-emerald-500", order: 40,
  }),
  defineModule({
    id: "pos", name: "Point of Sale", description: "In-store checkout with tender and receipts.",
    icon: ShoppingCart, route: "/app/pos", category: "operations", status: "coming_soon",
    featureFlag: "pos", requiredPlan: "starter", comingSoon: true, shortcut: "G O",
    dependencies: ["products", "billing"], searchKeywords: ["checkout", "counter", "pos"],
    color: "text-rose-500", order: 50,
  }),
  defineModule({
    id: "sales", name: "Sales", description: "Orders, quotes, returns and fulfilment.",
    icon: TrendingUp, route: "/app/sales", category: "operations", status: "coming_soon",
    featureFlag: "orders", requiredPlan: "starter", comingSoon: true,
    searchKeywords: ["orders", "quotes", "returns"], color: "text-brand", order: 60,
  }),
  defineModule({
    id: "suppliers", name: "Suppliers", description: "Vendors, contracts and receiving.",
    icon: Truck, route: "/app/suppliers", category: "operations", status: "coming_soon",
    featureFlag: "suppliers", requiredPlan: "starter", comingSoon: true,
    searchKeywords: ["vendor", "supplier", "purchase order"], color: "text-orange-500", order: 70,
  }),
  defineModule({
    id: "purchasing", name: "Purchasing", description: "Purchase orders, bills and payments.",
    icon: ClipboardList, route: "/app/purchasing", category: "operations", status: "planned",
    featureFlag: "purchasing", requiredPlan: "growth", comingSoon: true,
    dependencies: ["suppliers"], searchKeywords: ["po", "bill", "purchase"],
    color: "text-orange-400", order: 80,
  }),
  defineModule({
    id: "warehouse", name: "Warehouse", description: "Locations, bins and receiving flows.",
    icon: Warehouse, route: "/app/warehouse", category: "operations", status: "planned",
    featureFlag: "warehouse", requiredPlan: "business", comingSoon: true,
    dependencies: ["inventory"], searchKeywords: ["godown", "location", "bin"],
    color: "text-amber-600", order: 90,
  }),
  defineModule({
    id: "employees", name: "Employees", description: "Staff, shifts and attendance.",
    icon: UserCog, route: "/app/employees", category: "operations", status: "coming_soon",
    featureFlag: "employees", requiredPlan: "growth", comingSoon: true,
    searchKeywords: ["staff", "attendance", "shift"], color: "text-indigo-500", order: 100,
  }),
  defineModule({
    id: "finance", name: "Finance", description: "Expenses, cashbook and reconciliation.",
    icon: Landmark, route: "/app/finance", category: "operations", status: "coming_soon",
    featureFlag: "finance", requiredPlan: "growth", comingSoon: true,
    searchKeywords: ["cash", "expense", "reconcile", "finance"],
    color: "text-emerald-600", order: 110,
  }),
  defineModule({
    id: "marketing", name: "Marketing", description: "Campaigns, coupons and WhatsApp broadcasts.",
    icon: Megaphone, route: "/app/marketing", category: "operations", status: "coming_soon",
    featureFlag: "marketing", requiredPlan: "growth", comingSoon: true,
    searchKeywords: ["campaign", "coupon", "whatsapp", "broadcast"],
    color: "text-pink-500", order: 120,
  }),

  // ── Intelligence ──────────────────────────────────────────────
  defineModule({
    id: "bi", name: "Business Intelligence", description: "Cross-module KPIs and executive dashboards.",
    icon: Gauge, route: "/app/intelligence/business", category: "intelligence", status: "coming_soon",
    featureFlag: "analytics", requiredPlan: "growth", comingSoon: true,
    searchKeywords: ["kpi", "bi", "dashboard", "executive"],
    color: "text-violet-500", order: 10,
  }),
  defineModule({
    id: "customer-intelligence", name: "Customer Intelligence", description: "Cohorts, RFM and lifetime value analytics.",
    icon: PieChart, route: "/app/intelligence/customers", category: "intelligence", status: "coming_soon",
    featureFlag: "customerIntelligence", requiredPlan: "growth", comingSoon: true,
    dependencies: ["customers"], searchKeywords: ["cohort", "rfm", "ltv"],
    color: "text-sky-500", order: 20,
  }),
  defineModule({
    id: "inventory-intelligence", name: "Inventory Intelligence", description: "Stock health, ageing and dead stock signals.",
    icon: Boxes, route: "/app/intelligence/inventory", category: "intelligence", status: "coming_soon",
    featureFlag: "inventoryIntelligence", requiredPlan: "growth", comingSoon: true,
    dependencies: ["inventory"], searchKeywords: ["ageing", "dead stock", "abc"],
    color: "text-amber-500", order: 30,
  }),
  defineModule({
    id: "sales-intelligence", name: "Sales Intelligence", description: "Trends, category mix and staff performance.",
    icon: LineChart, route: "/app/intelligence/sales", category: "intelligence", status: "coming_soon",
    featureFlag: "salesIntelligence", requiredPlan: "growth", comingSoon: true,
    dependencies: ["sales"], searchKeywords: ["trend", "mix", "growth"],
    color: "text-brand", order: 40,
  }),
  defineModule({
    id: "finance-intelligence", name: "Finance Intelligence", description: "Margins, cash flow and P&L insights.",
    icon: Wallet, route: "/app/intelligence/finance", category: "intelligence", status: "coming_soon",
    featureFlag: "financeIntelligence", requiredPlan: "business", comingSoon: true,
    dependencies: ["finance"], searchKeywords: ["pnl", "margin", "cashflow"],
    color: "text-emerald-600", order: 50,
  }),
  defineModule({
    id: "forecasting", name: "Forecasting", description: "Demand, replenishment and revenue forecasts.",
    icon: Target, route: "/app/intelligence/forecasting", category: "intelligence", status: "planned",
    featureFlag: "forecasting", requiredPlan: "business", comingSoon: true,
    searchKeywords: ["demand", "forecast", "predict"],
    color: "text-fuchsia-500", order: 60,
  }),
  defineModule({
    id: "ai-copilot", name: "AI Copilot", description: "Ask questions across your store's data.",
    icon: Sparkles, route: "/app/ai", category: "intelligence", status: "coming_soon",
    featureFlag: "aiAssistant", requiredPlan: "growth", comingSoon: true, shortcut: "⌘ /",
    searchKeywords: ["ai", "assistant", "chat", "copilot", "ask"],
    color: "text-violet-500", order: 70,
  }),
  defineModule({
    id: "automation", name: "Automation", description: "Workflows, triggers and background jobs.",
    icon: Workflow, route: "/app/automation", category: "intelligence", status: "planned",
    featureFlag: "automation", requiredPlan: "growth", comingSoon: true,
    searchKeywords: ["workflow", "trigger", "zap"],
    color: "text-indigo-500", order: 80,
  }),
  defineModule({
    id: "reports", name: "Reports", description: "Sales, stock, staff and finance reports.",
    icon: BarChart3, route: "/app/reports", category: "intelligence", status: "coming_soon",
    featureFlag: "reports", requiredPlan: "starter", comingSoon: true,
    searchKeywords: ["report", "pdf", "export"],
    color: "text-emerald-500", order: 90,
  }),

  // ── Platform ──────────────────────────────────────────────────
  defineModule({
    id: "integrations", name: "Integrations", description: "Payments, accounting, shipping and comms.",
    icon: PlugZap, route: "/app/integrations", category: "platform", status: "coming_soon",
    featureFlag: "integrations", requiredPlan: "starter", comingSoon: true,
    searchKeywords: ["connector", "integration", "connect"],
    color: "text-emerald-500", order: 10,
  }),
  defineModule({
    id: "marketplace", name: "Marketplace", description: "Extensions and partner apps from the ecosystem.",
    icon: Store, route: "/app/marketplace", category: "platform", status: "planned",
    featureFlag: "marketplace", requiredPlan: "enterprise", comingSoon: true,
    searchKeywords: ["apps", "extensions", "partner"],
    color: "text-brand", order: 20,
  }),
  defineModule({
    id: "settings", name: "Settings", description: "Organization, preferences and branding.",
    icon: Settings, route: "/app/settings", category: "platform", status: "live",
    permissions: ["org.settings.view"], shortcut: "⌘ ,",
    searchKeywords: ["settings", "preferences", "branding", "org"],
    color: "text-muted-foreground", order: 30,
  }),
  defineModule({
    id: "administration", name: "Administration", description: "Team, roles, billing and workspace controls.",
    icon: Building2, route: "/app/administration", category: "platform", status: "coming_soon",
    permissions: ["org.members.manage"], comingSoon: true,
    searchKeywords: ["team", "roles", "members", "billing"],
    color: "text-slate-500", order: 40,
  }),
];

/** Sort helper — deterministic order for UI. */
function sortModules(list: WorkspaceModule[]): WorkspaceModule[] {
  return [...list].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getModulesByCategory(category: ModuleCategoryId): WorkspaceModule[] {
  return sortModules(MODULE_REGISTRY.filter((m) => m.category === category));
}

export function getModuleById(id: string): WorkspaceModule | undefined {
  return MODULE_REGISTRY.find((m) => m.id === id);
}

export function searchModules(query: string): WorkspaceModule[] {
  const q = query.trim().toLowerCase();
  if (!q) return sortModules(MODULE_REGISTRY);
  return sortModules(
    MODULE_REGISTRY.filter((m) => {
      const haystack = [
        m.name,
        m.description,
        m.category,
        ...(m.searchKeywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    }),
  );
}
