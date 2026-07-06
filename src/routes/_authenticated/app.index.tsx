import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  CreditCard,
  Database,
  Keyboard,
  Package,
  Rocket,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { ComingSoonCard } from "@/components/common/ComingSoonCard";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { WidgetCard } from "@/components/common/WidgetCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ROLE_META } from "@/config/roles";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { useAuth } from "@/providers/AuthProvider";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Dashboard — RetailOS AI" }] }),
  component: DashboardPage,
});

import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

function DashboardPage() {
  const { user } = useAuth();
  const { activeMembership, role } = useActiveOrg();
  const firstName =
    ((user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "there").split(
      " ",
    )[0];

  return (
    <div className="container-page space-y-8 py-8 sm:py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <PageHeader
          eyebrow="Dashboard"
          title={`Welcome back, ${firstName}`}
          description={
            activeMembership
              ? `You're signed in to ${activeMembership.organization.name} as ${
                  role ? ROLE_META[role].label : "member"
                }.`
              : "Your workspace is ready."
          }
          actions={
            <>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Keyboard className="h-3.5 w-3.5" /> ⌘K
              </Button>
              <Button size="sm" className="gap-1.5" disabled>
                <Sparkles className="h-3.5 w-3.5" /> Invite team
              </Button>
            </>
          }
        />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 lg:grid-cols-3"
      >
        <motion.div variants={item} className="lg:col-span-2">
          <WidgetCard
            title="Welcome to RetailOS AI"
            description="Your workspace is set up. Business modules will plug in here as they ship."
            icon={Rocket}
            action={
              <Badge variant="secondary" className="border-border/60 bg-background/70 text-[10px] uppercase tracking-wider">
                Foundation
              </Badge>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: CheckCircle2, label: "Organization created", done: true },
                { icon: CheckCircle2, label: "Team roles configured", done: true },
                { icon: Users, label: "Invite your team", done: false },
                { icon: ShoppingBag, label: "Add your first product", done: false },
              ].map((step) => (
                <div
                  key={step.label}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-surface/60 px-3 py-2.5"
                >
                  <step.icon
                    className={
                      step.done
                        ? "h-4 w-4 text-emerald-600 dark:text-emerald-400"
                        : "h-4 w-4 text-muted-foreground"
                    }
                  />
                  <span className={step.done ? "text-sm text-foreground" : "text-sm text-muted-foreground"}>
                    {step.label}
                  </span>
                  {!step.done && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                      Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </WidgetCard>
        </motion.div>

        <motion.div variants={item}>
          <WidgetCard
            title="System status"
            description="All systems operational."
            icon={Activity}
          >
            <div className="space-y-2.5 text-sm">
              {[
                { label: "API", status: "Operational" },
                { label: "Database", status: "Operational" },
                { label: "Authentication", status: "Operational" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </WidgetCard>
        </motion.div>

        <motion.div variants={item}>
          <WidgetCard title="Quick actions" description="Shortcuts appear here once modules ship." icon={Zap}>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: ShoppingBag, label: "New product" },
                { icon: Users, label: "Add customer" },
                { icon: Package, label: "New order" },
                { icon: Sparkles, label: "Ask AI" },
              ].map((a) => (
                <button
                  key={a.label}
                  type="button"
                  disabled
                  className="group flex flex-col items-start gap-1.5 rounded-lg border border-dashed border-border/70 bg-surface-muted/30 p-3 text-left transition-colors hover:border-border disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <a.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">{a.label}</span>
                </button>
              ))}
            </div>
          </WidgetCard>
        </motion.div>

        <motion.div variants={item}>
          <WidgetCard title="Recent activity" description="A live feed of workspace events." icon={Activity}>
            <EmptyState
              icon={Activity}
              title="No activity yet"
              description="Events from sales, inventory and your team will appear here."
              className="border-0 bg-transparent px-0 py-6"
            />
          </WidgetCard>
        </motion.div>

        <motion.div variants={item}>
          <WidgetCard title="Storage" description="Files, media and exports." icon={Database}>
            <div className="space-y-2">
              <Progress value={4} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>40 MB of 1 GB used</span>
                <span>Free plan</span>
              </div>
            </div>
          </WidgetCard>
        </motion.div>

        <motion.div variants={item}>
          <WidgetCard title="Subscription" description="Your plan and billing." icon={CreditCard}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Starter</p>
                <p className="text-xs text-muted-foreground">Free during preview</p>
              </div>
              <Button size="sm" variant="outline" disabled>
                Manage
              </Button>
            </div>
          </WidgetCard>
        </motion.div>
      </motion.div>

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Coming soon
            </h2>
            <p className="text-sm text-muted-foreground">
              Modules under active development — they'll appear in your sidebar as they ship.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ComingSoonCard icon={Users} title="Customers & CRM" description="Profiles, loyalty, segments and journeys." />
          <ComingSoonCard icon={ShoppingBag} title="Products & Inventory" description="Catalog, variants, stock and transfers." />
          <ComingSoonCard icon={Package} title="Orders & Fulfilment" description="Sales, returns, invoices and shipping." />
          <ComingSoonCard icon={Sparkles} title="AI Copilot" description="Ask questions across your store's data." />
          <ComingSoonCard icon={Activity} title="Reports & Analytics" description="Sales, staff, stock and finance insights." />
          <ComingSoonCard icon={CreditCard} title="Finance" description="Ledgers, GST, payouts and reconciliation." />
        </div>
      </section>
    </div>
  );
}