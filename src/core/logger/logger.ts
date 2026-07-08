import { env } from "../config/env";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogRecord {
  level: LogLevel;
  message: string;
  scope?: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

export interface LogSink {
  write(record: LogRecord): void;
}

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

const consoleSink: LogSink = {
  write(record) {
    const tag = record.scope ? `[${record.scope}]` : "";
    const args: unknown[] = [`${tag} ${record.message}`.trim()];
    if (record.context) args.push(record.context);
    switch (record.level) {
      case "debug": console.debug(...args); break;
      case "info": console.info(...args); break;
      case "warn": console.warn(...args); break;
      case "error": console.error(...args); break;
    }
  },
};

let sink: LogSink = consoleSink;
let minLevel: LogLevel = env.isProduction ? "info" : "debug";

export function setLogSink(next: LogSink): void { sink = next; }
export function setLogLevel(level: LogLevel): void { minLevel = level; }

function emit(level: LogLevel, scope: string | undefined, message: string, context?: Record<string, unknown>) {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[minLevel]) return;
  sink.write({ level, scope, message, context, timestamp: new Date().toISOString() });
}

export interface Logger {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
  child(scope: string): Logger;
  time(label: string): () => void;
}

export function createLogger(scope?: string): Logger {
  return {
    debug: (message, context) => emit("debug", scope, message, context),
    info: (message, context) => emit("info", scope, message, context),
    warn: (message, context) => emit("warn", scope, message, context),
    error: (message, context) => emit("error", scope, message, context),
    child: (childScope) => createLogger(scope ? `${scope}:${childScope}` : childScope),
    time: (label) => {
      const start = typeof performance !== "undefined" ? performance.now() : Date.now();
      return () => {
        const end = typeof performance !== "undefined" ? performance.now() : Date.now();
        emit("debug", scope, `${label} took ${(end - start).toFixed(1)}ms`);
      };
    },
  };
}

export const logger = createLogger("app");
export const perfLogger = createLogger("perf");
export const debugLogger = createLogger("debug");
export const errorLogger = createLogger("error");