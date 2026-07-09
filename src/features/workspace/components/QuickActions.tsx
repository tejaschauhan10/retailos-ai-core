import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  PlusCircle,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  hint?: string;
}

const ACTIONS: QuickAction[] = [
  { id: "new-customer", label: "New Customer", icon: UserPlus, hint: "CRM" },
  { id: "new-product", label: "New Product", icon: ShoppingBag, hint: "Catalog" },
  { id: "new-sale", label: "New Sale", icon: PlusCircle, hint: "Sales" },
  { id: "open-pos", label: "Open POS", icon: ShoppingCart, hint: "Checkout" },
  { id: "ai-copilot", label: "AI Copilot", icon: Sparkles, hint: "Ask" },
  { id: "reports", label: "Reports", icon: BarChart3, hint: "Insights" },
  { id: "manage-users", label: "Manage Users", icon: Users, hint: "Team" },
];

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title" className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <h2
            id="quick-actions-title"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Quick actions
          </h2>
          <p className="text-xs text-muted-foreground">
            One-tap entry points. Wired up as each module ships.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
        {ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              onClick={() =>
                toast.info(`${action.label} is coming soon.`, {
                  description: "Available once the module lands in your workspace.",
                })
              }
              className="group flex flex-col items-start gap-1.5 rounded-xl border border-dashed border-border/70 bg-surface-muted/30 p-3 text-left transition-colors hover:border-border hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              <span className="text-xs font-medium text-foreground">{action.label}</span>
              {action.hint && (
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {action.hint}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
