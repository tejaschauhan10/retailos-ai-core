import { Link, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";

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
import { ModuleLauncher } from "@/features/workspace/components/ModuleLauncher";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const [launcherOpen, setLauncherOpen] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setLauncherOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="gap-3 px-3 pt-3">
        <div className="flex items-center px-1">
          {collapsed ? <LogoMark /> : <Logo />}
        </div>
        <WorkspaceSwitcher collapsed={collapsed} />
        <SidebarMenuButton
          tooltip="Open Module Launcher (⌘⇧L)"
          onClick={() => setLauncherOpen(true)}
          className="justify-start gap-2 border border-border/60 bg-surface-muted/40 text-foreground hover:bg-surface-muted"
        >
          <LayoutGrid className="h-4 w-4 text-brand" />
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-left">All modules</span>
              <kbd className="pointer-events-none hidden select-none rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                ⌘⇧L
              </kbd>
            </>
          )}
        </SidebarMenuButton>
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
      <ModuleLauncher open={launcherOpen} onOpenChange={setLauncherOpen} />
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