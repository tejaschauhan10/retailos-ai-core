/**
 * Runtime registry of AI providers. Empty by default — a future sprint
 * registers the Lovable AI Gateway provider here. Business modules pull
 * the default provider from this registry rather than importing directly.
 */

import type { AiProvider, AiProviderId } from "./types";

const providers = new Map<AiProviderId, AiProvider>();
let defaultProviderId: AiProviderId | undefined;

export function registerAiProvider(provider: AiProvider, options: { default?: boolean } = {}): void {
  providers.set(provider.id, provider);
  if (options.default || !defaultProviderId) defaultProviderId = provider.id;
}

export function getAiProvider(id?: AiProviderId): AiProvider | undefined {
  const key = id ?? defaultProviderId;
  return key ? providers.get(key) : undefined;
}

export function listAiProviders(): AiProvider[] {
  return [...providers.values()];
}