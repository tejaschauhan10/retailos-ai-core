import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { useMemo } from "react";

import { NAV_LABELS } from "@/config/nav";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  to?: string;
}

const STATIC_LABELS: Record<string, string> = {
  "/app": "Dashboard",
  "/app/settings": "Settings",
  "/onboarding/organization": "Create workspace",
};

function labelForSegment(segment: string, fullPath: string): string {
  if (NAV_LABELS[fullPath]) return NAV_LABELS[fullPath];
  if (STATIC_LABELS[fullPath]) return STATIC_LABELS[fullPath];
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const crumbs = useMemo<Crumb[]>(() => {
    const parts = pathname.split("/").filter(Boolean);
    const items: Crumb[] = [];
    let acc = "";
    for (const p of parts) {
      acc += `/${p}`;
      items.push({ label: labelForSegment(p, acc), to: acc });
    }
    return items;
  }, [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "hidden items-center gap-1 text-sm text-muted-foreground md:flex",
        className,
      )}
    >
      <Link
        to="/app"
        className="flex items-center rounded-md p-1 hover:bg-muted/60 hover:text-foreground"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <div key={c.to ?? c.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            {isLast || !c.to ? (
              <span className="truncate font-medium text-foreground">{c.label}</span>
            ) : (
              <Link
                to={c.to}
                className="truncate rounded-md px-1 py-0.5 hover:bg-muted/60 hover:text-foreground"
              >
                {c.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}