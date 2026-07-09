import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { Card } from "@/components/ui/card";
import type { WorkspaceModule } from "@/config/modules";
import { cn } from "@/lib/utils";

interface RecentWorkspacesProps {
  modules: WorkspaceModule[];
}

export function RecentWorkspaces({ modules }: RecentWorkspacesProps) {
  return (
    <section aria-labelledby="recents-title" className="space-y-3">
      <div>
        <h2 id="recents-title" className="text-base font-semibold tracking-tight text-foreground">
          Recent workspaces
        </h2>
        <p className="text-xs text-muted-foreground">
          Modules you've opened recently in this organization.
        </p>
      </div>
      {modules.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No recent activity yet"
          description="Open a workspace and it will appear here for quick re-entry."
        />
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const disabled = mod.comingSoon || mod.status !== "live";
            const inner = (
              <Card
                className={cn(
                  "flex items-center gap-3 border-border/60 bg-card/95 p-3 transition-colors",
                  !disabled && "hover:border-border hover:bg-surface",
                )}
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-muted text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{mod.title}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{mod.description}</p>
                </div>
              </Card>
            );
            return disabled ? (
              <div key={mod.id} aria-disabled className="opacity-70">
                {inner}
              </div>
            ) : (
              <Link key={mod.id} to={mod.route} className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {inner}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
