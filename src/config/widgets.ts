import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Bell,
  CalendarDays,
  Compass,
  Flag,
  Heart,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  Boxes,
} from "lucide-react";

import type { FeatureFlag } from "@/core/config/featureFlags";
import type { Permission } from "@/config/roles";
import type { PlanId } from "@/config/plans";

/**
 * Workspace Widget Registry.
 * The Workspace renders widgets dynamically from this list, respecting
 * plan, permissions, feature flags and user preferences.
 */

export const WIDGET_SIZES = ["sm", "md", "lg", "xl"] as const;
export type WidgetSize = (typeof WIDGET_SIZES)[number];

export const WIDGET_CATEGORIES = [
  "overview",
  "operations",
  "intelligence",
  "activity",
  "personal",
  "system",
] as const;
export type WidgetCategory = (typeof WIDGET_CATEGORIES)[number];

export interface WorkspaceWidget {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  size: WidgetSize;
  /** Lower = shown first in default layout. */
  priority: number;
  category: WidgetCategory;
  requiredPlan?: PlanId;
  featureFlag?: FeatureFlag;
  permissions?: Permission[];
  enabled: boolean;
  comingSoon?: boolean;
  /** True when the widget is always available (no plan/flag gates). */
  core?: boolean;
}

export const WIDGET_REGISTRY: WorkspaceWidget[] = [
  { id: "business-health", title: "Business Health", description: "AI-graded health of your store.", icon: Heart, size: "lg", priority: 10, category: "overview", requiredPlan: "starter", enabled: true, comingSoon: true, core: true },
  { id: "business-snapshot", title: "Business Snapshot", description: "Sales, orders and cash today.", icon: LayoutDashboard, size: "lg", priority: 20, category: "overview", requiredPlan: "starter", enabled: true, comingSoon: true, core: true },
  { id: "ai-daily-brief", title: "AI Daily Brief", description: "Summary, warnings and opportunities.", icon: Sparkles, size: "lg", priority: 30, category: "intelligence", requiredPlan: "growth", featureFlag: "aiAssistant", enabled: true, comingSoon: true },
  { id: "todays-tasks", title: "Today's Tasks", description: "Things to close out today.", icon: ListChecks, size: "md", priority: 40, category: "personal", enabled: true, comingSoon: true, core: true },
  { id: "notifications", title: "Notifications", description: "Smart alerts across your store.", icon: Bell, size: "md", priority: 50, category: "activity", enabled: true, comingSoon: true, core: true },
  { id: "recent-activity", title: "Recent Activity", description: "Latest events across modules.", icon: Activity, size: "md", priority: 60, category: "activity", enabled: true, comingSoon: true, core: true },
  { id: "goals", title: "Monthly Goals", description: "Track revenue, orders and collections.", icon: Flag, size: "md", priority: 70, category: "personal", requiredPlan: "growth", enabled: true, comingSoon: true },
  { id: "quick-insights", title: "Quick Insights", description: "AI highlights worth your attention.", icon: Lightbulb, size: "md", priority: 80, category: "intelligence", requiredPlan: "growth", featureFlag: "aiAssistant", enabled: true, comingSoon: true },
  { id: "inventory-alerts", title: "Inventory Alerts", description: "Low stock, dead stock and ageing.", icon: AlertTriangle, size: "md", priority: 90, category: "operations", featureFlag: "inventory", requiredPlan: "starter", enabled: true, comingSoon: true },
  { id: "sales-highlights", title: "Sales Highlights", description: "Top products, channels and staff.", icon: TrendingUp, size: "md", priority: 100, category: "operations", featureFlag: "orders", requiredPlan: "starter", enabled: true, comingSoon: true },
  { id: "customer-spotlight", title: "Customer Spotlight", description: "New, returning and at-risk customers.", icon: Users, size: "md", priority: 110, category: "operations", featureFlag: "crm", requiredPlan: "starter", enabled: true, comingSoon: true },
  { id: "calendar", title: "Calendar", description: "Follow-ups, holidays and reminders.", icon: CalendarDays, size: "md", priority: 120, category: "personal", enabled: true, comingSoon: true, core: true },
  { id: "workspace-tips", title: "Workspace Tips", description: "Get the most out of RetailOS.", icon: Compass, size: "sm", priority: 130, category: "personal", enabled: true, core: true },
  { id: "system-status", title: "System Status", description: "Backend, integrations and health.", icon: Server, size: "sm", priority: 140, category: "system", enabled: true, core: true },
  { id: "business-timeline", title: "Business Timeline", description: "Chronological event feed.", icon: Sun, size: "lg", priority: 150, category: "activity", enabled: true, comingSoon: true },
  { id: "compliance", title: "Compliance", description: "GST, filings and India-first checks.", icon: ShieldCheck, size: "sm", priority: 160, category: "system", requiredPlan: "growth", enabled: true, comingSoon: true },
  { id: "inventory-radar", title: "Inventory Radar", description: "Cross-branch stock health signals.", icon: Boxes, size: "sm", priority: 170, category: "intelligence", featureFlag: "inventoryIntelligence", requiredPlan: "growth", enabled: true, comingSoon: true },
];

export function getWidgetById(id: string): WorkspaceWidget | undefined {
  return WIDGET_REGISTRY.find((w) => w.id === id);
}

export function getDefaultWidgetIds(): string[] {
  return [...WIDGET_REGISTRY]
    .sort((a, b) => a.priority - b.priority)
    .map((w) => w.id);
}
