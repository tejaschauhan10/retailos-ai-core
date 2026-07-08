/**
 * Centralized Notification Service. Every module raises user-facing toasts
 * through this facade rather than importing `sonner` directly. Allows us to
 * later swap the underlying renderer or add push notifications without a
 * codebase-wide refactor.
 */

import { toast } from "sonner";

export interface NotifyOptions {
  description?: string;
  duration?: number;
  id?: string | number;
}

export interface PromiseMessages<T> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: unknown) => string);
}

export const notify = {
  success(message: string, options?: NotifyOptions) {
    return toast.success(message, options);
  },
  error(message: string, options?: NotifyOptions) {
    return toast.error(message, options);
  },
  warning(message: string, options?: NotifyOptions) {
    return toast.warning(message, options);
  },
  info(message: string, options?: NotifyOptions) {
    return toast.info(message, options);
  },
  loading(message: string, options?: NotifyOptions) {
    return toast.loading(message, options);
  },
  dismiss(id?: string | number) {
    return toast.dismiss(id);
  },
  promise<T>(promise: Promise<T>, messages: PromiseMessages<T>) {
    return toast.promise(promise, messages);
  },
};

export type NotificationService = typeof notify;