export function Pricing() {
  return (
    <section id="pricing" className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-brand">Pricing</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Simple pricing, coming soon
        </h2>
        <p className="mt-4 text-muted-foreground">
          Transparent plans that scale from a single boutique to a national
          chain. Detailed pricing will be announced with our public launch.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
        {["Starter", "Growth", "Scale"].map((tier) => (
          <div
            key={tier}
            className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center"
          >
            <p className="text-sm font-medium text-brand">{tier}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              —
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pricing announcement soon.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}