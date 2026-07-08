/**
 * Central application configuration. Aggregates env, feature flags,
 * localization, theme, business type registry and future integration
 * surfaces into a single import target.
 */

import { env } from "./env";
import { featureFlags } from "./featureFlags";
import { BUSINESS_TYPES } from "./businessTypes";

export const appConfig = {
  env,
  features: featureFlags,
  theme: {
    default: "system" as const,
    available: ["light", "dark", "system"] as const,
  },
  localization: {
    defaultLocale: "en",
    availableLocales: ["en"] as const,
    defaultCurrency: "INR",
    defaultTimezone: "Asia/Kolkata",
  },
  business: {
    types: BUSINESS_TYPES,
  },
  integrations: {
    accounting: [] as const,
    billing: [] as const,
    commerce: [] as const,
    communication: [] as const,
    payments: [] as const,
    shipping: [] as const,
  },
  ai: {
    providers: [] as const,
  },
} as const;

export type AppConfig = typeof appConfig;

export { env, featureFlags };
export * from "./businessTypes";
export * from "./featureFlags";