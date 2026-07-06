import { Bell, BellOff, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EmptyState } from "@/components/common/EmptyState";

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  // Placeholder: no real notifications yet. Modules will push here.
  const unread = 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="h-[1.15rem] w-[1.15rem]" />
          {unread > 0 && (
            <span
              aria-hidden
              className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-foreground"
            >
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            System updates and activity across your workspace.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {unread === 0 ? "You're all caught up" : `${unread} unread`}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            disabled={unread === 0}
          >
            <Check className="h-3.5 w-3.5" /> Mark all read
          </Button>
        </div>

        <div className="mt-4">
          <EmptyState
            icon={BellOff}
            title="No notifications yet"
            description="Activity from sales, inventory, orders and your team will show up here as modules come online."
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}