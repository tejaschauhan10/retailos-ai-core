import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { authService } from "@/features/auth/services/auth.service";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/features/auth/schemas";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Set a new password — RetailOS AI" }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const { register, handleSubmit, formState, watch } = form;
  const password = watch("password");

  const onSubmit = handleSubmit(async (values) => {
    try {
      await authService.resetPassword(values);
      toast.success("Password updated");
      navigate({ to: "/app", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password");
    }
  });

  return (
    <AuthLayoutWrapper>
      <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-lg sm:p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Set a new password
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a strong password you don't use anywhere else.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={!!formState.errors.password}
            />
            {formState.errors.password && (
              <p className="text-xs text-destructive">{formState.errors.password.message}</p>
            )}
            <PasswordStrengthMeter password={password ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              aria-invalid={!!formState.errors.confirmPassword}
            />
            {formState.errors.confirmPassword && (
              <p className="text-xs text-destructive">{formState.errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
            {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update password
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/auth/login" className="font-medium text-foreground hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthLayoutWrapper>
  );
}

function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  // Render the auth chrome without routing through /auth so the recovery link works.
  return (
    <div className="relative min-h-dvh bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand-subtle/60 to-transparent"
      />
      <div className="relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

// AuthLayout kept for potential reuse.
void AuthLayout;