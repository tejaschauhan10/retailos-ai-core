import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Bot,
  CreditCard,
  Store,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Boxes,
    title: "Unified inventory",
    description:
      "Real-time stock across every branch, warehouse and channel. One source of truth.",
  },
  {
    icon: CreditCard,
    title: "Modern POS",
    description:
      "Lightning-fast checkout with UPI, cards, cash and split tenders — online or offline.",
  },
  {
    icon: Users,
    title: "Customer intelligence",
    description:
      "Rich CRM with segments, loyalty, purchase history and personalized outreach.",
  },
  {
    icon: BarChart3,
    title: "Reports that decide",
    description:
      "Live analytics on sell-through, margins, aging stock and store performance.",
  },
  {
    icon: Bot,
    title: "AI copilot",
    description:
      "Ask questions in plain English. Get reorder suggestions, pricing, and forecasts.",
  },
  {
    icon: Store,
    title: "Multi-branch ready",
    description:
      "Manage many stores from one dashboard with roles, permissions and audit logs.",
  },
];

export function Features() {
  return (
    <section id="features" className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-brand">Everything you need</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          A complete retail platform, from stockroom to storefront
        </h2>
        <p className="mt-4 text-muted-foreground">
          One elegant system replaces the eight tools you're stitching together.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
            className="group rounded-2xl border border-border/70 bg-surface p-6 transition-colors hover:border-border-strong"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subtle text-brand">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {f.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}