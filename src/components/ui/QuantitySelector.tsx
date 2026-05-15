"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 0,
  max = 99,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const iconSize = size === "sm" ? 14 : 16;
  const btnSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const textSize = size === "sm" ? "text-sm w-6" : "text-base w-8";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl overflow-hidden border border-[var(--primary)]/30 bg-[var(--bg-card)]",
        className
      )}
    >
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          btnSize,
          "flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary-50)] transition-colors cursor-pointer",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} />
      </button>
      <span
        className={cn(
          textSize,
          "text-center font-semibold text-[var(--text-primary)] select-none"
        )}
      >
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          btnSize,
          "flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary-50)] transition-colors cursor-pointer",
          "disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
