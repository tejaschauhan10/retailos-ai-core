/**
 * Shared types for the integrations platform. Every integration domain
 * (accounting, billing, commerce, communication, payments, shipping)
 * implements the same provider/adapter contract described here.
 *
 * No concrete provider lives here — this is only the architectural surface.
 */

export type IntegrationDomain =
  | "accounting"
  | "billing"
  | "commerce"
  | "communication"
  | "payments"
  | "shipping";

export type IntegrationStatus =
  | "not_configured"
  | "connected"
  | "error"
  | "disabled";

export interface IntegrationProviderDescriptor {
  /** Stable slug, e.g. "razorpay". Persisted in DB. */
  id: string;
  /** Human label for the settings UI. */
  name: string;
  domain: IntegrationDomain;
  /** Whether we have a live adapter for this provider. */
  implemented: boolean;
  /** Docs link shown in the provider tile. */
  docsUrl?: string;
}

export interface IntegrationConnection<TConfig = Record<string, unknown>> {
  providerId: string;
  organizationId: string;
  status: IntegrationStatus;
  config: TConfig;
  connectedAt?: string;
  lastSyncAt?: string;
}

/**
 * Domain services are typed facades feature modules call into. Every domain
 * (accounting, payments, ...) defines its own service contract by extending
 * this base.
 */
export interface IntegrationService<TDomain extends IntegrationDomain = IntegrationDomain> {
  readonly domain: TDomain;
  listProviders(): IntegrationProviderDescriptor[];
}

/** Provider adapters implement domain contracts and are registered per org. */
export interface IntegrationAdapter<TConfig = Record<string, unknown>> {
  readonly providerId: string;
  readonly domain: IntegrationDomain;
  connect(config: TConfig): Promise<IntegrationConnection<TConfig>>;
  disconnect(connection: IntegrationConnection<TConfig>): Promise<void>;
}