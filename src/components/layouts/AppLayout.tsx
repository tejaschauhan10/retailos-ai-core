import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ActiveOrgProvider, useActiveOrg } from "@/providers/ActiveOrgProvider";
import { Skeleton } from "@/components/ui/skeleton";

import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function AppLayout() {
  return (
    <ActiveOrgProvider>
      <RequireOrganization>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <div className="flex-1">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </RequireOrganization>
    </ActiveOrgProvider>
  );
}

function RequireOrganization({ children }: { children: React.ReactNode }) {
  const { isLoading, hasOrganization } = useActiveOrg();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    if (isLoading) return;
    if (!hasOrganization && !pathname.startsWith("/onboarding")) {
      navigate({ to: "/onboarding/organization", replace: true });
    }
  }, [hasOrganization, isLoading, navigate, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!hasOrganization) return null;
  return <>{children}</>;
}