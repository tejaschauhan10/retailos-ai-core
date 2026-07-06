import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { authService } from "@/features/auth/services/auth.service";
import { registerSchema, type RegisterInput } from "@/features/auth/schemas";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Create your workspace — RetailOS AI" },
      { name: "description", content: "Start your RetailOS AI workspace in minutes." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });
  const { register, handleSubmit, formState, watch } = form;
  const password = watch("password");

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await authService.register(values);
      if (!result.session) {
        toast.success("Check your inbox to verify your email");
        navigate({ to: "/auth/verify-email" });
        return;
      }
      toast.success("Workspace created");
      navigate({ to: "/onboarding/organization", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create account");
    }
  });

  return (
    <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-lg sm:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Create your workspace
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up RetailOS AI for your store in under two minutes.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            {...register("fullName")}
            aria-invalid={!!formState.errors.fullName}
          />
          {formState.errors.fullName && (
            <p className="text-xs text-destructive">{formState.errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!formState.errors.email}
          />
          {formState.errors.email && (
            <p className="text-xs text-destructive">{formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
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
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-medium text-foreground hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}