import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface WorkspaceSearchProps {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

export function WorkspaceSearch({ value, onChange, className }: WorkspaceSearchProps) {
  return (
    <div className={cn("relative w-full max-w-xl", className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        role="searchbox"
        aria-label="Filter workspaces"
        placeholder="Filter workspaces, modules and shortcuts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl border-border/60 bg-surface/60 pl-9 text-sm focus-visible:bg-background"
      />
    </div>
  );
}
