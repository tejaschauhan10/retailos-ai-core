import { Star } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import type { WorkspaceModule } from "@/config/modules";

import { WorkspaceCard } from "./WorkspaceCard";

interface FavoritesRowProps {
  modules: WorkspaceModule[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (module: WorkspaceModule) => void;
}

export function FavoritesRow({
  modules,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: FavoritesRowProps) {
  return (
    <section aria-labelledby="favorites-title" className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="favorites-title" className="text-base font-semibold tracking-tight text-foreground">
            Pinned workspaces
          </h2>
          <p className="text-xs text-muted-foreground">
            Pin the modules you use most. They travel with your active organization.
          </p>
        </div>
      </div>
      {modules.length === 0 ? (
        <EmptyState
          icon={Star}
          title="Nothing pinned yet"
          description="Hover any workspace card and tap the star to pin it here."
        />
      ) : (
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
      )}
    </section>
  );
}
