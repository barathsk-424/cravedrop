"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
    clearCart,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const deliveryCharge = subtotal() >= 499 ? 0 : 40;
  const gst = Math.round(subtotal() * 0.05 * 100) / 100;
  const discount = couponApplied ? Math.min(subtotal() * 0.5, 100) : 0;
  const grandTotal = subtotal() + deliveryCharge + gst - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "FIRST50") {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-7xl mb-6">🛒</p>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)] mb-2">
            Your cart is empty
          </h2>
          <p className="text-[var(--text-tertiary)] mb-6">
            Looks like you haven&apos;t added anything to your cart yet
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-dark)] transition-colors"
          >
            <ArrowLeft size={16} />
            Browse Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center shadow-[var(--shadow-md)]">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[var(--text-primary)] font-[family-name:var(--font-poppins)] uppercase tracking-tight">
              Your Selection
            </h1>
            <p className="text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-widest mt-1">
              {totalItems()} culinary masterpiece{totalItems() !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-black text-[var(--danger)] uppercase tracking-[0.2em] hover:scale-105 transition-transform cursor-pointer px-4 py-2 rounded-xl bg-[var(--danger-light)]"
        >
          Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.food.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-[var(--bg-card)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] border border-transparent hover:border-[var(--primary)]/20 transition-all duration-300"
              >
                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-md">
                  <Image
                    src={
                      item.food.images?.find((img) => img.is_primary)?.image_url ||
                      item.food.images?.[0]?.image_url ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"
                    }
                    alt={item.food.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="128px"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {item.food.is_veg ? <span className="veg-dot scale-75" /> : <span className="nonveg-dot scale-75" />}
                        <h3 className="text-xl font-black text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">
                          {item.food.name}
                        </h3>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-1 opacity-70 mb-3">
                        {item.food.description}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.food.id)}
                      className="p-3 rounded-2xl bg-[var(--bg-elevated)] text-[var(--text-tertiary)] hover:bg-[var(--danger)] hover:text-white transition-all cursor-pointer shadow-sm active:scale-90"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      <p className="text-2xl font-black text-[var(--primary)]">
                        {formatPrice((item.food.discount_price || item.food.price) * item.quantity)}
                      </p>
                      {item.food.discount_price && (
                        <p className="text-xs text-[var(--text-tertiary)] line-through">
                          {formatPrice(item.food.price * item.quantity)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 bg-[var(--bg-elevated)] p-1.5 rounded-2xl shadow-inner">
                      <button
                        onClick={() => updateQuantity(item.food.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all disabled:opacity-40 cursor-pointer shadow-sm active:scale-90"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="text-lg font-black text-[var(--text-primary)] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.food.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white hover:bg-[var(--primary-dark)] transition-all cursor-pointer shadow-md active:scale-90"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--secondary)] text-white rounded-[2.5rem] p-8 shadow-[var(--shadow-xl)] sticky top-24 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)] rounded-full blur-[80px] opacity-20" />
            
            <h3 className="text-2xl font-black mb-8 font-[family-name:var(--font-poppins)] uppercase tracking-tight relative z-10">
              Bill Details
            </h3>

            {/* Coupon */}
            <div className="relative z-10 mb-8">
              <div className="flex gap-2 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="flex-1 relative">
                  <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponApplied(false); }}
                    placeholder="Promo Code"
                    className="w-full h-11 pl-11 pr-3 bg-transparent text-sm font-bold text-white placeholder:text-white/30 focus:outline-none uppercase tracking-widest"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  disabled={!couponCode}
                  className="px-6 h-11 rounded-xl bg-[var(--primary)] text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 cursor-pointer shadow-lg"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[var(--accent)] font-bold mt-3 text-center uppercase tracking-wider"
                >
                  ✨ Success! You saved {formatPrice(discount)}
                </motion.p>
              )}
            </div>

            {/* Bill */}
            <div className="space-y-4 text-sm relative z-10">
              <div className="flex justify-between text-white/70">
                <span className="font-medium uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span className="font-medium uppercase tracking-widest text-[10px]">Service & GST (5%)</span>
                <span className="font-bold">{formatPrice(gst)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span className="font-medium uppercase tracking-widest text-[10px]">Delivery Charge</span>
                <span className={deliveryCharge === 0 ? "text-[var(--accent)] font-black" : "font-bold"}>
                  {deliveryCharge === 0 ? "COMPLIMENTARY" : formatPrice(deliveryCharge)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[var(--accent)]">
                  <span className="font-medium uppercase tracking-widest text-[10px]">Coupon Discount</span>
                  <span className="font-black">−{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className="pt-6 mt-6 border-t border-white/10">
                <div className="flex justify-between items-end">
                  <span className="font-black uppercase tracking-widest text-xs opacity-50">Total Amount</span>
                  <span className="text-4xl font-black tracking-tighter text-[var(--accent)]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center gap-3 w-full h-16 rounded-2xl bg-[var(--primary)] text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-[var(--primary-dark)] hover:scale-[1.02] transition-all active:scale-[0.98] shadow-2xl mt-8 relative z-10"
            >
              Confirm Order
              <ChevronRight size={20} />
            </Link>

            {deliveryCharge > 0 && (
              <p className="text-[10px] text-center text-white/40 mt-6 uppercase tracking-widest font-bold">
                Add {formatPrice(499 - subtotal())} for free delivery
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
