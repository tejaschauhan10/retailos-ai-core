import { motion } from "framer-motion";
import { Activity, Calendar, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

interface WelcomeBannerProps {
  firstName: string;
  organizationName: string;
  businessTypeLabel: string;
  roleLabel: string;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function greetingFor(d: Date): string {
  const h = d.getHours();
  if (h < 5) return "Good night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

export function WelcomeBanner({
  firstName,
  organizationName,
  businessTypeLabel,
  roleLabel,
}: WelcomeBannerProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const greeting = now ? greetingFor(now) : "Welcome";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-surface via-card to-surface p-5 sm:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--brand)_18%,transparent),transparent_65%)] md:block"
      />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Retail Workspace
          </div>
          <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {greeting}, {firstName}.
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            You are signed in to{" "}
            <span className="font-medium text-foreground">{organizationName}</span> as{" "}
            <span className="font-medium text-foreground">{roleLabel}</span>. Choose a
            workspace below to get started, or search with{" "}
            <kbd className="rounded border border-border/60 bg-background px-1 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
            .
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge
              variant="secondary"
              className="border-border/60 bg-background/60 text-[10px] uppercase tracking-wider"
            >
              {businessTypeLabel}
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 border-emerald-500/25 bg-emerald-500/10 text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Workspace healthy
            </Badge>
            <Badge
              variant="secondary"
              className="border-border/60 bg-background/60 text-[10px] uppercase tracking-wider"
            >
              Starter plan · preview
            </Badge>
          </div>
        </div>

        <div className="shrink-0 rounded-xl border border-border/60 bg-background/60 p-3 text-sm shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-xs" suppressHydrationWarning>
              {now ? formatDate(now) : "—"}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-brand" />
            <span
              className="font-mono text-lg font-semibold tracking-tight text-foreground"
              suppressHydrationWarning
            >
              {now ? formatTime(now) : "--:--"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
