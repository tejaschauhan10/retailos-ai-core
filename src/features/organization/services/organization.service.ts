import { supabase } from "@/integrations/supabase/client";

import type { CreateOrganizationInput } from "../schemas";
import type { Organization, OrganizationMembership } from "../types";

export const organizationService = {
  async listMyMemberships(userId: string): Promise<OrganizationMembership[]> {
    const { data, error } = await supabase
      .from("organization_members")
      .select(
        "id, organization_id, user_id, role, created_at, organization:organizations(*)",
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as unknown as OrganizationMembership[];
  },

  async createOrganization(
    userId: string,
    input: CreateOrganizationInput,
  ): Promise<Organization> {
    const payload = {
      name: input.name,
      store_name: input.store_name,
      gst_number: input.gst_number?.trim() ? input.gst_number.trim() : null,
      phone: input.phone.trim(),
      business_category: input.business_category,
      country: input.country,
      state: input.state,
      city: input.city,
      timezone: input.timezone,
      currency: input.currency,
      owner_id: userId,
    };

    const { data: org, error } = await supabase
      .from("organizations")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(`Organization insert failed: ${error.message}`);
    if (!org) throw new Error("Organization was created but could not be read back.");

    const { error: memberError } = await supabase
      .from("organization_members")
      .insert({
        organization_id: org.id,
        user_id: userId,
        role: "owner",
      });
    if (memberError) throw new Error(`Membership creation failed: ${memberError.message}`);

    return org as Organization;
  },
};