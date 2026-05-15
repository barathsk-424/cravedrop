"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Flame, Loader2, Star, Clock, Filter } from "lucide-react";
import { FoodCard } from "@/components/customer/FoodCard";
import { useCategories, useFoods } from "@/hooks/useSupabase";
import type { Category, Food } from "@/types";
import { cn } from "@/lib/utils";

function MenuContent() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  
  const { data: categories, isLoading: isCatsLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    if (categoryQuery && categories) {
      const cat = categories.find(c => c.slug === categoryQuery);
      if (cat) setSelectedCategory(cat.id);
    } else if (!categoryQuery) {
      setSelectedCategory(null);
    }
  }, [categoryQuery, categories]);

  const { data: foods, isLoading: isFoodsLoading } = useFoods(selectedCategory);
  
  const [search, setSearch] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");

  // Group foods by category
  const groupedFoods = useMemo(() => {
    if (!foods) return {};
    let items = [...foods];

    // Filters
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(f => f.name.toLowerCase().includes(q) || f.description?.toLowerCase().includes(q));
    }
    if (isVegOnly) items = items.filter(f => f.is_veg);

    // Sorting
    switch (sortBy) {
      case "price-low": items.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price)); break;
      case "price-high": items.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price)); break;
      case "rating": items.sort((a, b) => (b.rating_avg || 0) - (a.rating_avg || 0)); break;
      default: items.sort((a, b) => (b.rating_count || 0) - (a.rating_count || 0));
    }

    // Actual Grouping
    const groups: Record<string, Food[]> = {};
    items.forEach(food => {
      const catName = food.category?.name || "Other";
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(food);
    });
    return groups;
  }, [foods, search, isVegOnly, sortBy]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header Info */}
      <div className="container-app pt-12 pb-8 border-b border-[var(--border-light)]">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight mb-2">Best Food Options</h1>
                <p className="text-[var(--text-secondary)] font-bold">Discover and order the best meals near you.</p>
             </div>
            
            <div className="flex flex-wrap items-center gap-3">
               <button 
                  onClick={() => setIsVegOnly(!isVegOnly)}
                   className={cn(
                    "px-4 py-2 rounded-xl border text-xs font-black transition-all flex items-center gap-2",
                    isVegOnly ? "bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]/20" : "text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-primary)]"
                  )}
               >
                   <div className={cn("w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center", isVegOnly ? "border-[var(--success)]" : "border-[var(--text-tertiary)]")}>
                    {isVegOnly && <div className="w-1.5 h-1.5 bg-[var(--success)] rounded-full" />}
                  </div>
                  Pure Veg
               </button>
                              <div className="h-10 w-[1px] bg-[var(--border-light)] mx-2 hidden md:block" />
               
               <select                   value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-10 px-4 rounded-xl border border-[var(--border)] bg-transparent text-xs font-black text-[var(--text-secondary)] outline-none focus:border-[var(--text-primary)] transition-colors"
               >
                  <option value="popular">Relevance (Popular)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
               </select>

                <div className="relative">
                   <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
                  <input 
                    type="text"                     placeholder="Search for dishes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-10 pl-10 pr-4 rounded-xl bg-[var(--bg-elevated)] text-xs font-black text-[var(--text-primary)] border-none focus:ring-2 focus:ring-[var(--primary)]/10 outline-none w-[200px]"
                  />
               </div>
            </div>
         </div>
      </div>

      <div className="container-app py-12 flex gap-12">
          {/* Sidebar Navigation */}
         <aside className="hidden lg:block w-64 shrink-0 sticky top-32 h-fit space-y-2 border-r border-[var(--border-light)] pr-8">
            <h4 className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-6">Menu Categories</h4>
             {isCatsLoading ? (
               [1,2,3,4,5].map(i => <div key={i} className="h-10 bg-[var(--bg-elevated)] rounded-lg animate-pulse" />)
            ) : (
               Object.keys(groupedFoods).map(catName => (
                   <button
                    key={catName}
                    onClick={() => scrollToCategory(catName)}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-black text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-50)] transition-all flex items-center justify-between group"
                  >
                    {catName}
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
               ))
            )}
         </aside>

         {/* Main Menu List */}
         <main className="flex-1 max-w-3xl mx-auto lg:mx-0">
            {isFoodsLoading ? (
               <div className="space-y-12">
                  {[1,2,3].map(i => (
                     <div key={i} className="space-y-6">
                       <div className="w-32 h-6 bg-[var(--bg-elevated)] rounded animate-pulse" />
                       {[1,2].map(j => <div key={j} className="h-48 bg-[var(--bg-card)] rounded-2xl animate-pulse" />)}
                    </div>
                  ))}
               </div>
            ) : Object.keys(groupedFoods).length > 0 ? (
               <div className="space-y-16 pb-32">
                   {Object.entries(groupedFoods).map(([catName, items]) => (
                     <section key={catName} id={catName} className="scroll-mt-32">
                        <div className="flex items-center gap-4 mb-8 sticky top-24 bg-[var(--bg)]/80 backdrop-blur-md py-4 z-20 border-b border-[var(--border-light)]">
                            <h2 className="text-2xl font-black text-[var(--text-primary)]">{catName}</h2>
                           <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest">
                              {items.length} Items
                           </span>
                         </div>
                        <div className="divide-y divide-[var(--border-light)]">
                           {items.map((food, idx) => (
                              <FoodCard key={food.id} food={food} index={idx} variant="list" />
                           ))}
                        </div>
                     </section>
                  ))}
               </div>
            ) : (
                <div className="py-32 text-center">
                   <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
                      <Search size={32} className="text-[var(--text-tertiary)]" />
                 </div>
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">No results found</h3>
                <p className="text-[var(--text-secondary)]">Try adjusting your filters or search query.</p>
             </div>
          )}
       </main>
    </div>
  </div>
);
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] flex items-center justify-center"><Loader2 className="animate-spin text-[var(--primary)]" size={40} /></div>}>
      <MenuContent />
    </Suspense>
  );
}
