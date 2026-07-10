import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Boxes, Gauge, RotateCcw, Store, Wand2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ROLE_META } from "@/config/roles";
import {
  MODULE_CATEGORIES,
  MODULE_CATEGORY_META,
  MODULE_REGISTRY,
  getModulesByCategory,
  type WorkspaceModule,
} from "@/config/modules";
import { BUSINESS_TYPE_META, isBusinessType } from "@/core/config/businessTypes";
import { CategorySection } from "@/features/workspace/components/CategorySection";
import { CommandCenter } from "@/features/workspace/components/CommandCenter";
import { FavoritesRow } from "@/features/workspace/components/FavoritesRow";
import { RecentWorkspaces } from "@/features/workspace/components/RecentWorkspaces";
import { WelcomeBanner } from "@/features/workspace/components/WelcomeBanner";
import { useFavorites } from "@/features/workspace/hooks/useFavorites";
import { useRecentWorkspaces } from "@/features/workspace/hooks/useRecentWorkspaces";
import { useWidgetPreferences } from "@/features/workspace/hooks/useWidgetPreferences";
import { WidgetRenderer } from "@/features/workspace/widgets/WidgetRenderer";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { useAuth } from "@/providers/AuthProvider";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Workspace — RetailOS AI" }] }),
  component: RetailWorkspacePage,
});

const CATEGORY_ICON = {
  operations: Store,
  intelligence: Wand2,
  platform: Gauge,
} as const;

function RetailWorkspacePage() {
  const { user } = useAuth();
  const { activeMembership, role } = useActiveOrg();
  const { favorites, isFavorite, toggle } = useFavorites();
  const { recents, push } = useRecentWorkspaces();
  const { visibleWidgets, togglePinned, toggleHidden, isPinned, reset } = useWidgetPreferences();
  const [query, setQuery] = useState("");

  const firstName =
    ((user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "there").split(" ")[0];
  const organizationName = activeMembership?.organization.name ?? "Your workspace";
  const rawBusinessType = activeMembership?.organization.business_category ?? "other";
  const businessTypeLabel = isBusinessType(rawBusinessType)
    ? BUSINESS_TYPE_META[rawBusinessType].label
    : "Retail";
  const roleLabel = role ? ROLE_META[role].label : "Member";

  const handleOpen = useCallback(
    (mod: WorkspaceModule) => {
      if (mod.comingSoon || mod.status !== "live") {
        toast.info(`${mod.title} is coming soon.`, {
          description: "You'll be able to open it here once it ships.",
        });
        return;
      }
      push(mod.id);
    },
    [push],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const matches = useCallback(
    (mod: WorkspaceModule): boolean => {
      if (!normalizedQuery) return true;
      const haystack = [mod.name, mod.description, ...(mod.searchKeywords ?? []), mod.category]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    },
    [normalizedQuery],
  );

  const favoriteModules = useMemo(
    () => MODULE_REGISTRY.filter((m) => favorites.includes(m.id)),
    [favorites],
  );
  const recentModules = useMemo(
    () =>
      recents
        .map((id) => MODULE_REGISTRY.find((m) => m.id === id))
        .filter((m): m is WorkspaceModule => Boolean(m)),
    [recents],
  );

  return (
    <div className="container-page space-y-10 py-8 sm:py-10">
      <WelcomeBanner
        firstName={firstName}
        organizationName={organizationName}
        businessTypeLabel={businessTypeLabel}
        roleLabel={roleLabel}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CommandCenter />
        <p className="text-xs text-muted-foreground">
          {MODULE_REGISTRY.length} modules · {visibleWidgets.length} widgets
        </p>
      </div>

      {/* ── Widget grid ─────────────────────────────────────────── */}
      <section aria-labelledby="widgets-title" className="space-y-4">
        <header className="flex items-end justify-between gap-4">
          <div>
            <h2 id="widgets-title" className="text-base font-semibold tracking-tight text-foreground">
              Your workspace
            </h2>
            <p className="text-xs text-muted-foreground">
              Business health, AI insights and alerts. Pin, hide or reset any card.
            </p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" /> Reset layout
          </Button>
        </header>
        <div className="grid grid-cols-12 gap-3">
          {visibleWidgets.map((widget) => (
            <WidgetRenderer
              key={widget.id}
              widget={widget}
              pinned={isPinned(widget.id)}
              onTogglePin={togglePinned}
              onHide={toggleHidden}
            />
          ))}
        </div>
      </section>

      <FavoritesRow
        modules={favoriteModules.filter(matches)}
        isFavorite={isFavorite}
        onToggleFavorite={toggle}
        onOpen={handleOpen}
      />

      <RecentWorkspaces modules={recentModules.filter(matches)} />

      {/* ── Quick navigation across all modules ─────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-10"
      >
        {MODULE_CATEGORIES.map((categoryId) => {
          const modules = getModulesByCategory(categoryId).filter(matches);
          const Icon = CATEGORY_ICON[categoryId] ?? Boxes;
          return (
            <CategorySection
              key={categoryId}
              category={MODULE_CATEGORY_META[categoryId]}
              icon={Icon}
              modules={modules}
              isFavorite={isFavorite}
              onToggleFavorite={toggle}
              onOpen={handleOpen}
            />
          );
        })}
      </motion.div>

      <footer className="border-t border-border/50 pt-6 text-center text-[11px] text-muted-foreground">
        RetailOS AI · Operating System for Retail · Made in India
      </footer>
    </div>
  );
}
