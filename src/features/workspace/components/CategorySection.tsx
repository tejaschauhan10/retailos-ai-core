import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import type { ModuleCategoryMeta, WorkspaceModule } from "@/config/modules";
import { cn } from "@/lib/utils";

import { WorkspaceCard } from "./WorkspaceCard";

interface CategorySectionProps {
  category: ModuleCategoryMeta;
  icon: LucideIcon;
  modules: WorkspaceModule[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (module: WorkspaceModule) => void;
}

export function CategorySection({
  category,
  icon: Icon,
  modules,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: CategorySectionProps) {
  if (modules.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-4"
      aria-labelledby={`category-${category.id}`}
    >
      <header className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-surface",
              category.accent,
            )}
            aria-hidden
          >
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </div>
          <div>
            <h2
              id={`category-${category.id}`}
              className="text-base font-semibold tracking-tight text-foreground"
            >
              {category.label}
            </h2>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {modules.length} {modules.length === 1 ? "module" : "modules"}
        </span>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((mod) => (
          <WorkspaceCard
            key={mod.id}
            module={mod}
            isFavorite={isFavorite(mod.id)}
            onToggleFavorite={onToggleFavorite}
            onOpen={onOpen}
          />
        ))}
      </div>
    </motion.section>
  );
}
