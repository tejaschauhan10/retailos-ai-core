import type { SearchContext, SearchProvider, SearchResult } from "./types";

export class SearchRegistry {
  private providers = new Map<string, SearchProvider>();

  register(provider: SearchProvider): () => void {
    this.providers.set(provider.id, provider);
    return () => this.providers.delete(provider.id);
  }

  list(): SearchProvider[] {
    return Array.from(this.providers.values()).sort(
      (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
    );
  }

  async search(ctx: SearchContext): Promise<SearchResult[]> {
    const results = await Promise.all(
      this.list().map(async (provider) => {
        try {
          const items = await provider.search(ctx);
          return items.map((r) => ({
            ...r,
            groupLabel: r.groupLabel ?? provider.label,
          }));
        } catch {
          return [];
        }
      }),
    );
    return results.flat().sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }
}

export const searchRegistry = new SearchRegistry();