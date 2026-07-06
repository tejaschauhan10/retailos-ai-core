import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComingSoonCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  eta?: string;
  className?: string;
}

/**
 * Marks a future module surface. Placeholder — never contains business logic.
 */
export function ComingSoonCard({
  title,
  description,
  icon: Icon = Sparkles,
  eta,
  className,
}: ComingSoonCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-dashed border-border/70 bg-surface-muted/40 p-5",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-subtle text-brand">
          <Icon className="h-[1.05rem] w-[1.05rem]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {title}
            </h3>
            <Badge
              variant="secondary"
              className="border-border/60 bg-background/70 text-[10px] font-medium uppercase tracking-wider"
            >
              {eta ?? "Coming soon"}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}