"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-transparent",
              "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
              "transition-all duration-200",
              "focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
              "hover:border-[var(--text-tertiary)]/30",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-[var(--danger)] mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
