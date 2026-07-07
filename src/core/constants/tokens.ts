/**
 * RetailOS AI — design tokens.
 *
 * Centralized, framework-agnostic tokens consumed by shared UI components.
 * Colors, spacing, radii and shadows are also mirrored as CSS variables in
 * `src/styles.css`; this module exposes them to TypeScript for programmatic
 * use (charts, motion, dynamic classNames).
 *
 * NEVER hardcode these values in components. Import from here or apply the
 * matching Tailwind utility that maps to the same token.
 */

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "3rem",
  "4xl": "4rem",
} as const;

export const radius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  full: "9999px",
} as const;

export const borderWidth = {
  none: "0px",
  hairline: "1px",
  thick: "2px",
} as const;

export const elevation = {
  none: "none",
  xs: "var(--shadow-xs)",
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  elevated: "var(--shadow-elevated)",
} as const;

export const opacity = {
  disabled: 0.5,
  muted: 0.7,
  full: 1,
} as const;

export const duration = {
  instant: 80,
  fast: 160,
  base: 220,
  slow: 320,
  slower: 480,
} as const;

export const easing = {
  standard: [0.4, 0, 0.2, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
  page: "1440px",
} as const;

export const iconSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
} as const;

export const avatarSize = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
  xl: "h-14 w-14 text-lg",
} as const;

export const badgeSize = {
  sm: "text-[10px] px-1.5 py-0.5",
  md: "text-xs px-2 py-0.5",
  lg: "text-sm px-2.5 py-1",
} as const;

export const controlHeight = {
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
  xl: "h-11",
} as const;

export const tableRowHeight = {
  compact: "h-9",
  default: "h-11",
  comfortable: "h-14",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 40,
  sticky: 50,
  overlay: 60,
  modal: 70,
  popover: 80,
  toast: 90,
  tooltip: 100,
} as const;

export const semanticColor = {
  primary: "var(--color-primary)",
  brand: "var(--color-brand)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-destructive)",
  info: "var(--color-brand)",
  surface: "var(--color-surface)",
  background: "var(--color-background)",
  muted: "var(--color-muted)",
  border: "var(--color-border)",
} as const;

export type Duration = keyof typeof duration;
export type IconSize = keyof typeof iconSize;
export type AvatarSize = keyof typeof avatarSize;
export type BadgeSize = keyof typeof badgeSize;
export type ControlHeight = keyof typeof controlHeight;