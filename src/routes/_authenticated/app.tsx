import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/layouts/AppLayout";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppLayout,
});