# Coding Standards

* Strict TypeScript — no `any`, no implicit `any`.
* SOLID + DRY. Prefer composition over inheritance.
* Feature-driven: colocate `components/`, `hooks/`, `schemas.ts`, `services/`
  under `features/<feature>/`.
* No cross-feature imports.
* Never call `fetch` directly in a component.
* Never import `sonner` directly — use `core/notifications`.
* Never import shadcn primitives directly in features — use `@/shared/ui`.
* Path aliases: `@/` -> `src/`.
