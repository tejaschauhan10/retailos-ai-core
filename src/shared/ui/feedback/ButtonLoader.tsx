import { Loader2 } from "lucide-react";

import { cn } from "@/shared/lib/cn";

interface ButtonLoaderProps {
  className?: string;
}

/** Inline spinner sized for a button label. */
export function ButtonLoader({ className }: ButtonLoaderProps) {
  return <Loader2 className={cn("h-4 w-4 animate-spin", className)} aria-hidden />;
}