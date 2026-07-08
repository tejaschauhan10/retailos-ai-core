# Security

* Session verified by Supabase; `_authenticated` layout redirects to
  `/auth/login` when there is no user.
* Server functions requiring the caller identity use `requireSupabaseAuth`
  middleware; the Authorization bearer token is attached by
  `functionMiddleware` in `src/start.ts`.
* Authorization = organization membership + `role` -> permissions map
  (`src/config/roles.ts`, `features/rbac`).
* Tenant isolation = every domain table carries `organization_id`; RLS
  policies enforce `is_org_member(auth.uid(), organization_id)`.
* 401 / 403 render via `shared/ui/feedback/ErrorPage`.
* Uncaught render errors are contained by `AppErrorBoundary`.
* Feature flags default OFF for every business module.
