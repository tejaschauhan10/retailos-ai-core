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
  phone: z
    .string()
    .trim()
    .max(20, "Phone is too long")
    .optional()
    .or(z.literal("")),
  timezone: z.string().min(1, "Timezone is required"),
  currency: z.string().min(1, "Currency is required"),
});
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;