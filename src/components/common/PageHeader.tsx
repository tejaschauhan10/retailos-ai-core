import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  showBreadcrumbs?: boolean;
  eyebrow?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
  showBreadcrumbs = true,
  eyebrow,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {showBreadcrumbs && <Breadcrumbs />}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}