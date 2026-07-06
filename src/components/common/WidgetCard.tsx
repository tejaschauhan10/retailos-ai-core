import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WidgetCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Reusable widget container. Every dashboard widget — sales, stock,
 * activity feed, storage — mounts inside this shell so spacing, borders
 * and headings stay consistent across modules.
 */
export function WidgetCard({
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
  contentClassName,
}: WidgetCardProps) {
  return (
    <Card
      className={cn(
        "group border-border/70 bg-card/95 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div className="flex items-start gap-3 min-w-0">
          {Icon && (
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-subtle text-brand">
              <Icon className="h-[1.05rem] w-[1.05rem]" />
            </div>
          )}
          <div className="min-w-0">
            <CardTitle className="truncate text-sm font-semibold">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-0.5 text-xs">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </CardHeader>
      {children !== undefined && (
        <CardContent className={cn("pt-0", contentClassName)}>
          {children}
        </CardContent>
      )}
    </Card>
  );
}