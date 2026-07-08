import { cn } from "@/shared/lib/cn";

interface ProgressIndicatorProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
  indeterminate?: boolean;
}

export function ProgressIndicator({
  value,
  max = 100,
  className,
  label,
  indeterminate,
}: ProgressIndicatorProps) {
  const pct = indeterminate ? 100 : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>{label}</span>
          {!indeterminate && <span>{Math.round(pct)}%</span>}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn(
            "h-full bg-primary transition-[width] duration-300",
            indeterminate && "animate-pulse",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}