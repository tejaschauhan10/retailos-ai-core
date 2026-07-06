import { Link, useNavigate } from "@tanstack/react-router";
import {
  CreditCard,
  Keyboard,
  LogOut,
  Settings,
  Store,
  UserCircle,
} from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/features/auth/services/auth.service";
import { useAuth } from "@/providers/AuthProvider";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { useCommandPalette } from "./CommandPalette";

export function UserMenu() {
  const { user } = useAuth();
  const { activeMembership } = useActiveOrg();
  const navigate = useNavigate();
  const palette = useCommandPalette();

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "Account";

  const initials = useMemo(() => {
    return displayName
      .split(/\s+/)
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [displayName]);

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
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-brand-subtle text-brand text-xs font-medium">
              {initials || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs font-normal text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/app/settings">
              <UserCircle className="mr-2 h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>
          {activeMembership && (
            <DropdownMenuItem asChild>
              <Link to="/app/settings">
                <Store className="mr-2 h-4 w-4" /> Organization
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              toast.info("Billing is coming soon.");
            }}
          >
            <CreditCard className="mr-2 h-4 w-4" /> Billing
            <DropdownMenuShortcut className="text-[10px] uppercase">Soon</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/app/settings">
              <Settings className="mr-2 h-4 w-4" /> Settings
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => palette.setOpen(true)}>
            <Keyboard className="mr-2 h-4 w-4" /> Command palette
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}