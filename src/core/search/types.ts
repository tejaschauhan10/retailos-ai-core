import type { LucideIcon } from "lucide-react";

export type SearchEntityKind =
  | "module"
  | "page"
  | "customer"
  | "product"
  | "invoice"
  | "order"
  | "inventory"
  | "employee"
  | "meeting"
  | "task"
  | "report"
  | "setting"
  | "document"
  | "ai_conversation"
  | "command";

export interface SearchResult {
  id: string;
  kind: SearchEntityKind;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  route?: string;
  onSelect?: () => void | Promise<void>;
  keywords?: string[];
  score?: number;
  groupLabel?: string;
}

export interface SearchContext {
  query: string;
  orgId?: string;
  userId?: string;
  signal?: AbortSignal;
  limit?: number;
}

export interface SearchProvider {
  id: string;
  kind: SearchEntityKind;
  label: string;
  priority?: number;
  search(ctx: SearchContext): Promise<SearchResult[]> | SearchResult[];
}