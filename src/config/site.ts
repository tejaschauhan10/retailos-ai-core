export const siteConfig = {
  name: "RetailOS AI",
  shortName: "RetailOS",
  tagline: "AI Powered Operating System for Modern Fashion Retail",
  description:
    "RetailOS AI is the unified operating system for modern fashion retailers — inventory, POS, CRM, orders, finance and AI copilot in one platform.",
  url: "/",
  supportEmail: "hello@retailos.ai",
} as const;

export type SiteConfig = typeof siteConfig;