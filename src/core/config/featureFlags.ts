/**
 * Centralized feature flag registry. Every future module MUST declare its
 * top-level flag here so activation is a one-line change. Values are read
 * from environment variables so operators can flip flags per-deployment
 * without a code change.
 */

import { env } from "./env";

export const FEATURE_FLAG_KEYS = [
  "crm",
  "inventory",
  "products",
  "pos",
  "orders",
  "billing",
  "finance",
  "reports",
  "analytics",
  "marketing",
  "aiAssistant",
  "integrations",
  "marketplace",
  "automation",
  "suppliers",
  "employees",
  "purchasing",
  "warehouse",
  "customerIntelligence",
  "inventoryIntelligence",
  "salesIntelligence",
  "financeIntelligence",
  "forecasting",
] as const;

export type FeatureFlag = (typeof FEATURE_FLAG_KEYS)[number];

function readFlagEnv(flag: FeatureFlag): boolean | undefined {
  const meta = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const raw = meta?.[`VITE_FEATURE_${flag.toUpperCase()}`];
  if (raw === "1" || raw === "true") return true;
  if (raw === "0" || raw === "false") return false;
  return undefined;
}

/** Baseline defaults — all business modules disabled until they ship. */
const DEFAULTS: Record<FeatureFlag, boolean> = {
  crm: false,
  inventory: false,
  products: false,
  pos: false,
  orders: false,
  billing: false,
  finance: false,
  reports: false,
  analytics: false,
  marketing: false,
  aiAssistant: false,
  integrations: false,
  marketplace: false,
  automation: false,
  suppliers: false,
  employees: false,
  purchasing: false,
  warehouse: false,
  customerIntelligence: false,
  inventoryIntelligence: false,
  salesIntelligence: false,
  financeIntelligence: false,
  forecasting: false,
};

export const featureFlags: Readonly<Record<FeatureFlag, boolean>> = Object.freeze(
  FEATURE_FLAG_KEYS.reduce((acc, key) => {
    acc[key] = readFlagEnv(key) ?? DEFAULTS[key];
    return acc;
  }, {} as Record<FeatureFlag, boolean>),
);

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return featureFlags[flag] === true;
}

/** For debug surfaces / admin panels. */
export function getFeatureFlagSnapshot() {
  return {
    environment: env.environment,
    flags: { ...featureFlags },
  };
}