# Architecture

RetailOS AI is a multi-tenant, feature-driven React application built on
TanStack Start (Vite + React 19) with a Supabase backend.

## Layers

```
src/
  core/         Framework plumbing (config, api, logger, errors, notifications)
  shared/       Reusable UI, hooks, primitives — no business logic
  ai/           AI provider contracts + registry (extension only)
  integrations/ Third-party connector platform (extension only)
  features/     Feature-driven business modules (auth, organization, rbac, ...)
  providers/    App-wide React providers (auth, active org, theme, query)
  components/   Layout + common composed UI (built on shared/ui)
  routes/       TanStack Start file-based routing
```

Rules:

* Features never import other features. Cross-feature dependencies go
  through `core/` or `shared/`.
* UI never calls `fetch` directly — always through `core/api/ApiClient` or
  a feature service.
* No business logic in `core/` or `shared/`.
