import { clsx, type ClassValue } from "clsx";

/** Merge class names (handles conditionals) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format price in INR */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format price with decimals */
export function formatPriceDecimal(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Generate a slug from text */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate text with ellipsis */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "…";
}

/** Format relative time (e.g., "2 min ago") */
export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return past.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/** Generate random OTP */
export function generateOTP(length = 4): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

/** Delay utility */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Calculate GST (5% for restaurant) */
export function calculateGST(subtotal: number): { cgst: number; sgst: number; total: number } {
  const rate = 0.05;
  const gst = subtotal * rate;
  return {
    cgst: gst / 2,
    sgst: gst / 2,
    total: gst,
  };
}
