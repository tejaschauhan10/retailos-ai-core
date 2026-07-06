import type { AppRole } from "@/config/roles";

export interface Organization {
  id: string;
  name: string;
  store_name: string;
  gst_number: string | null;
  phone: string | null;
  timezone: string;
  currency: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMembership {
  id: string;
  organization_id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
  organization: Organization;
}