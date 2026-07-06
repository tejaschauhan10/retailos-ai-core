import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { scorePassword } from "../schemas";

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

const barColors = [
  "bg-destructive",
  "bg-destructive/80",
  "bg-warning",
  "bg-brand",
  "bg-success",
];

export function PasswordStrengthMeter({
  password,
  className,
}: PasswordStrengthMeterProps) {
  const { score, label } = useMemo(() => scorePassword(password), [password]);
  if (!password) return null;

  return (
    <div className={cn("space-y-1.5", className)} aria-live="polite">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < score ? barColors[score] : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium text-foreground">{label}</span>
      </p>
    </div>
  );
}