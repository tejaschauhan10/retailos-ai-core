export * from "./types";

import type { StorageProvider } from "./types";

let active: StorageProvider | null = null;

export function registerStorageProvider(provider: StorageProvider): void {
  active = provider;
}

export function getStorageProvider(): StorageProvider {
  if (!active) {
    throw new Error(
      "No storage provider registered. Call registerStorageProvider(...) at bootstrap.",
    );
  }
  return active;
}