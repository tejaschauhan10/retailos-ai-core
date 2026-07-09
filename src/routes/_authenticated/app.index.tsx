import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Boxes, Gauge, Store, Wand2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

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
import { FavoritesRow } from "@/features/workspace/components/FavoritesRow";
import { QuickActions } from "@/features/workspace/components/QuickActions";
import { RecentWorkspaces } from "@/features/workspace/components/RecentWorkspaces";
import { WelcomeBanner } from "@/features/workspace/components/WelcomeBanner";
import { WorkspaceSearch } from "@/features/workspace/components/WorkspaceSearch";
import { useFavorites } from "@/features/workspace/hooks/useFavorites";
import { useRecentWorkspaces } from "@/features/workspace/hooks/useRecentWorkspaces";
import { useActiveOrg } from "@/providers/ActiveOrgProvider";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";

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
  const [query, setQuery] = useState("");

  const firstName =
    ((user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "there").split(
      " ",
    )[0];
  const organizationName = activeMembership?.organization.name ?? "Your workspace";
  const rawBusinessType = activeMembership?.organization.business_category ?? "other";
  const businessTypeLabel =
    (isBusinessType(rawBusinessType) ? BUSINESS_TYPE_META[rawBusinessType].label : "Retail");
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
      const haystack = [mod.title, mod.description, ...(mod.keywords ?? []), mod.category]
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

  const totalMatches = useMemo(
    () => MODULE_REGISTRY.filter(matches).length,
    [matches],
  );

  return (
    <div className="container-page space-y-8 py-8 sm:py-10">
      <WelcomeBanner
        firstName={firstName}
        organizationName={organizationName}
        businessTypeLabel={businessTypeLabel}
        roleLabel={roleLabel}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <WorkspaceSearch value={query} onChange={setQuery} />
        <p className="text-xs text-muted-foreground">
          {normalizedQuery
            ? `${totalMatches} of ${MODULE_REGISTRY.length} workspaces match`
            : `${MODULE_REGISTRY.length} workspaces available`}
        </p>
      </div>

      <QuickActions />

      <FavoritesRow
        modules={favoriteModules.filter(matches)}
        isFavorite={isFavorite}
        onToggleFavorite={toggle}
        onOpen={handleOpen}
      />

      <RecentWorkspaces modules={recentModules.filter(matches)} />

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
    </div>
  );
}
