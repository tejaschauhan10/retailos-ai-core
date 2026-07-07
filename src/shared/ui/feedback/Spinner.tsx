import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Spinner({ size = 16, className, label }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className={cn("inline-flex items-center gap-2", className)}>
      <Loader2 className="animate-spin text-muted-foreground" style={{ width: size, height: size }} />
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <span className="sr-only">{label ?? "Loading"}</span>
    </span>
  );
}