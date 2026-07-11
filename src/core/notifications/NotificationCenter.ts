import { logger } from "@/core/logger";

import type {
  NotificationChannel,
  NotificationMessage,
  NotificationTransport,
} from "./types";

export class NotificationCenter {
  private transports = new Map<NotificationChannel, NotificationTransport>();

  register(transport: NotificationTransport): () => void {
    this.transports.set(transport.channel, transport);
    return () => this.transports.delete(transport.channel);
  }

  async send(message: NotificationMessage): Promise<void> {
    const enriched: NotificationMessage = {
      ...message,
      id: message.id ?? crypto.randomUUID(),
      at: message.at ?? new Date().toISOString(),
    };
    await Promise.all(
      enriched.channels.map(async (channel) => {
        const transport = this.transports.get(channel);
        if (!transport) {
          logger.debug("notification channel not registered", { channel });
          return;
        }
        try {
          await transport.send(enriched);
        } catch (error) {
          logger.error("notification transport failed", { channel, error });
        }
      }),
    );
  }
}

export const notificationCenter = new NotificationCenter();