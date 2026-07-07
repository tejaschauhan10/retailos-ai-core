import type { LucideIcon } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ErrorCardProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

export function ErrorCard({
  title = "Something went wrong",
  description = "We couldn't load this section. Please try again.",
  icon: Icon = AlertTriangle,
  action,
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <Card
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 border-destructive/30 bg-destructive/5 p-8 text-center",
        className,
      )}
    >
      <div className="grid h-11 w-11 place-items-center rounded-full bg-destructive/10 text-destructive">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {(action || onRetry) && (
        <div className="mt-1 flex gap-2">
          {onRetry && (
            <Button size="sm" variant="outline" onClick={onRetry}>
              Try again
            </Button>
          )}
          {action}
        </div>
      )}
    </Card>
  );
}