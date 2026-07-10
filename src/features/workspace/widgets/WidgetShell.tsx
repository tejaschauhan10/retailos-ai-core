import { motion } from "framer-motion";
import { EyeOff, MoreHorizontal, Pin, PinOff } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { WorkspaceWidget } from "@/config/widgets";
import { PLAN_META } from "@/config/plans";
import { cn } from "@/lib/utils";

interface WidgetShellProps {
  widget: WorkspaceWidget;
  pinned: boolean;
  onTogglePin: (id: string) => void;
  onHide: (id: string) => void;
  children: ReactNode;
  className?: string;
}

const SIZE_CLASSES: Record<WorkspaceWidget["size"], string> = {
  sm: "col-span-12 sm:col-span-6 lg:col-span-3",
  md: "col-span-12 sm:col-span-6 lg:col-span-4",
  lg: "col-span-12 lg:col-span-6",
  xl: "col-span-12",
};

export function WidgetShell({ widget, pinned, onTogglePin, onHide, children, className }: WidgetShellProps) {
  const Icon = widget.icon;
  const plan = widget.requiredPlan ? PLAN_META[widget.requiredPlan] : null;

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(SIZE_CLASSES[widget.size], className)}
      aria-labelledby={`widget-${widget.id}-title`}
    >
      <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/95 p-4 transition-colors hover:border-border">
        <header className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-2.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border/60 bg-surface text-muted-foreground">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3
                  id={`widget-${widget.id}-title`}
                  className="truncate text-sm font-semibold text-foreground"
                >
                  {widget.title}
                </h3>
                {widget.comingSoon && (
                  <Badge variant="secondary" className="h-4 border-transparent bg-muted/70 px-1.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                    Soon
                  </Badge>
                )}
                {plan && plan.id !== "starter" && (
                  <Badge variant="outline" className={cn("h-4 border-border/60 px-1.5 text-[9px] font-medium uppercase tracking-wider", plan.color)}>
                    {plan.label}
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{widget.description}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`${widget.title} options`}>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onSelect={() => onTogglePin(widget.id)}>
                {pinned ? <PinOff className="mr-2 h-4 w-4" /> : <Pin className="mr-2 h-4 w-4" />}
                {pinned ? "Unpin widget" : "Pin widget"}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onHide(widget.id)}>
                <EyeOff className="mr-2 h-4 w-4" />
                Hide widget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="mt-4 flex-1">{children}</div>
      </div>
    </motion.section>
  );
}
