import type { WorkspaceWidget } from "@/config/widgets";

import { WidgetShell } from "./WidgetShell";

interface WidgetRendererProps {
  widget: WorkspaceWidget;
  pinned: boolean;
  onTogglePin: (id: string) => void;
  onHide: (id: string) => void;
}

/**
 * Renders the empty state for a widget. Real content plugs in per module
 * as those modules ship. The Workspace never contains business logic.
 */
export function WidgetRenderer({ widget, pinned, onTogglePin, onHide }: WidgetRendererProps) {
  return (
    <WidgetShell widget={widget} pinned={pinned} onTogglePin={onTogglePin} onHide={onHide}>
      <EmptyBody widget={widget} />
    </WidgetShell>
  );
}

function EmptyBody({ widget }: { widget: WorkspaceWidget }) {
  const message = describeEmptyState(widget.id);
  return (
    <div className="flex h-full min-h-[104px] flex-col justify-end gap-2 rounded-xl border border-dashed border-border/60 bg-surface-muted/30 p-3">
      <p className="text-xs text-muted-foreground">{message}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
        {widget.comingSoon ? "Empty state • ships with the module" : "Empty state"}
      </p>
    </div>
  );
}

function describeEmptyState(id: string): string {
  switch (id) {
    case "business-health":
      return "Your overall business health will appear here once we have enough signal from your store.";
    case "business-snapshot":
      return "Today's sales, orders and cash flow will show here.";
    case "ai-daily-brief":
      return "AI will summarise warnings, recommendations and opportunities every morning.";
    case "todays-tasks":
      return "You have no tasks yet. Modules will queue work here as it lands.";
    case "notifications":
      return "Smart alerts across inventory, customers, suppliers and finance will surface here.";
    case "recent-activity":
      return "Recent activity across your store will appear here as your team works.";
    case "goals":
      return "Set monthly goals for revenue, orders and collections to track progress.";
    case "quick-insights":
      return "AI-generated insights will highlight what deserves your attention.";
    case "inventory-alerts":
      return "Low stock, dead stock and ageing alerts will surface once inventory is connected.";
    case "sales-highlights":
      return "Top products, channels and performers appear here after you log sales.";
    case "customer-spotlight":
      return "New, returning and at-risk customers will appear here once your CRM has data.";
    case "calendar":
      return "Follow-ups, reminders and holidays will appear here.";
    case "workspace-tips":
      return "Tips to help you get the most out of RetailOS.";
    case "system-status":
      return "All systems operational.";
    case "business-timeline":
      return "Chronological events — invoices, payments, stock updates and AI recommendations — appear here.";
    case "compliance":
      return "GST filings, HSN validation and India-first compliance checks appear here.";
    case "inventory-radar":
      return "Cross-branch stock signals will surface here once inventory intelligence is enabled.";
    default:
      return "This widget will populate once the related module is enabled.";
  }
}
