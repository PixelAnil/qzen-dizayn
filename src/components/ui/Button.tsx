import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

// One shape for the whole site: square corners, flat fill.
const base =
  "inline-flex min-h-13 items-center justify-center px-7 text-body font-medium transition-[background-color,color,transform] duration-300 ease-luxe active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-obsidian hover:bg-gold-light",
  secondary: "bg-graphite-soft text-gold hover:bg-[rgba(197,160,89,0.1)] hover:text-gold-light",
};

type ButtonProps = ComponentProps<typeof Link> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
