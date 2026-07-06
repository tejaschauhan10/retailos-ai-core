import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  showText?: boolean;
  to?: string;
}

export function Logo({ className, showText = true, to = "/" }: LogoProps) {
  return (
    <Link
      to={to}
      aria-label={`${siteConfig.name} home`}
      className={cn("inline-flex items-center gap-2 group", className)}
    >
      <LogoMark />
      {showText && (
        <span className="font-semibold text-[15px] tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-7 w-7 items-center justify-center rounded-lg gradient-brand text-brand-foreground shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 8l8-4 8 4-8 4-8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 16l8 4 8-4" />
      </svg>
    </span>
  );
}