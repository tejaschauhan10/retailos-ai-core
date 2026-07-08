# Deployment

Managed by Lovable. `Publish` in the editor deploys the latest build to
`retailos-ai-core.lovable.app`. Preview URL updates on every commit.

Runtime is Cloudflare Workers with `nodejs_compat`; avoid Node-only npm
packages (see `server-runtime` knowledge card). Backend runs on Lovable
Cloud (Supabase).

Environment variables:

* `VITE_APP_NAME`, `VITE_APP_VERSION`, `VITE_APP_ENV` — client
* `VITE_FEATURE_<FLAG>` — override feature flag defaults per environment
* `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  — server only
