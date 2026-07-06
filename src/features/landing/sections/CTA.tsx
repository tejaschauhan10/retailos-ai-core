import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="container-page pb-24 pt-12">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface p-10 shadow-md sm:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready to run your store on RetailOS AI?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Create your workspace in under two minutes. No credit card required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6 text-[15px]">
              <Link to="/auth/register">
                Get started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-[15px]">
              <Link to="/auth/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}