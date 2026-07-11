/**
 * Platform core service singletons re-exported for cross-cutting
 * consumers. Application-wide React providers (auth, active org, theme,
 * query) still live under `src/providers`.
 */

export { eventBus } from "@/core/events";
export { activityService } from "@/core/activity";
export { auditService } from "@/core/audit";
export { searchRegistry } from "@/core/search";
export { notificationCenter } from "@/core/notifications/NotificationCenter";
export { settingsRegistry } from "@/core/settings";
export { getStorageProvider, registerStorageProvider } from "@/core/storage";