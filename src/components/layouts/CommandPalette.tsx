import { useNavigate } from "@tanstack/react-router";
import { LogOut, Search, Settings } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { APP_NAV } from "@/config/nav";
import { authService } from "@/features/auth/services/auth.service";
import { toast } from "sonner";

interface CommandPaletteCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
}

const Ctx = createContext<CommandPaletteCtx | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<CommandPaletteCtx>(
    () => ({ open, setOpen, toggle: () => setOpen((o) => !o) }),
    [open],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <CommandPalette />
    </Ctx.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  return ctx;
}

function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const navigate = useNavigate();

  const go = (to: string) => {
    setOpen(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search commands, navigate, or ask AI..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Search className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No matches. Try another query.
            </p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Navigate">
          {APP_NAV.flatMap((g) => g.items).map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.to}
                value={`${item.label} ${item.description ?? ""}`}
                onSelect={() =>
                  item.comingSoon
                    ? toast.info(`${item.label} is coming soon.`)
                    : go(item.to)
                }
                className="gap-2"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
                {item.comingSoon && (
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                    Soon
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem onSelect={() => go("/app/settings")} className="gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={async () => {
              setOpen(false);
              try {
                await authService.signOut();
                toast.success("Signed out");
                navigate({ to: "/auth/login", replace: true });
              } catch (err) {
                const message = err instanceof Error ? err.message : "Could not sign out";
                toast.error(message);
              }
            }}
            className="gap-2 text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}