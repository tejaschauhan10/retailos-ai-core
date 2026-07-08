/**
 * Environment configuration surface. Reads from Vite `import.meta.env`
 * with safe defaults so the app works in every environment.
 */

export type AppEnvironment = "development" | "staging" | "production";

function readEnv(key: string): string | undefined {
  const meta = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  return meta?.[key];
}

function detectEnvironment(): AppEnvironment {
  const mode = readEnv("MODE") ?? readEnv("VITE_APP_ENV");
  if (mode === "production") return "production";
  if (mode === "staging") return "staging";
  return "development";
}

export const env = {
  environment: detectEnvironment(),
  isProduction: detectEnvironment() === "production",
  isDevelopment: detectEnvironment() === "development",
  appName: readEnv("VITE_APP_NAME") ?? "RetailOS AI",
  appVersion: readEnv("VITE_APP_VERSION") ?? "0.1.0",
  supabaseUrl: readEnv("VITE_SUPABASE_URL") ?? "",
  supabasePublishableKey: readEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ?? "",
} as const;

export type Env = typeof env;