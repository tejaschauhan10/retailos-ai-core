# Core

Framework-level plumbing shared across every feature. Rules:

- No JSX, no UI, no feature imports.
- Pure TypeScript utilities, config, constants, errors, service base classes.
- Anything imported here must remain safe for both browser and server bundles
  unless the file is explicitly named `*.server.ts`.

Subfolders:

- `api/` — fetch clients, retry & interceptor helpers (future).
- `config/` — runtime config surfaces.
- `constants/` — enums, tokens, static maps.
- `errors/` — `AppError` and typed error kinds.
- `providers/` — server-side service providers (future).
- `services/` — cross-cutting service abstractions.
- `types/` — global TypeScript types.
- `utils/` — small pure helpers.