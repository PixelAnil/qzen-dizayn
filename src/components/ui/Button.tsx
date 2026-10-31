import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

// One shape for the whole site: a full pill. Gold is a translucent tint with a fine gold edge,
// so it glows softly on black instead of shouting as a solid block.
// "cursor-snap" lets the custom cursor take the button's shape on hover
const base =
  "cursor-snap inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-7 text-body font-medium transition-[background-color,border-color,color,transform] duration-300 ease-luxe active:scale-[0.98]"; // taste-skill-ignore: the edge defines a translucent button

const variants: Record<Variant, string> = {
  primary: "border-gold/45 bg-gold/15 text-gold-light hover:border-gold/70 hover:bg-gold/25 hover:text-ivory",
  secondary: "border-ivory/15 bg-ivory/[0.04] text-ivory hover:border-gold/45 hover:bg-gold/10 hover:text-gold-light",
};

export const buttonClass = (variant: Variant = "primary", className = "") =>
  `${base} ${variants[variant]} ${className}`;

type ButtonProps = ComponentProps<typeof Link> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** Round icon button (social links), same translucent gold. */
export const iconButtonClass =
  "cursor-snap inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light transition-[background-color,border-color,transform] duration-300 hover:border-gold/60 hover:bg-gold/20 active:scale-95"; // taste-skill-ignore
