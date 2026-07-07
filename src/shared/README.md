# Shared

Reusable UI, hooks and utilities that any feature module can consume.
Feature-specific code stays inside `src/features/*` — never here.

Subfolders:

- `ui/` — design system components. Import via `@/shared/ui`.
- `hooks/` — generic React hooks (media queries, debounce, clipboard).
- `lib/` — small shared utilities.
- `types/` — shared TypeScript types.