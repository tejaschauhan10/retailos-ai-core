import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { WorkspaceModule } from "@/config/modules";
import { MODULE_CATEGORY_META } from "@/config/modules";

interface WorkspaceCardProps {
  module: WorkspaceModule;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen?: (module: WorkspaceModule) => void;
  className?: string;
}

const STATUS_LABEL: Record<WorkspaceModule["status"], string> = {
  live: "Live",
  beta: "Beta",
  coming_soon: "Coming soon",
  planned: "Planned",
};

function WorkspaceCardImpl({
  module,
  isFavorite,
  onToggleFavorite,
  onOpen,
  className,
}: WorkspaceCardProps) {
  const Icon = module.icon;
  const disabled = module.comingSoon || module.status !== "live";
  const category = MODULE_CATEGORY_META[module.category];

  const cardBody = (
    <Card
      className={cn(
        "group relative flex h-full flex-col gap-4 border-border/60 bg-card/95 p-4 transition-all",
        "hover:-translate-y-0.5 hover:border-border hover:shadow-lg",
        disabled && "opacity-90",
        className,
      )}
      aria-label={`${module.title} — ${STATUS_LABEL[module.status]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border/50 bg-surface",
              category.accent,
            )}
          >
            <Icon className="h-[1.1rem] w-[1.1rem]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {module.title}
              </h3>
              {module.status !== "live" && (
                <Badge
                  variant="secondary"
                  className="h-4 border-transparent bg-muted/70 px-1.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {STATUS_LABEL[module.status]}
                </Badge>
              )}
            </div>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {module.description}
            </p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(module.id);
                }}
                aria-label={isFavorite ? `Unpin ${module.title}` : `Pin ${module.title}`}
                aria-pressed={isFavorite}
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isFavorite && "text-amber-500 hover:text-amber-500",
                )}
              >
                <Star className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isFavorite ? "Unpin from favorites" : "Pin to favorites"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {category.label}
        </span>
        <div className="flex items-center gap-1.5">
          {module.shortcut && (
            <kbd className="pointer-events-none hidden select-none rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
              {module.shortcut}
            </kbd>
          )}
          <Button
            size="sm"
            variant={disabled ? "ghost" : "outline"}
            disabled={disabled}
            className="h-7 gap-1 rounded-md px-2 text-xs"
            aria-hidden={disabled}
            tabIndex={disabled ? -1 : 0}
          >
            {disabled ? "Locked" : "Open"}
            {!disabled && <ArrowUpRight className="h-3 w-3" />}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="h-full"
    >
      {disabled ? (
        <button
          type="button"
          onClick={() => onOpen?.(module)}
          className="block h-full w-full text-left"
        >
          {cardBody}
        </button>
      ) : (
        <Link
          to={module.route}
          onClick={() => onOpen?.(module)}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          {cardBody}
        </Link>
      )}
    </motion.div>
  );
}

export const WorkspaceCard = memo(WorkspaceCardImpl);
