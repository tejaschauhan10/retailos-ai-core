import { describe, it, expect } from "vitest";
import { isFeatureEnabled, FEATURE_FLAG_KEYS } from "@/core/config/featureFlags";

describe("feature flags", () => {
  it("business modules default to disabled", () => {
    for (const key of FEATURE_FLAG_KEYS) {
      expect(isFeatureEnabled(key)).toBe(false);
    }
  });
});
