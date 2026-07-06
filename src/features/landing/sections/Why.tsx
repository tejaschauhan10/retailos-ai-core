import { Check } from "lucide-react";

const rows = [
  {
    title: "Designed for fashion, not generic retail",
    body:
      "Sizes, colors, SKUs, seasons, matrices — built into the data model, not bolted on.",
  },
  {
    title: "One platform, one login, one truth",
    body:
      "Stop reconciling spreadsheets across POS, inventory and accounting. It's all here.",
  },
  {
    title: "AI that works with your team",
    body:
      "The copilot understands your catalog, sales and customers — from day one.",
  },
  {
    title: "Built to scale from one store to hundreds",
    body:
      "Multi-tenant architecture, granular roles, and audit trails your ops team will love.",
  },
];

export function Why() {
  return (
    <section id="why" className="border-y border-border/60 bg-surface-muted/40">
      <div className="container-page grid gap-14 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-brand">Why RetailOS AI</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Fashion retail deserves better software
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            We rebuilt the retail stack from the ground up — for boutiques,
            multi-brand stores and growing chains that need a serious system
            without the enterprise bloat.
          </p>
        </div>
        <ul className="space-y-5">
          {rows.map((r) => (
            <li key={r.title} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Check className="h-3.5 w-3.5" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-foreground">
                  {r.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}