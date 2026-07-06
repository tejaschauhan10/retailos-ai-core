import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Store } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createOrganizationSchema,
  type CreateOrganizationInput,
} from "@/features/organization/schemas";
import { useCreateOrganization } from "@/features/organization/hooks/useCreateOrganization";
import { useMyMemberships } from "@/features/organization/hooks/useMyMemberships";
import { CURRENCIES, TIMEZONES } from "@/lib/timezones";

export const Route = createFileRoute("/_authenticated/onboarding/organization")({
  head: () => ({ meta: [{ title: "Set up your workspace — RetailOS AI" }] }),
  component: OnboardingOrganizationPage,
});

function OnboardingOrganizationPage() {
  const navigate = useNavigate();
  const { data: memberships, isLoading } = useMyMemberships();
  const createOrg = useCreateOrganization();

  const form = useForm<CreateOrganizationInput>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      store_name: "",
      gst_number: "",
      phone: "",
      timezone: "Asia/Kolkata",
      currency: "INR",
    },
  });
  const { register, handleSubmit, setValue, watch, formState } = form;

  // If they already have an org, skip onboarding.
  useEffect(() => {
    if (!isLoading && memberships && memberships.length > 0) {
      navigate({ to: "/app", replace: true });
    }
  }, [isLoading, memberships, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createOrg.mutateAsync(values);
      toast.success("Workspace created");
      navigate({ to: "/app", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create organization");
    }
  });

  const timezone = watch("timezone");
  const currency = watch("currency");

  return (
    <div className="relative min-h-dvh bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand-subtle/60 to-transparent"
      />
      <div className="relative flex min-h-dvh flex-col">
        <header className="flex items-center justify-between px-6 py-5 sm:px-10">
          <Logo />
          <ThemeToggle />
        </header>
        <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-4 sm:items-center sm:px-6">
          <div className="w-full max-w-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-subtle text-brand">
                <Store className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Set up your workspace
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us about your business. You can invite your team later.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-lg sm:p-8">
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Business name</Label>
                  <Input id="name" placeholder="Acme Apparel Pvt Ltd" {...register("name")} />
                  {formState.errors.name && (
                    <p className="text-xs text-destructive">{formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="store_name">Store name</Label>
                  <Input id="store_name" placeholder="Acme Flagship — MG Road" {...register("store_name")} />
                  {formState.errors.store_name && (
                    <p className="text-xs text-destructive">{formState.errors.store_name.message}</p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="gst_number">GST number (optional)</Label>
                    <Input id="gst_number" placeholder="29ABCDE1234F1Z5" {...register("gst_number")} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" {...register("phone")} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Timezone</Label>
                    <Select value={timezone} onValueChange={(v) => setValue("timezone", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMEZONES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={(v) => setValue("currency", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                  {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create workspace
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}