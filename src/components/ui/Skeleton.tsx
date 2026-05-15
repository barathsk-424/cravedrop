import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
}

export function Skeleton({ className, variant = "rectangular" }: SkeletonProps) {
  const base = "animate-shimmer rounded-[var(--radius-md)]";

  const variants: Record<string, string> = {
    text: "h-4 w-full rounded-md",
    circular: "rounded-full",
    rectangular: "w-full",
    card: "w-full h-48 rounded-[var(--radius-lg)]",
  };

  return <div className={cn(base, variants[variant], className)} />;
}

/** Pre-built skeleton for a food card */
export function FoodCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-card)] shadow-[var(--shadow-sm)] border border-[var(--border-light)]">
      <Skeleton className="h-40 rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton variant="text" className="w-3/4 h-4" />
        <Skeleton variant="text" className="w-1/2 h-3" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton variant="text" className="w-16 h-5" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** Pre-built skeleton for category strip */
export function CategorySkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
          <Skeleton variant="circular" className="w-16 h-16" />
          <Skeleton variant="text" className="w-14 h-3" />
        </div>
      ))}
    </div>
  );
}
