import { Link } from "@tanstack/react-router";
import { Command, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { MODULE_REGISTRY, searchModules, type WorkspaceModule } from "@/config/modules";
import { cn } from "@/lib/utils";

interface CommandCenterProps {
  className?: string;
}

const SUGGESTIONS = [
  "Ask RetailOS…",
  "Today's sales",
  "Show low stock",
  "Create customer",
  "Forecast sales",
  "Generate report",
  "Find product",
  "Search invoices",
  "Open Billing",
  "Open CRM",
];

/**
 * Premium global command center — placeholder for the future unified
 * search + AI command bar. Renders results dynamically from the module
 * registry; entity search plugs in later.
 */
export function CommandCenter({ className }: CommandCenterProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results: WorkspaceModule[] = useMemo(
    () => (query ? searchModules(query).slice(0, 6) : MODULE_REGISTRY.slice(0, 6)),
    [query],
  );

  const placeholder = SUGGESTIONS[Math.floor(Date.now() / 5000) % SUGGESTIONS.length];

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Sparkles className="pointer-events-none absolute right-14 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-violet-400" aria-hidden />
        <Input
          role="searchbox"
          aria-label="Ask RetailOS or search modules"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          className="h-12 rounded-2xl border-border/60 bg-surface/70 pl-10 pr-24 text-sm shadow-sm focus-visible:bg-background"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded-md border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
          <Command className="h-3 w-3" /> K
        </kbd>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-2xl border border-border/60 bg-popover shadow-xl">
          <div className="border-b border-border/50 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {query ? "Matches" : "Jump to a module"}
          </div>
          <ul className="max-h-72 overflow-auto py-1">
            {results.map((m) => {
              const Icon = m.icon;
              const disabled = m.comingSoon || m.status !== "live";
              const content = (
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/60">
                  <div className="grid h-7 w-7 place-items-center rounded-md border border-border/60 bg-surface text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{m.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{m.description}</p>
                  </div>
                  {disabled && (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Soon</span>
                  )}
                </div>
              );
              return (
                <li key={m.id}>
                  {disabled ? (
                    <div className="cursor-not-allowed opacity-70">{content}</div>
                  ) : (
                    <Link to={m.route} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border/50 bg-surface/40 px-3 py-2 text-[11px] text-muted-foreground">
            AI answers, entity search and shortcuts land as modules ship.
          </div>
        </div>
      )}
    </div>
  );
}
