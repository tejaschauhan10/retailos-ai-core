import { cn } from "@/shared/lib/cn";
import { Spinner } from "./Spinner";

interface GlobalLoadingOverlayProps {
  show: boolean;
  label?: string;
  className?: string;
}

export function GlobalLoadingOverlay({ show, label, className }: GlobalLoadingOverlayProps) {
  if (!show) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm",
        className,
      )}
    >
      <Spinner size={32} />
      {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}
    </div>
  );
}