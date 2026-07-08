/**
 * Central registry of every third-party provider RetailOS AI plans to
 * integrate with. Descriptors are architectural placeholders — actual
 * adapters land in `<domain>/adapters/` when the feature is scheduled.
 */

import type { IntegrationProviderDescriptor } from "./types";

export const INTEGRATION_PROVIDERS: readonly IntegrationProviderDescriptor[] = [
  { id: "vyapar", name: "Vyapar", domain: "accounting", implemented: false },
  { id: "busy", name: "Busy Accounting", domain: "accounting", implemented: false },
  { id: "tally", name: "Tally", domain: "accounting", implemented: false },
  { id: "shopify", name: "Shopify", domain: "commerce", implemented: false },
  { id: "woocommerce", name: "WooCommerce", domain: "commerce", implemented: false },
  { id: "amazon", name: "Amazon", domain: "commerce", implemented: false },
  { id: "flipkart", name: "Flipkart", domain: "commerce", implemented: false },
  { id: "whatsapp", name: "WhatsApp", domain: "communication", implemented: false },
  { id: "razorpay", name: "Razorpay", domain: "payments", implemented: false },
  { id: "stripe", name: "Stripe", domain: "payments", implemented: false },
  { id: "shiprocket", name: "Shiprocket", domain: "shipping", implemented: false },
  { id: "google_sheets", name: "Google Sheets", domain: "commerce", implemented: false },
] as const;

export function getProvidersByDomain(domain: IntegrationProviderDescriptor["domain"]) {
  return INTEGRATION_PROVIDERS.filter((p) => p.domain === domain);
}

export function getProvider(id: string) {
  return INTEGRATION_PROVIDERS.find((p) => p.id === id);
}