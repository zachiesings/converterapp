import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-[length:200%_auto] hover:bg-right shadow-glow hover:shadow-glow-lg",
  secondary:
    "text-foreground glass hover:bg-white/90 dark:hover:bg-white/10",
  outline:
    "text-foreground border border-border hover:border-brand-400/60 hover:bg-brand-50/50 dark:hover:bg-white/5",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
  danger: "text-white bg-gradient-to-r from-rose-500 to-red-500 shadow-[0_0_30px_-8px_rgba(244,63,94,0.5)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-13 px-7 text-base rounded-2xl gap-2.5 h-[3.25rem]",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-300",
        "active:scale-[0.97] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
