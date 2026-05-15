"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-white hover:brightness-110 active:scale-[0.97] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
  secondary:
    "bg-[#111111] text-white border border-white/10 hover:bg-[#1A1A1A] active:scale-[0.97]",
  outline:
    "border-2 border-[var(--gold)] text-[var(--gold)] bg-transparent hover:bg-[var(--gold)]/10",
  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:bg-white/5 hover:text-white",
  danger:
    "bg-[var(--danger)] text-white hover:brightness-110 active:scale-[0.97]",
  accent:
    "bg-[var(--gold)] text-black font-black hover:brightness-110 active:scale-[0.97] shadow-[var(--shadow-gold)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-[10px] uppercase tracking-[0.1em] rounded-lg gap-1.5",
  md: "h-12 px-6 text-xs uppercase tracking-[0.1em] rounded-[var(--radius-md)] gap-2",
  lg: "h-14 px-8 text-sm uppercase tracking-[0.2em] rounded-[var(--radius-lg)] gap-3",
  icon: "h-12 w-12 rounded-[var(--radius-md)] flex items-center justify-center p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {size !== "icon" && children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
