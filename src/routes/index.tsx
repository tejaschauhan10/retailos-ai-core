import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout } from "@/components/layouts/PublicLayout";
import { CTA } from "@/features/landing/sections/CTA";
import { FAQ } from "@/features/landing/sections/FAQ";
import { Features } from "@/features/landing/sections/Features";
import { Hero } from "@/features/landing/sections/Hero";
import { Pricing } from "@/features/landing/sections/Pricing";
import { Testimonials } from "@/features/landing/sections/Testimonials";
import { Why } from "@/features/landing/sections/Why";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <PublicLayout>
      <Hero />
      <Features />
      <Why />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </PublicLayout>
  );
}
