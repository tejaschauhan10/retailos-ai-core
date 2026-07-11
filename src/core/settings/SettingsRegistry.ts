import type { SettingsCategoryId, SettingsSection } from "./types";

export const SETTINGS_CATEGORY_META: Record<
  SettingsCategoryId,
  { label: string; description: string; order: number }
> = {
  business: { label: "Business", description: "Organization profile and branches.", order: 0 },
  users: { label: "Users & Roles", description: "Members, invitations and access.", order: 10 },
  invoices: { label: "Invoices", description: "Invoice templates and numbering.", order: 20 },
  taxes: { label: "Taxes", description: "GST, VAT and jurisdictional tax setup.", order: 30 },
  pos: { label: "Point of Sale", description: "Registers, receipts and tender.", order: 40 },
  inventory: { label: "Inventory", description: "Stock policies and warehouses.", order: 50 },
  crm: { label: "CRM", description: "Customer segments and lifecycle stages.", order: 60 },
  marketing: { label: "Marketing", description: "Sender identity and campaign defaults.", order: 70 },
  ai: { label: "AI", description: "Providers, models and copilot behavior.", order: 80 },
  security: { label: "Security", description: "Sessions, MFA and audit exports.", order: 90 },
  notifications: { label: "Notifications", description: "Channels, digests and routing.", order: 100 },
  integrations: { label: "Integrations", description: "Connected apps and API keys.", order: 110 },
  appearance: { label: "Appearance", description: "Theme, branding and layout density.", order: 120 },
  system: { label: "System", description: "Diagnostics, data and advanced controls.", order: 130 },
};

class SettingsRegistry {
  private sections = new Map<string, SettingsSection>();

  register(section: SettingsSection): () => void {
    this.sections.set(section.id, section);
    return () => this.sections.delete(section.id);
  }

  list(): SettingsSection[] {
    return Array.from(this.sections.values()).sort(
      (a, b) => a.order - b.order || a.title.localeCompare(b.title),
    );
  }

  byCategory(category: SettingsCategoryId): SettingsSection[] {
    return this.list().filter((s) => s.category === category);
  }
}

export const settingsRegistry = new SettingsRegistry();