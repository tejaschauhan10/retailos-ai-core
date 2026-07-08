# Database

Backend is Lovable Cloud (Supabase Postgres). Row Level Security is enforced
on every user-facing table. Roles are stored in `public.organization_members`
with `role app_role`. Permissions are code-defined in `src/config/roles.ts`.

Every new `public` table MUST include, in the same migration:

1. `CREATE TABLE`
2. `GRANT` statements for `authenticated` / `service_role`
3. `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
4. `CREATE POLICY` per action
