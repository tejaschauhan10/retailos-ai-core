import { describe, it, expect } from "vitest";
import { roleHasPermission } from "@/config/roles";

describe("roleHasPermission", () => {
  it("owner has org.settings.manage", () => {
    expect(roleHasPermission("owner", "org.settings.manage")).toBe(true);
  });
  it("cashier does not have org.settings.manage", () => {
    expect(roleHasPermission("cashier", "org.settings.manage")).toBe(false);
  });
});
