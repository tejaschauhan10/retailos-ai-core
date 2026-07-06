import { Search } from "lucide-react";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCommandPalette } from "./CommandPalette";
import { NotificationCenter } from "./NotificationCenter";
import { UserMenu } from "./UserMenu";

export function AppHeader() {
  const palette = useCommandPalette();

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl sm:px-5"
    >
      <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />

      <div className="hidden h-6 w-px bg-border/70 md:block" />

      <Breadcrumbs className="min-w-0 flex-1" />

      <div className="flex flex-1 items-center justify-end gap-1.5 md:flex-none">
        <Button
          variant="outline"
          size="sm"
          onClick={() => palette.setOpen(true)}
          className="hidden h-9 min-w-[220px] justify-between gap-6 rounded-lg border-border/60 bg-surface/60 px-3 text-muted-foreground hover:bg-muted/60 md:flex"
          aria-label="Open search"
        >
          <span className="flex items-center gap-2 text-sm">
            <Search className="h-4 w-4" />
            Search anything
          </span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/60 bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => palette.setOpen(true)}
          aria-label="Open search"
          className="md:hidden"
        >
          <Search className="h-[1.15rem] w-[1.15rem]" />
        </Button>

        <NotificationCenter />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}