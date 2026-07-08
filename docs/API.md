# API

Application code talks to backends through two surfaces:

1. **TanStack server functions** (`createServerFn`) for app-internal RPC.
2. **`core/api/ApiClient`** for external HTTP APIs and third-party providers.

`ApiClient` handles retry (with exponential backoff), request/response
interceptors, error mapping to `AppError`, and structured logging.

```ts
import { ApiClient } from "@/core/api";

const shopify = new ApiClient({ baseUrl: "https://.../admin/api" });
shopify.addRequestInterceptor((url, init) => ({
  url,
  init: { ...init, headers: { ...init.headers, "X-Shopify-Access-Token": token } },
}));
```
