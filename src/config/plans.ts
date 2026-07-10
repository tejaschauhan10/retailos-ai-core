/**
 * Central subscription plan registry.
 * Every module, widget, integration or premium feature MUST reference a
 * `PlanId` via `requiredPlan`. UI badges, gating and pricing render from
 * this file — never hardcoded elsewhere.
 */

export const PLAN_IDS = ["starter", "growth", "business", "enterprise"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export interface PlanMeta {
  id: PlanId;
  label: string;
  tagline: string;
  rank: number; // higher rank = more premium
  color: string; // tailwind text color token
  highlights: string[];
}

export const PLAN_META: Record<PlanId, PlanMeta> = {
  starter: {
    id: "starter",
    label: "Starter",
    tagline: "Free forever for small retail businesses.",
    rank: 0,
    color: "text-emerald-500",
    highlights: [
      "Customer CRM",
      "Products & basic inventory",
      "Basic billing & POS",
      "Basic reports & PDF invoices",
      "Expense tracking",
      "Workspace dashboard & business health",
    ],
  },
  growth: {
    id: "growth",
    label: "Growth",
    tagline: "AI, automation and analytics for growing stores.",
    rank: 1,
    color: "text-brand",
    highlights: [
      "AI Copilot",
      "Automation workflows",
      "Advanced analytics",
      "Forecasting",
    ],
  },
  business: {
    id: "business",
    label: "Business",
    tagline: "Multi-branch operations and advanced controls.",
    rank: 2,
    color: "text-violet-500",
    highlights: [
      "Multi-branch operations",
      "Advanced reports",
      "Advanced permissions",
      "WhatsApp automation",
    ],
  },
  enterprise: {
    id: "enterprise",
    label: "Enterprise",
    tagline: "Platform, API and marketplace for large retailers.",
    rank: 3,
    color: "text-amber-500",
    highlights: [
      "Public API",
      "Marketplace apps",
      "Custom integrations",
      "SSO & SAML",
      "White label",
    ],
  },
};

export function planAtLeast(current: PlanId, required: PlanId): boolean {
  return PLAN_META[current].rank >= PLAN_META[required].rank;
}

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && (PLAN_IDS as readonly string[]).includes(value);
}
