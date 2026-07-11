/**
 * Global event bus types. Event names use `<domain>.<verb>` and are
 * versioned via the payload contract. Modules extend `AppEventMap` via
 * TypeScript module augmentation as they land.
 */

export type EventName = string;

export interface EventEnvelope<TPayload = unknown> {
  /** Fully qualified event name, e.g. `invoice.created`. */
  name: EventName;
  /** ISO timestamp when the event was emitted. */
  at: string;
  /** Optional actor (user id) responsible for the event. */
  actorId?: string;
  /** Organization scope (multi-tenant). */
  orgId?: string;
  /** Correlation id linking events across a workflow. */
  correlationId?: string;
  /** Free-form payload validated by the emitter. */
  payload: TPayload;
}

export type EventHandler<TPayload = unknown> = (
  event: EventEnvelope<TPayload>,
) => void | Promise<void>;

export interface Subscription {
  unsubscribe(): void;
}

/**
 * Canonical event names reserved by the platform. Modules add their own
 * via module augmentation of `AppEventMap` — never rename these.
 */
export interface AppEventMap {
  "customer.created": { customerId: string };
  "customer.updated": { customerId: string };
  "invoice.created": { invoiceId: string };
  "invoice.paid": { invoiceId: string; amount: number };
  "product.updated": { productId: string };
  "inventory.changed": { productId: string; delta: number };
  "supplier.added": { supplierId: string };
  "campaign.started": { campaignId: string };
  "meeting.completed": { meetingId: string };
  "employee.created": { employeeId: string };
  "task.completed": { taskId: string };
  "ai.response.generated": { conversationId: string };
}