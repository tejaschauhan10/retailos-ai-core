import { createFileRoute, redirect } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    // If already signed in and visiting /auth/*, bounce to the app.
    const { data } = await supabase.auth.getSession();
    if (data.session && location.pathname !== "/auth/verify-email") {
      throw redirect({ to: "/app" });
    }
  },
  component: AuthLayout,
});