import { Search, X } from "lucide-react";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface SearchBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  function SearchBox({ className, onClear, value, ...props }, ref) {
    const showClear = onClear && typeof value === "string" && value.length > 0;
    return (
      <div className={cn("relative", className)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          value={value}
          className="pl-9 pr-9"
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  },
);