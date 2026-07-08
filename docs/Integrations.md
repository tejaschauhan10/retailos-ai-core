# Integrations

See `src/integrations/README.md` for the platform architecture.

To add a new provider:

1. Add a descriptor to `src/integrations/registry.ts`.
2. Create `src/integrations/<domain>/adapters/<provider>.ts` implementing
   the domain service contract.
3. Register the adapter at app startup (a future `providers.ts` file).
4. Add UI in `features/settings/integrations` that lists providers via
   `getProvidersByDomain`.
