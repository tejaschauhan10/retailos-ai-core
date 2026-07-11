import type { LucideIcon } from "lucide-react";

import type { Permission } from "@/config/roles";
import type { PlanId } from "@/config/plans";

export type SettingsCategoryId =
  | "business"
  | "users"
  | "invoices"
  | "taxes"
  | "pos"
  | "inventory"
  | "crm"
  | "marketing"
  | "ai"
  | "security"
  | "notifications"
  | "integrations"
  | "appearance"
  | "system";

export interface SettingsSection {
  id: string;
  category: SettingsCategoryId;
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  order: number;
  requiredPlan?: PlanId;
  requiredPermission?: Permission;
  comingSoon?: boolean;
}