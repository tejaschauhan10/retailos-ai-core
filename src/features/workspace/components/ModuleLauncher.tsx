import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, LayoutGrid, Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MODULE_CATEGORIES,
  MODULE_CATEGORY_META,
  MODULE_REGISTRY,
  getModuleById,
  searchModules,
} from "@/config/modules";
import type { WorkspaceModule } from "@/config/modules";
import { useFavorites } from "@/features/workspace/hooks/useFavorites";
import { useRecentWorkspaces } from "@/features/workspace/hooks/useRecentWorkspaces";
import { usePermission } from "@/features/rbac/hooks/usePermission";
import { cn } from "@/lib/utils";

interface ModuleLauncherProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Professional Module Launcher — reachable from the sidebar and via CTRL+K.
 * Renders 100% from the module registry (no hardcoded lists).
 */
export function ModuleLauncher({ open, onOpenChange }: ModuleLauncherProps) {
  const [query, setQuery] = useState("");
  const { favorites, isFavorite, toggle } = useFavorites();
  const { recents } = useRecentWorkspaces();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filtered = useMemo(() => searchModules(query), [query]);
  const favoriteModules = favorites
    .map((id) => getModuleById(id))
    .filter((m): m is WorkspaceModule => Boolean(m));
  const recentModules = recents
    .map((id) => getModuleById(id))
    .filter((m): m is WorkspaceModule => Boolean(m));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border/60 px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <LayoutGrid className="h-4 w-4 text-brand" />
            Module Launcher
          </DialogTitle>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, categories, actions…"
              className="h-10 pl-9"
            />
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-5">
            {query.length === 0 && favoriteModules.length > 0 && (
              <Section title="Favorites" icon={<Star className="h-3.5 w-3.5 text-amber-500" />}>
                <ModuleGrid
                  modules={favoriteModules}
                  onOpen={() => onOpenChange(false)}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggle}
                />
              </Section>
            )}

            {query.length === 0 && recentModules.length > 0 && (
              <Section title="Recent" icon={<Clock className="h-3.5 w-3.5 text-muted-foreground" />}>
                <ModuleGrid
                  modules={recentModules.slice(0, 6)}
                  onOpen={() => onOpenChange(false)}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggle}
                />
              </Section>
            )}

            {query.length === 0 ? (
              MODULE_CATEGORIES.map((catId) => {
                const meta = MODULE_CATEGORY_META[catId];
                const modules = filtered.filter((m) => m.category === catId);
                if (modules.length === 0) return null;
                return (
                  <Section key={catId} title={meta.label} description={meta.description}>
                    <ModuleGrid
                      modules={modules}
                      onOpen={() => onOpenChange(false)}
                      isFavorite={isFavorite}
                      onToggleFavorite={toggle}
                    />
                  </Section>
                );
              })
            ) : (
              <Section title={`${filtered.length} results`}>
                {filtered.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-border/60 px-4 py-6 text-center text-xs text-muted-foreground">
                    No modules match “{query}”.
                  </p>
                ) : (
                  <ModuleGrid
                    modules={filtered}
                    onOpen={() => onOpenChange(false)}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggle}
                  />
                )}
              </Section>
            )}

            {MODULE_REGISTRY.length === 0 && (
              <p className="text-xs text-muted-foreground">No modules registered.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </h4>
        {description && (
          <span className="text-[11px] text-muted-foreground/80">— {description}</span>
        )}
      </header>
      {children}
    </section>
  );
}

function ModuleGrid({
  modules,
  onOpen,
  isFavorite,
  onToggleFavorite,
}: {
  modules: WorkspaceModule[];
  onOpen: () => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <AnimatePresence initial={false}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <LauncherCard
            key={m.id}
            module={m}
            onOpen={onOpen}
            favorite={isFavorite(m.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}

function LauncherCard({
  module,
  onOpen,
  favorite,
  onToggleFavorite,
}: {
  module: WorkspaceModule;
  onOpen: () => void;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const perm = module.permissions?.[0];
  const allowed = usePermission(perm ?? "dashboard.view");
  if (perm && !allowed) return null;

  const Icon = module.icon;
  const disabled = module.comingSoon || module.status !== "live";
  const meta = MODULE_CATEGORY_META[module.category];

  const body = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "group relative flex h-full items-start gap-3 rounded-xl border border-border/60 bg-card/95 p-3 transition-all",
        "hover:-translate-y-0.5 hover:border-border hover:shadow-md",
        disabled && "opacity-90",
      )}
    >
      <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/50 bg-surface", meta.accent)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium text-foreground">{module.name}</span>
          {module.badge && (
            <Badge variant="secondary" className="h-4 px-1.5 text-[9px] uppercase tracking-wider">
              {module.badge}
            </Badge>
          )}
          {module.status !== "live" && (
            <Badge variant="secondary" className="h-4 border-transparent bg-muted/70 px-1.5 text-[9px] uppercase tracking-wider text-muted-foreground">
              {module.status === "beta" ? "Beta" : module.status === "coming_soon" ? "Soon" : "Planned"}
            </Badge>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{module.description}</p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite(module.id);
        }}
        aria-label={favorite ? `Unpin ${module.name}` : `Pin ${module.name}`}
        className={cn(
          "grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground",
          favorite && "text-amber-500 hover:text-amber-500",
        )}
      >
        <Star className={cn("h-3.5 w-3.5", favorite && "fill-current")} />
      </button>
    </motion.div>
  );

  if (disabled) {
    return (
      <button type="button" onClick={onOpen} className="block h-full w-full text-left" disabled>
        {body}
      </button>
    );
  }

  return (
    <Link to={module.route} onClick={onOpen} className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {body}
    </Link>
  );
}