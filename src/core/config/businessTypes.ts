/**
 * Business Type registry. Organizations pick one on onboarding; future
 * modules adapt their catalog, taxonomy, and reports through this key.
 *
 * NEVER hardcode industry logic in components — read from this registry
 * or from the organization's stored `business_type` column.
 */

export const BUSINESS_TYPES = [
  "fashion",
  "electronics",
  "mobile",
  "grocery",
  "supermarket",
  "beauty",
  "jewellery",
  "hardware",
  "furniture",
  "optical",
  "footwear",
  "gift",
  "toys",
  "sports",
  "kitchenware",
  "home_decor",
  "stationery",
  "pet",
  "other",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export interface BusinessTypeMeta {
  label: string;
  description: string;
}

export const BUSINESS_TYPE_META: Record<BusinessType, BusinessTypeMeta> = {
  fashion: { label: "Fashion & Apparel", description: "Clothing, accessories, boutiques." },
  electronics: { label: "Electronics", description: "Consumer electronics and appliances." },
  mobile: { label: "Mobile Store", description: "Mobile phones and accessories." },
  grocery: { label: "Grocery", description: "Kirana and neighborhood grocery." },
  supermarket: { label: "Supermarket", description: "Multi-department retail supermarket." },
  beauty: { label: "Beauty & Cosmetics", description: "Skincare, makeup and salons." },
  jewellery: { label: "Jewellery", description: "Gold, silver and gems retail." },
  hardware: { label: "Hardware", description: "Tools, paints and construction supplies." },
  furniture: { label: "Furniture", description: "Home and office furniture." },
  optical: { label: "Optical", description: "Eyewear, lenses and optometry." },
  footwear: { label: "Footwear", description: "Shoes and leather goods." },
  gift: { label: "Gift Shop", description: "Gifts, cards and novelties." },
  toys: { label: "Toys", description: "Toys and games retail." },
  sports: { label: "Sports", description: "Sports gear and fitness equipment." },
  kitchenware: { label: "Kitchenware", description: "Cookware and kitchen appliances." },
  home_decor: { label: "Home Decor", description: "Decor, lighting and soft furnishings." },
  stationery: { label: "Stationery", description: "Books, stationery and office supplies." },
  pet: { label: "Pet Store", description: "Pet food, care and accessories." },
  other: { label: "Other", description: "Custom or multi-category retail." },
};

export function isBusinessType(value: string): value is BusinessType {
  return (BUSINESS_TYPES as readonly string[]).includes(value);
}