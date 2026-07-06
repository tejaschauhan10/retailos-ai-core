import { Link, useRouterState } from "@tanstack/react-router";

import { Logo, LogoMark } from "@/components/common/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { APP_NAV } from "@/config/nav";
import { usePermission } from "@/features/rbac/hooks/usePermission";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import type { NavItem } from "@/config/nav";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const { activeMembership } = useActiveOrg();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 pt-3">
        {collapsed ? <LogoMark /> : <Logo />}
      </SidebarHeader>
      <SidebarContent className="px-2">
        {APP_NAV.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <NavRow
                    key={item.to}
                    item={item}
                    active={
                      currentPath === item.to ||
                      (item.to !== "/app" && currentPath.startsWith(item.to))
                    }
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {activeMembership && !collapsed && (
        <SidebarFooter className="px-3 pb-3">
          <div className="rounded-lg border border-border/70 bg-surface p-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Organization
            </p>
            <p className="mt-1 truncate text-sm font-medium text-foreground">
              {activeMembership.organization.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {activeMembership.organization.store_name}
            </p>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const allowed = usePermission(item.permission ?? "dashboard.view");
  if (item.permission && !allowed) return null;

  const Icon = item.icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
        <Link to={item.to} className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}