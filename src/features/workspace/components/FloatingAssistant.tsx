import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Global floating AI assistant. Architecture only — the AI provider
 * (Lovable AI Gateway) plugs in through `src/ai/providers/registry.ts`
 * when the Copilot module ships.
 */
export function FloatingAssistant({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-auto w-[min(360px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-border/60 bg-popover shadow-2xl"
            role="dialog"
            aria-label="AI Assistant"
          >
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-violet-500/10 text-violet-500">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">RetailOS Copilot</p>
                  <p className="text-[11px] text-muted-foreground">Ask, plan, or generate.</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 px-4 py-4">
              <p className="text-sm text-foreground">
                The AI Copilot arrives with the Intelligence sprint. It will read across your
                store to answer questions, draft actions, and surface opportunities.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Summarise today's sales and cash position</li>
                <li>• Draft WhatsApp reminders for pending invoices</li>
                <li>• Flag slow-moving inventory</li>
                <li>• Generate custom reports on demand</li>
              </ul>
              <div className="rounded-xl border border-dashed border-border/60 bg-surface-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
                Placeholder — no AI is invoked yet.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open AI assistant"
        className="pointer-events-auto h-12 gap-2 rounded-full bg-gradient-to-tr from-violet-500 to-brand px-4 text-sm text-white shadow-xl hover:brightness-110"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">Ask RetailOS</span>
      </Button>
    </div>
  );
}
