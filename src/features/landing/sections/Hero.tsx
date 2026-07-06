import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-gradient-to-b from-brand-subtle/70 via-brand-subtle/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 -z-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="container-page relative pb-20 pt-16 sm:pb-28 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            AI native · Built for modern fashion retail
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            The operating system for{" "}
            <span className="text-gradient-brand">modern fashion retail</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            RetailOS AI unifies inventory, point of sale, customers, orders and
            finance in one intelligent platform — with an AI copilot that
            actually knows your store.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-11 px-6 text-[15px]">
              <Link to="/auth/register">
                Start free
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-[15px]">
              <Link to="/auth/login">Sign in</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required · Set up in minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border/70 bg-surface p-2 shadow-elevated">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-surface-muted to-brand-subtle/40">
              <div className="grid h-full grid-cols-6 gap-2 p-4">
                <div className="col-span-1 space-y-2">
                  <div className="h-6 rounded-md bg-surface" />
                  <div className="h-4 rounded-md bg-surface/80" />
                  <div className="h-4 rounded-md bg-surface/80" />
                  <div className="h-4 rounded-md bg-surface/80" />
                </div>
                <div className="col-span-5 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-20 rounded-lg bg-surface" />
                    <div className="h-20 rounded-lg bg-surface" />
                    <div className="h-20 rounded-lg bg-surface" />
                  </div>
                  <div className="h-56 rounded-lg bg-surface" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}