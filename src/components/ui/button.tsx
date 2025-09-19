import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "cursor-pointer text-sm flex items-center gap-1.5 justify-center px-2.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md h-9",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground primary-btn",
        secondary:
          "bg-[rgba(255,255,255,0.04)] text-secondary-foreground secondary-btn hover:bg-white/[0.08] focus:drop-shadow-[0_1px_2px_0_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.08),0_0_0_2px_rgb(255,255,255),0_0_0_4px_rgba(59,130,246,0.6)]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
