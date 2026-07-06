import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROLE_META } from "@/config/roles";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { useAuth } from "@/providers/AuthProvider";

export const Route = createFileRoute("/_authenticated/app/settings")({
  head: () => ({ meta: [{ title: "Settings — RetailOS AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const { activeMembership, role } = useActiveOrg();

  return (
    <div className="container-page py-8 sm:py-10">
      <PageHeader
        title="Settings"
        description="Manage your profile and workspace configuration."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
            <CardDescription>Your account information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Name" value={(user?.user_metadata?.full_name as string) ?? "—"} />
            <Separator />
            <Row label="Email" value={user?.email ?? "—"} />
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-subtle text-brand">
              <Building2 className="h-4.5 w-4.5" />
            </div>
            <CardTitle className="mt-2 text-base">Organization</CardTitle>
            <CardDescription>Your active workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Business" value={activeMembership?.organization.name ?? "—"} />
            <Separator />
            <Row label="Store" value={activeMembership?.organization.store_name ?? "—"} />
            <Separator />
            <Row
              label="Timezone"
              value={activeMembership?.organization.timezone ?? "—"}
            />
            <Separator />
            <Row
              label="Currency"
              value={activeMembership?.organization.currency ?? "—"}
            />
            <Separator />
            <Row label="Your role" value={role ? ROLE_META[role].label : "—"} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}