/**
 * Domain error primitive. Every service and server function that raises a
 * user-visible failure should throw `AppError` (or a subclass) so the UI can
 * consistently render `ErrorPage` / `ErrorCard`.
 */

export type AppErrorKind =
  | "unknown"
  | "network"
  | "not_found"
  | "unauthorized"
  | "forbidden"
  | "validation"
  | "conflict"
  | "server"
  | "offline";

export interface AppErrorOptions {
  kind?: AppErrorKind;
  status?: number;
  cause?: unknown;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  readonly kind: AppErrorKind;
  readonly status?: number;
  readonly details?: Record<string, unknown>;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.kind = options.kind ?? "unknown";
    this.status = options.status;
    this.details = options.details;
  }
}

export function toAppError(err: unknown, fallbackMessage = "Something went wrong"): AppError {
  if (err instanceof AppError) return err;
  if (err instanceof Error) return new AppError(err.message || fallbackMessage, { cause: err });
  return new AppError(fallbackMessage, { cause: err });
}