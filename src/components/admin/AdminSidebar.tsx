"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingCart, 
  Users, 
  Settings,
  ChefHat,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: UtensilsCrossed, label: "Menu & Inventory", href: "/admin/menu" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Staff & Customers", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[var(--bg-card)] border-r border-[var(--glass-border)] flex flex-col shadow-[var(--shadow-lg)] z-20">
      {/* Brand */}
      <div className="h-24 flex items-center px-8 border-b border-[var(--glass-border)]">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <ChefHat size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)] text-lg leading-tight">
              CraveDrop
            </h1>
            <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">
              Admin Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group",
                isActive 
                  ? "bg-[var(--primary)] text-white shadow-[0_4px_20px_rgba(var(--primary-rgb),0.3)]" 
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--primary)]"
              )}
            >
              <Icon size={20} className={cn(
                "transition-transform",
                isActive ? "text-white" : "text-[var(--text-tertiary)] group-hover:text-[var(--primary)]",
                !isActive && "group-hover:scale-110"
              )} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--glass-border)]">
        <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl text-sm font-semibold text-[var(--danger)] hover:bg-red-500/10 transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
