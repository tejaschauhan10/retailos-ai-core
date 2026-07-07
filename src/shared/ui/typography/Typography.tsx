import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      display:
        "font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]",
      h1: "font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight",
      h2: "font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-tight",
      h3: "text-xl sm:text-2xl font-semibold tracking-tight",
      h4: "text-lg font-semibold tracking-tight",
      bodyLg: "text-base leading-relaxed",
      body: "text-sm leading-relaxed",
      bodySm: "text-xs leading-relaxed",
      caption: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
      label: "text-sm font-medium",
      mono: "font-mono text-xs",
    },
    tone: {
      default: "",
      muted: "text-muted-foreground",
      brand: "text-brand",
      danger: "text-destructive",
      success: "text-success",
      warning: "text-warning",
    },
  },
  defaultVariants: { variant: "body", tone: "default" },
});

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>;

const defaultTag: Record<TextVariant, keyof HTMLElementTagNameMap> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  bodyLg: "p",
  body: "p",
  bodySm: "p",
  caption: "span",
  label: "span",
  mono: "code",
};

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: keyof HTMLElementTagNameMap;
  asChild?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { className, variant, tone, as, asChild, ...props },
  ref,
) {
  const Comp = asChild
    ? Slot
    : ((as ?? defaultTag[(variant ?? "body") as TextVariant]) as "p");
  return (
    <Comp
      ref={ref as never}
      className={cn(textVariants({ variant, tone }), className)}
      {...props}
    />
  );
});

export const Display = (p: Omit<TextProps, "variant">) => <Text variant="display" {...p} />;
export const H1 = (p: Omit<TextProps, "variant">) => <Text variant="h1" {...p} />;
export const H2 = (p: Omit<TextProps, "variant">) => <Text variant="h2" {...p} />;
export const H3 = (p: Omit<TextProps, "variant">) => <Text variant="h3" {...p} />;
export const H4 = (p: Omit<TextProps, "variant">) => <Text variant="h4" {...p} />;
export const Body = (p: Omit<TextProps, "variant">) => <Text variant="body" {...p} />;
export const BodyLg = (p: Omit<TextProps, "variant">) => <Text variant="bodyLg" {...p} />;
export const BodySm = (p: Omit<TextProps, "variant">) => <Text variant="bodySm" {...p} />;
export const Caption = (p: Omit<TextProps, "variant">) => <Text variant="caption" {...p} />;
export const Label = (p: Omit<TextProps, "variant">) => <Text variant="label" {...p} />;
export const Mono = (p: Omit<TextProps, "variant">) => <Text variant="mono" {...p} />;

export { textVariants };