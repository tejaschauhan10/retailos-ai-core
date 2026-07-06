import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  trend?: { value: string; direction: "up" | "down" | "flat" };
  hint?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  hint,
  className,
}: StatCardProps) {
  const TrendIcon =
    trend?.direction === "down"
      ? ArrowDownRight
      : trend?.direction === "up"
        ? ArrowUpRight
        : null;
  const trendColor =
    trend?.direction === "down"
      ? "text-destructive"
      : trend?.direction === "up"
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-muted-foreground";

  return (
    <Card className={cn("p-5 border-border/70", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {(trend || hint) && (
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              {TrendIcon && (
                <span className={cn("flex items-center gap-0.5 font-medium", trendColor)}>
                  <TrendIcon className="h-3.5 w-3.5" />
                  {trend?.value}
                </span>
              )}
              {hint && <span className="text-muted-foreground">{hint}</span>}
            </div>
          )}
        </div>
        {Icon && (
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-subtle text-brand">
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </div>
        )}
      </div>
    </Card>
  );
}