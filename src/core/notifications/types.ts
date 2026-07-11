export const NOTIFICATION_CHANNELS = [
  "in_app",
  "email",
  "sms",
  "whatsapp",
  "push",
  "slack",
  "teams",
] as const;
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];

export const NOTIFICATION_PRIORITIES = [
  "critical",
  "warning",
  "info",
  "success",
] as const;
export type NotificationPriority = (typeof NOTIFICATION_PRIORITIES)[number];

export interface NotificationMessage {
  id?: string;
  title: string;
  body?: string;
  priority: NotificationPriority;
  channels: NotificationChannel[];
  recipientUserId?: string;
  orgId?: string;
  route?: string;
  metadata?: Record<string, unknown>;
  at?: string;
}

export interface NotificationTransport {
  channel: NotificationChannel;
  send(message: NotificationMessage): Promise<void>;
}