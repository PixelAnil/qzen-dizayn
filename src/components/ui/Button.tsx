import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] transition-all duration-500 ease-luxe";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-gradient text-obsidian hover:brightness-115 hover:shadow-[0_0_32px_-4px_rgba(197,160,89,0.55)]",
  secondary:
    "border border-gold bg-transparent text-gold hover:bg-[rgba(197,160,89,0.1)]",
};

type ButtonProps = ComponentProps<typeof Link> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
