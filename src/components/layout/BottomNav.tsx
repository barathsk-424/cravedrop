"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, UtensilsCrossed, ShoppingBag, ClipboardList, User, Search } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Food", href: "/menu", icon: UtensilsCrossed },
  { label: "Cart", href: "/cart", icon: ShoppingBag, isCart: true },
  { label: "Account", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide on admin/kitchen/delivery routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/kitchen") || pathname.startsWith("/delivery")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] md:hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-[var(--bg)] border-t border-[var(--border)] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]" />
      
      <div className="relative flex items-center justify-around h-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom))] px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={openCart}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 min-w-[64px] h-full transition-all relative group",
                  "text-[var(--text-tertiary)] hover:text-[var(--primary)]"
                )}
              >
                <div className="relative p-1">
                  <Icon size={22} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                  {mounted && totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[var(--primary)] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md border border-[var(--bg)]"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </div>
                <span className="text-[10px] font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] h-full transition-all relative group",
                isActive ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"
              )}
            >
              <div className="relative p-1">
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 3 : 2} 
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )}
                />
              </div>
              
              <span className={cn(
                "text-[10px] font-bold transition-all duration-300",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
