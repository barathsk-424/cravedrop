import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "success" | "danger" | "warning" | "accent" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  primary: "bg-[var(--primary-50)] text-[var(--primary)]",
  success: "bg-[var(--success-light)] text-[var(--success)]",
  danger: "bg-[var(--danger-light)] text-[var(--danger)]",
  warning: "bg-[var(--warning-light)] text-[var(--warning)]",
  accent: "bg-[var(--accent)]/20 text-[var(--accent-dark)]",
  outline: "bg-transparent border border-[var(--text-tertiary)] text-[var(--text-secondary)]",
};

export function Badge({ children, variant = "default", className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      )}
      {children}
    </span>
  );
}
