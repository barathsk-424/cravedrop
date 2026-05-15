"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Plus, Clock, Loader2, Flame } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import type { Food } from "@/types";

interface FoodCardProps {
  food: Food;
  index?: number;
  variant?: "grid" | "list";
}

export function FoodCard({ food, index = 0, variant = "grid" }: FoodCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const primaryImage = food.images?.find((img) => img.is_primary) || food.images?.[0];
  const hasDiscount = food.discount_price && food.discount_price < food.price;
  const discountPercent = hasDiscount
    ? Math.round(((food.price - food.discount_price!) / food.price) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(food, 1, []);
  };

  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between gap-8 py-8 border-b border-[var(--border-light)] last:border-0"
      >
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${food.is_veg ? "border-[var(--veg)]" : "border-[var(--nonveg)]"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${food.is_veg ? "bg-[var(--veg)]" : "bg-[var(--nonveg)]"}`} />
            </span>
            {food.rating_avg && (
              <span className="text-xs font-black text-[var(--accent)] flex items-center gap-0.5">
                <Star size={12} fill="currentColor" /> {food.rating_avg}
              </span>
            )}
          </div>
          <h3 className="text-lg font-black text-[var(--text-primary)]">{food.name}</h3>
          <p className="text-sm font-black text-[var(--text-primary)]">
             {formatPrice(food.discount_price ?? food.price)}
          </p>
          <p className="text-sm font-medium text-[var(--text-tertiary)] line-clamp-2 max-w-xl">
            {food.description}
          </p>
        </div>

        <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-[var(--bg-elevated)] shrink-0 shadow-sm border border-[var(--border-light)] perspective-1000">
          <div className="w-full h-full tilt-3d">
            {primaryImage ? (
              <Image src={primaryImage.image_url} alt={food.name} fill className="object-cover tilt-3d-image" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)] opacity-20">
                 <Flame size={32} />
              </div>
            )}
          </div>
          <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-28 h-10 rounded-xl bg-[var(--bg-card)] shadow-lg border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-all cursor-pointer overflow-hidden z-10" onClick={handleAdd}>
             <span className="text-[var(--primary)] font-black text-sm uppercase tracking-widest">Add</span>
             <Plus size={12} className="absolute top-1 right-2 text-[var(--primary)] opacity-50" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative cursor-pointer perspective-1000"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-sm border border-[var(--border)] tilt-3d">
        {primaryImage ? (
          <Image
            src={primaryImage.image_url}
            alt={food.name}
            fill
            className="object-cover tilt-3d-image"
          />
        ) : (
          <div className="w-full h-full bg-[var(--bg-elevated)] flex items-center justify-center">
            <Loader2 className="animate-spin text-[var(--text-tertiary)] opacity-20" size={24} />
          </div>
        )}

        {/* Offer Badge Overlay */}
        {hasDiscount && (
           <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <span className="text-white text-xl font-black uppercase tracking-tighter">
                {discountPercent}% OFF UPTO {formatPrice(100)}
              </span>
           </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-4 pb-2 px-1">
        <h3 className="text-[17px] font-black text-[var(--text-primary)] line-clamp-1 mb-1 tracking-tight">
          {food.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center gap-1 bg-[var(--success)] text-white px-1.5 py-0.5 rounded-lg text-[11px] font-black">
            <Star size={10} fill="currentColor" />
            {food.rating_avg}
          </div>
          <span className="text-[var(--text-tertiary)] font-bold text-xs">•</span>
          <span className="text-xs font-black text-[var(--text-primary)] uppercase">
            {food.preparation_time}
          </span>
        </div>

        <p className="text-[13px] font-medium text-[var(--text-tertiary)] line-clamp-1 mb-3">
           {food.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
           <span className="text-[16px] font-black text-[var(--text-primary)]">
              {formatPrice(food.discount_price ?? food.price)}
           </span>
           <button 
              onClick={handleAdd}
              className="px-6 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--primary)] font-black text-xs hover:bg-[var(--primary-50)] transition-all shadow-sm active:scale-95 uppercase tracking-wider"
            >
              Add
           </button>
        </div>
      </div>
    </motion.div>
  );
}
