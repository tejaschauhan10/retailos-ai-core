import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/verify-email")({
  head: () => ({ meta: [{ title: "Verify your email — RetailOS AI" }] }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface p-8 text-center shadow-lg">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-subtle text-brand">
        <MailCheck className="h-5 w-5" />
      </div>
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        Check your inbox
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We've sent a verification link to your email. Click it to activate your
        RetailOS AI workspace.
      </p>
      <Button asChild className="mt-6 w-full" variant="outline">
        <Link to="/auth/login">Back to sign in</Link>
      </Button>
    </div>
  );
}