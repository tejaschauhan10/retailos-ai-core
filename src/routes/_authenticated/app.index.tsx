import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Sparkles, Zap } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLE_META } from "@/config/roles";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { useAuth } from "@/providers/AuthProvider";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Dashboard — RetailOS AI" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const { activeMembership, role } = useActiveOrg();
  const firstName =
    ((user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "there").split(
      " ",
    )[0];

  return (
    <div className="container-page py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PageHeader
          title={`Welcome back, ${firstName}`}
          description={
            activeMembership
              ? `You're signed in to ${activeMembership.organization.name} as ${
                  role ? ROLE_META[role].label : "member"
                }.`
              : "Your workspace is ready."
          }
        />
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Widgets coming online",
            description:
              "Sales, stock, customers and finance widgets will appear here as modules ship.",
            icon: Sparkles,
          },
          {
            title: "Quick actions",
            description:
              "One-click shortcuts to create products, ring a sale or add a customer.",
            icon: Zap,
          },
          {
            title: "Recent activity",
            description:
              "A live feed of actions from you and your team, once modules are enabled.",
            icon: Activity,
          },
        ].map((c) => (
          <Card key={c.title} className="border-border/70">
            <CardHeader className="space-y-1.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                <c.icon className="h-4.5 w-4.5" />
              </div>
              <CardTitle className="text-base">{c.title}</CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-lg border border-dashed border-border bg-surface-muted/40" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <EmptyState
          icon={Sparkles}
          title="Your platform is ready"
          description="Business modules — CRM, Inventory, POS, Orders, Reports, Finance and the AI copilot — will plug in here as they ship."
        />
      </div>
    </div>
  );
}