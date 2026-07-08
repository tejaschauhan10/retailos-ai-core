/**
 * Generic ApiClient — a thin, typed wrapper around `fetch`.
 *
 * Never call `fetch` directly from UI components. Always route through an
 * ApiClient instance (or a service built on one) so cross-cutting concerns
 * — retry, error mapping, interceptors, logging — stay centralized.
 */

import { AppError, type AppErrorKind } from "../errors/AppError";
import { createLogger } from "../logger/logger";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  signal?: AbortSignal;
  retry?: RetryOptions;
  parse?: "json" | "text" | "blob" | "none";
}

export interface RetryOptions {
  retries?: number;
  backoffMs?: number;
  retryOn?: (status: number) => boolean;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export type RequestInterceptor = (
  url: string,
  init: RequestInit,
) => Promise<{ url: string; init: RequestInit }> | { url: string; init: RequestInit };

export type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

export interface ApiClientOptions {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  retry?: RetryOptions;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
  scope?: string;
}

const DEFAULT_RETRY: Required<RetryOptions> = {
  retries: 2,
  backoffMs: 200,
  retryOn: (status) => status >= 500 || status === 429,
};

function statusToKind(status: number): AppErrorKind {
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status === 409) return "conflict";
  if (status >= 400 && status < 500) return "validation";
  if (status >= 500) return "server";
  return "unknown";
}

function buildQuery(query?: ApiRequestOptions["query"]): string {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    params.append(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly retry: Required<RetryOptions>;
  private readonly requestInterceptors: RequestInterceptor[];
  private readonly responseInterceptors: ResponseInterceptor[];
  private readonly log;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl?.replace(/\/$/, "") ?? "";
    this.defaultHeaders = options.defaultHeaders ?? {};
    this.retry = { ...DEFAULT_RETRY, ...(options.retry ?? {}) };
    this.requestInterceptors = options.requestInterceptors ?? [];
    this.responseInterceptors = options.responseInterceptors ?? [];
    this.log = createLogger(options.scope ?? "api");
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  async request<T = unknown>(path: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    const method = options.method ?? "GET";
    const url = `${this.baseUrl}${path}${buildQuery(options.query)}`;
    const headers: Record<string, string> = { ...this.defaultHeaders, ...(options.headers ?? {}) };
    let body: BodyInit | undefined;
    if (options.body !== undefined && options.body !== null) {
      if (typeof options.body === "string" || options.body instanceof FormData || options.body instanceof Blob) {
        body = options.body as BodyInit;
      } else {
        body = JSON.stringify(options.body);
        if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";
      }
    }

    let init: RequestInit = { method, headers, body, signal: options.signal };
    let finalUrl = url;
    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(finalUrl, init);
      finalUrl = result.url;
      init = result.init;
    }

    const retry = { ...this.retry, ...(options.retry ?? {}) };
    let attempt = 0;
    let lastError: unknown;
    while (attempt <= retry.retries) {
      try {
        let response = await fetch(finalUrl, init);
        for (const interceptor of this.responseInterceptors) {
          response = await interceptor(response);
        }
        if (!response.ok) {
          if (retry.retryOn(response.status) && attempt < retry.retries) {
            attempt += 1;
            await new Promise((r) => setTimeout(r, retry.backoffMs * attempt));
            continue;
          }
          const text = await response.text().catch(() => "");
          throw new AppError(text || response.statusText || `Request failed (${response.status})`, {
            kind: statusToKind(response.status),
            status: response.status,
          });
        }
        const data = await this.parseBody<T>(response, options.parse ?? "json");
        return { data, status: response.status, headers: response.headers };
      } catch (err) {
        lastError = err;
        if (err instanceof AppError) throw err;
        if (attempt < retry.retries) {
          attempt += 1;
          await new Promise((r) => setTimeout(r, retry.backoffMs * attempt));
          continue;
        }
        this.log.error("request failed", { url: finalUrl, error: String(err) });
        throw new AppError("Network request failed", { kind: "network", cause: err });
      }
    }
    throw lastError instanceof Error ? lastError : new AppError("Request failed");
  }

  private async parseBody<T>(response: Response, mode: NonNullable<ApiRequestOptions["parse"]>): Promise<T> {
    if (mode === "none" || response.status === 204) return undefined as T;
    if (mode === "text") return (await response.text()) as T;
    if (mode === "blob") return (await response.blob()) as T;
    const text = await response.text();
    if (!text) return undefined as T;
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as T;
    }
  }

  get<T = unknown>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "GET" });
  }
  post<T = unknown>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "POST", body });
  }
  put<T = unknown>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }
  patch<T = unknown>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }
  delete<T = unknown>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient({ scope: "api:default" });