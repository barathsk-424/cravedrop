"use client";

import { motion } from "framer-motion";
import {
  User, MapPin, ShoppingBag, Heart, CreditCard, Bell, Moon,
  ChevronRight, LogOut, HelpCircle, Shield, Star, Gift,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { useProfile, useOrders } from "@/hooks/useSupabase";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const menuSections = [
  {
    title: "My Account",
    items: [
      { icon: ShoppingBag, label: "My Orders", href: "/orders", badge: "2" },
      { icon: MapPin, label: "Saved Addresses", href: "/profile/addresses" },
      { icon: Heart, label: "Favourites", href: "/profile/favourites" },
      { icon: CreditCard, label: "Payment Methods", href: "/profile/payments" },
    ],
  },
  {
    title: "Rewards",
    items: [
      { icon: Star, label: "Loyalty Points", href: "/profile/loyalty", badge: "250 pts" },
      { icon: Gift, label: "Referral Rewards", href: "/profile/referrals" },
    ],
  },
  {
    title: "Settings",
    items: [
      { icon: Bell, label: "Notifications", href: "/profile/notifications" },
      { icon: Shield, label: "Privacy & Security", href: "/profile/privacy" },
      { icon: HelpCircle, label: "Help & Support", href: "/profile/support" },
    ],
  },
];

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const { data: profile, isLoading: isProfileLoading } = useProfile() as any;
  const { data: orders } = useOrders() as any;
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      queryClient.setQueryData(["profile"], null);
      toast.success("Successfully signed out");
      router.push("/");
      router.refresh();
    }
  };

  if (isProfileLoading) {
    return (
      <div className="container-app py-32 flex flex-col items-center gap-6">
        <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
        <p className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em]">Initializing Lounge...</p>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      {/* Profile Header — Premium VIP Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group mb-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)] to-[#111] rounded-[2.5rem] shadow-[var(--shadow-xl)] overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)] rounded-full blur-[100px] opacity-20 group-hover:scale-125 transition-transform duration-700" />
        </div>

        <div className="relative p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                {profile?.avatar_url ? (
                   <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                   <User size={40} className="text-[var(--accent)]" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--secondary)] flex items-center justify-center shadow-lg">
                <Star size={14} fill="currentColor" />
              </div>
            </div>
            
            <div className="text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-2">
                {profile?.subscription_tier || "Exclusive Member"}
              </p>
              <h1 className="text-3xl font-black font-[family-name:var(--font-poppins)] tracking-tight">
                {profile?.full_name || "Guest Explorer"}
              </h1>
              <p className="text-sm font-bold text-white/50 uppercase tracking-widest mt-1">
                Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : "Recently"}
              </p>
            </div>
          </div>

          {!profile ? (
            <Link
              href="/auth/login"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--accent)] text-[var(--secondary)] text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Authenticate Now
              <ChevronRight size={18} strokeWidth={3} />
            </Link>
          ) : (
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                  VIP ID: #{profile.id.slice(0, 8)}
               </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Experience Stats Row */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { label: "Journey", value: orders?.length || 0, unit: "Orders", color: "var(--primary)" },
          { label: "Prestige", value: profile?.points || 0, unit: "Points", color: "var(--accent)" },
          { label: "Vault", value: "₹0", unit: "Balance", color: "var(--success)" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-[var(--bg-card)] rounded-[2rem] p-6 text-center shadow-[var(--shadow-md)] border border-transparent hover:border-[var(--primary)]/20 transition-all cursor-default"
          >
            <p className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-[var(--text-primary)] tracking-tighter group-hover:scale-110 transition-transform">
              {stat.value}
            </p>
            <p className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest mt-1">{stat.unit}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Experience Menu */}
      <div className="space-y-10">
        {/* Settings — Preference Panel */}
        <div className="bg-[var(--bg-elevated)] rounded-[2.5rem] p-8 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <Moon size={22} className="text-[var(--secondary)]" />
              </div>
              <div>
                <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">Atmosphere</p>
                <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest">Toggle Night Mode</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={cn(
                "w-14 h-8 rounded-full transition-all relative cursor-pointer shadow-inner",
                theme === "dark" ? "bg-[var(--primary)]" : "bg-[var(--secondary)]/10"
              )}
            >
              <motion.span
                animate={{ x: theme === "dark" ? 24 : 4 }}
                className="absolute top-1 left-0 w-6 h-6 rounded-full bg-white shadow-xl flex items-center justify-center"
              >
                <div className={cn("w-1 h-1 rounded-full", theme === "dark" ? "bg-[var(--primary)]" : "bg-[var(--secondary)]/20")} />
              </motion.span>
            </button>
          </div>
        </div>

        {/* Dynamic Sections */}
        {menuSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + si * 0.1 }}
          >
            <h3 className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-[0.3em] mb-4 pl-4">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-4 p-5 rounded-3xl bg-[var(--bg-card)] hover:bg-[var(--secondary)] transition-all duration-300 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <item.icon size={22} className="text-[var(--text-secondary)] group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-[var(--text-primary)] group-hover:text-white uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-[10px] font-bold text-[var(--text-tertiary)] group-hover:text-white/50 uppercase tracking-widest mt-0.5">
                      View Details
                    </p>
                  </div>
                  {item.badge ? (
                    <span className="px-3 py-1 rounded-xl bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-tighter">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight size={18} className="text-[var(--text-tertiary)] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Sign Out Action */}
        {profile && (
          <button 
            onClick={handleSignOut}
            className="group w-full flex items-center justify-center gap-4 py-6 rounded-[2rem] border-2 border-dashed border-[var(--danger)]/30 text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white hover:border-transparent transition-all duration-300 font-black uppercase tracking-[0.3em] text-xs cursor-pointer shadow-sm hover:shadow-2xl"
          >
            <LogOut size={20} className="group-hover:-translate-x-2 transition-transform" />
            Terminate Session
          </button>
        )}

        {/* Branding Footer */}
        <div className="text-center pt-10 pb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--glass-border)]">
            <p className="text-[9px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em]">
              CraveDrop Digital Lounge v1.0.4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
