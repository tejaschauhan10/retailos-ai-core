import { Link, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";

import { Logo, LogoMark } from "@/components/common/Logo";
import { Badge } from "@/components/ui/badge";
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
import type { NavItem } from "@/config/nav";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="gap-3 px-3 pt-3">
        <div className="flex items-center px-1">
          {collapsed ? <LogoMark /> : <Logo />}
        </div>
        <WorkspaceSwitcher collapsed={collapsed} />
      </SidebarHeader>
      <SidebarContent className="px-2">
        {APP_NAV.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
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
                      !item.comingSoon &&
                      (currentPath === item.to ||
                        (item.to !== "/app" && currentPath.startsWith(item.to)))
                    }
                    collapsed={collapsed}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-3 pb-3">
        {!collapsed && (
          <div className="rounded-lg border border-border/60 bg-surface-muted/50 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              What's next
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Business modules roll out weekly. You'll see them light up here as they land.
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

function NavRow({
  item,
  active,
  collapsed,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
}) {
  const allowed = usePermission(item.permission ?? "dashboard.view");
  if (item.permission && !allowed) return null;

  const Icon = item.icon;
  const tooltip = item.comingSoon ? `${item.label} — coming soon` : item.label;

  if (item.comingSoon) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={tooltip}
          onClick={() => toast.info(`${item.label} is coming soon.`)}
          className="text-muted-foreground opacity-80 hover:opacity-100"
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1 truncate">{item.label}</span>
          {!collapsed && (
            <Badge
              variant="secondary"
              className="ml-auto h-5 shrink-0 border-transparent bg-muted/60 px-1.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              Soon
            </Badge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} tooltip={tooltip}>
        <Link to={item.to} className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}