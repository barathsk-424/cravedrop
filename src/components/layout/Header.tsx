"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, MapPin, X, Bell, Tag, Users, HelpCircle, Flame, ChevronDown, Moon, Sun, Home, LogOut, User, Settings, ShoppingCart } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCartStore } from "@/stores/cart";
import { SITE_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";
import { useProfile, useFoods } from "@/hooks/useSupabase";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme, toggleTheme } = useTheme();
  const { data: profile, isLoading } = useProfile();
  const { data: foods } = useFoods();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const addItem = useCartStore((s) => s.addItem);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        router.refresh();
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [queryClient, router, supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    queryClient.setQueryData(["profile"], null);
    setProfileOpen(false);
    router.push("/");
  };

  // Search Filtering Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !foods) return [];
    const q = searchQuery.toLowerCase();
    return foods.filter(food => 
      food.name.toLowerCase().includes(q) || 
      food.description?.toLowerCase().includes(q) ||
      food.category?.name.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [searchQuery, foods]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-[var(--bg)] border-b border-[var(--border)] transition-all duration-300",
          scrolled ? "h-20 shadow-md" : "h-24 shadow-sm"
        )}
      >
        <div className="container-app h-full flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Flame size={20} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-2xl font-black text-[var(--primary)] tracking-tighter hidden sm:block">
                CraveDrop
              </span>
            </Link>

            {/* Swiggy Style Location Selector */}
            <div 
              className="hidden md:flex items-center gap-2 group cursor-pointer border-b-2 border-[var(--text-primary)] hover:border-[var(--primary)] pb-0.5 transition-all" 
              onClick={() => router.push("/location")}
            >
              <span className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Other</span>
              <span className="text-[11px] font-bold text-[var(--text-tertiary)] truncate max-w-[200px] group-hover:text-[var(--text-primary)] transition-colors">Chennai, Tamil Nadu, India</span>
              <ChevronDown size={14} className="text-[var(--primary)] ml-1" />
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <HeaderLink icon={<Home size={18} />} label="Home" href="/" />
            <button 
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-sm font-black text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors group relative"
            >
              <span className="group-hover:scale-110 transition-transform"><Search size={18} /></span>
              Search
            </button>
            <HeaderLink icon={<Tag size={18} />} label="Offers" href="/offers" badge="NEW" />
            <HeaderLink icon={<HelpCircle size={18} />} label="Help" href="/help" />
            
            {/* Auth Section */}
            <div className="relative">
              {mounted && !isLoading && profile ? (
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--border)] overflow-hidden group-hover:border-[var(--primary)] transition-all">
                    <img 
                      src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name || 'User'}&background=FF5200&color=fff`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-black text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                    {profile.full_name?.split(' ')[0] || 'Account'}
                  </span>
                  
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-2xl p-2 z-50"
                      >
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-all group/item">
                          <User size={18} className="text-[var(--text-tertiary)] group-hover/item:text-[var(--primary)]" />
                          <span className="text-xs font-black uppercase tracking-widest">My Profile</span>
                        </Link>
                        <Link href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-all group/item">
                          <ShoppingCart size={18} className="text-[var(--text-tertiary)] group-hover/item:text-[var(--primary)]" />
                          <span className="text-xs font-black uppercase tracking-widest">Orders</span>
                        </Link>
                        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-all group/item">
                          <Settings size={18} className="text-[var(--text-tertiary)] group-hover/item:text-[var(--primary)]" />
                          <span className="text-xs font-black uppercase tracking-widest">Settings</span>
                        </Link>
                        <div className="h-px bg-[var(--border)] my-1 mx-2" />
                        <button 
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all group/item"
                        >
                          <LogOut size={18} className="group-hover/item:translate-x-1 transition-transform" />
                          <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <HeaderLink icon={<Users size={18} />} label="Sign In" href="/auth/login" />
              )}
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={openCart}
              className="flex items-center gap-2 text-sm font-black text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors relative"
            >
              <ShoppingBag size={20} strokeWidth={2.5} />
              Cart
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-3 w-5 h-5 bg-[var(--primary)] text-white text-[10px] font-black rounded-lg flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-4">
             <button onClick={openCart} className="relative p-2 text-[var(--text-primary)]">
                <ShoppingBag size={24} />
                {mounted && totalItems > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--primary)] rounded-full border-2 border-[var(--bg)]" />}
             </button>
             <Link href={profile ? "/profile" : "/auth/login"} className="p-2 text-[var(--text-primary)]">
                {mounted && profile ? (
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--primary)] overflow-hidden">
                    <img 
                      src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name || 'User'}&background=FF5200&color=fff`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Users size={24} />
                )}
             </Link>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--bg)]/98 backdrop-blur-3xl flex flex-col items-center pt-10 md:pt-20 px-4 md:px-8 overflow-y-auto pb-20"
          >
            <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-12 relative z-10">
              {/* Search Bar Container */}
              <div className="flex items-center gap-4 md:gap-6 w-full">
                <div className="flex-1 relative group">
                  <Search
                    size={28}
                    className="absolute left-7 top-1/2 -translate-y-1/2 text-[var(--primary)] group-focus-within:scale-110 transition-transform duration-500 z-10"
                  />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for biryani, pizza, desserts..."
                    className="w-full h-18 md:h-24 pl-18 pr-16 rounded-[2.5rem] bg-[var(--bg-card)] border-2 border-[var(--border)] focus:border-[var(--primary)] focus:shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] text-xl md:text-3xl font-black text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] placeholder:font-medium shadow-2xl transition-all duration-300 outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--danger)] hover:text-white transition-all cursor-pointer shadow-sm z-10"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-18 h-18 md:w-24 md:h-24 shrink-0 rounded-[2.5rem] bg-[var(--bg-card)] border-2 border-[var(--border)] hover:border-[var(--danger)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--danger)] hover:text-white transition-all duration-300 cursor-pointer shadow-2xl active:scale-90"
                >
                  <X size={32} strokeWidth={3} />
                </button>
              </div>

              {/* Dynamic Content */}
              <div className="w-full">
                {searchQuery ? (
                  <div className="space-y-10">
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {searchResults.map((food) => (
                          <motion.div
                            key={food.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="group flex items-center gap-6 p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            onClick={() => {
                              addItem(food, 1, []);
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden relative shrink-0">
                              <img 
                                src={food.images?.[0]?.image_url || 'https://via.placeholder.com/300'} 
                                alt={food.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {food.is_veg ? (
                                  <div className="w-3 h-3 border border-green-600 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-green-600" /></div>
                                ) : (
                                  <div className="w-3 h-3 border border-red-600 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-red-600" /></div>
                                )}
                                <span className="text-[10px] font-black uppercase text-[var(--primary)] tracking-widest">{food.category?.name}</span>
                              </div>
                              <h4 className="text-lg md:text-xl font-black text-[var(--text-primary)] truncate group-hover:text-[var(--primary)] transition-colors">{food.name}</h4>
                              <p className="text-xs font-bold text-[var(--text-tertiary)] truncate mb-2">{food.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-base font-black text-[var(--text-primary)]">₹{food.price}</span>
                                <span className="text-[10px] font-black text-white bg-green-600 px-2 py-1 rounded-lg">ADD +</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <div className="w-24 h-24 bg-[var(--bg-elevated)] rounded-full flex items-center justify-center mx-auto mb-6 opacity-30">
                          <Search size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-[var(--text-primary)] mb-2">No results for "{searchQuery}"</h3>
                        <p className="text-[var(--text-tertiary)] font-bold">Try searching for something else or browse categories.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="w-10 h-2 bg-[var(--primary)] rounded-full" />
                        <h4 className="text-lg font-black text-[var(--primary)] uppercase tracking-widest">
                          Trending Searches
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-4 md:gap-6">
                        {[
                          { term: "Biryani", icon: "🍛" },
                          { term: "Pizza", icon: "🍕" },
                          { term: "Burger", icon: "🍔" },
                          { term: "Healthy Salads", icon: "🥗" },
                          { term: "Fresh Groceries", icon: "🥕" },
                          { term: "Cold Beverages", icon: "🥤" },
                          { term: "Desserts", icon: "🍰" }
                        ].map(({ term, icon }) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-8 py-5 rounded-[1.5rem] bg-[var(--bg-card)] border border-[var(--border)] text-base md:text-xl font-black tracking-wide text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg flex items-center gap-4"
                          >
                            <span className="text-2xl">{icon}</span>
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="pt-10 text-center"
                    >
                       <p className="text-5xl md:text-8xl font-black text-[var(--text-tertiary)] opacity-10 leading-none tracking-tighter select-none">
                        HUNGRY? <br /> WE GOT <br /> YOU.
                       </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeaderLink({ icon, label, href, badge }: { icon: React.ReactNode, label: string, href: string, badge?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-sm font-black text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors group relative">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      {label}
      {badge && (
        <span className="absolute -top-3 -right-6 text-[8px] font-black bg-[var(--primary-50)] text-[var(--primary)] px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}
