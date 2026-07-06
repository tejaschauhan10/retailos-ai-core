import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Business name is required")
    .max(120, "Business name is too long"),
  store_name: z
    .string()
    .trim()
    .min(2, "Store name is required")
    .max(120, "Store name is too long"),
  gst_number: z
    .string()
    .trim()
    .max(20, "GST number is too long")
    .optional()
    .or(z.literal("")),
  business_category: z
    .string()
    .trim()
    .min(1, "Select a business category")
    .max(60),
  phone: z
    .string()
    .trim()
    .min(6, "Phone is required")
    .max(20, "Phone is too long"),
  country: z.string().trim().min(2, "Country is required").max(2),
  state: z
    .string()
    .trim()
    .min(2, "State is required")
    .max(80, "State is too long"),
  city: z
    .string()
    .trim()
    .min(2, "City is required")
    .max(80, "City is too long"),
  timezone: z.string().min(1, "Timezone is required"),
  currency: z.string().min(1, "Currency is required"),
});
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;