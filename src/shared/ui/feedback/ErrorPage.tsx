import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Lock,
  ServerCrash,
  ShieldAlert,
  SearchX,
  WifiOff,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type ErrorKind = "404" | "500" | "unauthorized" | "forbidden" | "offline" | "generic";

interface ErrorPageProps {
  kind?: ErrorKind;
  title?: string;
  description?: string;
  action?: ReactNode;
  onRetry?: () => void;
}

const meta: Record<ErrorKind, { icon: LucideIcon; title: string; description: string }> = {
  "404": {
    icon: SearchX,
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has moved.",
  },
  "500": {
    icon: ServerCrash,
    title: "Something broke on our end",
    description: "An unexpected error occurred. Our team has been notified.",
  },
  unauthorized: {
    icon: Lock,
    title: "Sign in required",
    description: "You need to be signed in to view this page.",
  },
  forbidden: {
    icon: ShieldAlert,
    title: "You don't have access",
    description: "This area is restricted to users with additional permissions.",
  },
  offline: {
    icon: WifiOff,
    title: "You're offline",
    description: "Reconnect to the internet to continue using RetailOS AI.",
  },
  generic: {
    icon: AlertTriangle,
    title: "Something went wrong",
    description: "Please try again in a moment.",
  },
};

export function ErrorPage({
  kind = "generic",
  title,
  description,
  action,
  onRetry,
}: ErrorPageProps) {
  const m = meta[kind];
  const Icon = m.icon;
  return (
    <div className="grid min-h-[70vh] place-items-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-subtle text-brand">
          <Icon className="h-6 w-6" />
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {title ?? m.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {description ?? m.description}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              Try again
            </Button>
          )}
          {action ?? (
            <Button asChild>
              <Link to="/">Back home</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}