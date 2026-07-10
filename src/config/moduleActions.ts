import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  Barcode,
  Bell,
  FileText,
  Import,
  Package,
  Receipt,
  ScrollText,
  StickyNote,
  Upload,
  UserPlus,
  Wallet,
  Warehouse,
  PlusCircle,
} from "lucide-react";

/**
 * Module Action Registry.
 * Each module owns its operational actions. The Workspace never renders
 * module-specific buttons — it renders this registry via generic components.
 */

export interface ModuleAction {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  /** Deep link the action opens. Modules wire real routes as they ship. */
  route?: string;
  /** Optional keyboard shortcut hint. */
  shortcut?: string;
  primary?: boolean;
  comingSoon?: boolean;
}

/** Keyed by module id. */
export const MODULE_ACTIONS: Record<string, ModuleAction[]> = {
  billing: [
    { id: "new-invoice", label: "New Invoice", icon: Receipt, route: "/app/billing/new", primary: true, comingSoon: true },
    { id: "estimate", label: "New Estimate", icon: FileText, comingSoon: true },
    { id: "credit-note", label: "Credit Note", icon: ScrollText, comingSoon: true },
    { id: "payment", label: "Record Payment", icon: Wallet, comingSoon: true },
  ],
  customers: [
    { id: "new-customer", label: "New Customer", icon: UserPlus, primary: true, comingSoon: true },
    { id: "reminder", label: "Send Reminder", icon: Bell, comingSoon: true },
    { id: "note", label: "Customer Note", icon: StickyNote, comingSoon: true },
  ],
  inventory: [
    { id: "add-stock", label: "Add Stock", icon: Package, primary: true, comingSoon: true },
    { id: "transfer-stock", label: "Transfer Stock", icon: ArrowLeftRight, comingSoon: true },
    { id: "adjust-stock", label: "Adjust Stock", icon: Warehouse, comingSoon: true },
  ],
  products: [
    { id: "new-product", label: "New Product", icon: PlusCircle, primary: true, comingSoon: true },
    { id: "barcode", label: "Print Barcode", icon: Barcode, comingSoon: true },
    { id: "import", label: "Import Products", icon: Import, comingSoon: true },
  ],
  suppliers: [
    { id: "new-supplier", label: "New Supplier", icon: UserPlus, primary: true, comingSoon: true },
    { id: "import-suppliers", label: "Import", icon: Upload, comingSoon: true },
  ],
};

export function getModuleActions(moduleId: string): ModuleAction[] {
  return MODULE_ACTIONS[moduleId] ?? [];
}
