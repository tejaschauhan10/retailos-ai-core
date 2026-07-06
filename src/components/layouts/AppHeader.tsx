import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Command as CommandIcon, LogOut, Settings, UserCircle } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { authService } from "@/features/auth/services/auth.service";
import { useAuth } from "@/providers/AuthProvider";

export function AppHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = useMemo(() => {
    const name = (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "?";
    return name
      .split(/\s+/)
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user]);

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "Account";

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      toast.success("Signed out");
      navigate({ to: "/auth/login", replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not sign out";
      toast.error(message);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl sm:px-5">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1" />
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" disabled aria-label="Command palette">
              <CommandIcon className="h-[1.15rem] w-[1.15rem]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Command palette — coming soon</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" disabled aria-label="Notifications">
              <Bell className="h-[1.15rem] w-[1.15rem]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications — coming soon</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-2 px-1.5"
            aria-label="Open profile menu"
          >
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-brand-subtle text-brand text-xs font-medium">
                {initials || "?"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="truncate">{displayName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/app/settings">
              <UserCircle className="mr-2 h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/app/settings">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}