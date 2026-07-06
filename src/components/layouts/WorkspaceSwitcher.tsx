import { Check, ChevronsUpDown, Plus, Store } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { toast } from "sonner";

export function WorkspaceSwitcher({ collapsed = false }: { collapsed?: boolean }) {
  const { memberships, activeMembership, setActiveOrgId, activeOrgId } =
    useActiveOrg();
  const [open, setOpen] = useState(false);

  const label = activeMembership?.organization.name ?? "Select workspace";
  const sub = activeMembership?.organization.store_name ?? "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          aria-label="Switch workspace"
          className={cn(
            "h-10 justify-between gap-2 rounded-lg border border-border/60 bg-surface px-2.5 text-left hover:bg-muted/60",
            collapsed ? "w-10 px-0 justify-center" : "w-full",
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground text-[11px] font-semibold">
              {label.slice(0, 1).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {label}
                </p>
                {sub && (
                  <p className="truncate text-[11px] text-muted-foreground">
                    {sub}
                  </p>
                )}
              </div>
            )}
          </div>
          {!collapsed && (
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-60" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[280px] p-0"
        side={collapsed ? "right" : "bottom"}
      >
        <Command>
          <CommandInput placeholder="Search workspaces..." className="h-9" />
          <CommandList>
            <CommandEmpty>No workspaces found.</CommandEmpty>
            <CommandGroup heading="Your workspaces">
              {memberships.map((m) => {
                const active = m.organization_id === activeOrgId;
                return (
                  <CommandItem
                    key={m.organization_id}
                    value={m.organization.name}
                    onSelect={() => {
                      setActiveOrgId(m.organization_id);
                      setOpen(false);
                    }}
                    className="gap-2"
                  >
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{m.organization.name}</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {m.organization.store_name}
                      </p>
                    </div>
                    {active && <Check className="h-4 w-4 text-brand" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  toast.info("Multi-workspace creation is coming soon.");
                }}
                className="gap-2 text-muted-foreground"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Create workspace</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider">
                  Soon
                </span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}