"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2, Tag, ChevronRight } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";
import { useState, useEffect } from "react";

export function CartPanel() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
    clearCart,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deliveryCharge = subtotal() >= 499 ? 0 : 40;
  const gst = Math.round(subtotal() * 0.05 * 100) / 100;
  const discount = couponApplied ? Math.min(subtotal() * 0.5, 100) : 0;
  const grandTotal = subtotal() + deliveryCharge + gst - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "FIRST50") {
      setCouponApplied(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-overlay)]"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[var(--z-modal)] max-h-[85vh] bg-[var(--bg)] rounded-t-3xl shadow-[var(--shadow-lg)] flex flex-col overflow-hidden md:max-w-md md:right-4 md:left-auto md:bottom-4 md:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--glass-border)]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[var(--primary)]" />
                <h2 className="text-lg font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">
                  Your Cart
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[var(--primary-50)] text-[var(--primary)] text-xs font-bold">
                  {mounted ? totalItems() : 0}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs font-medium text-[var(--danger)] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors text-[var(--text-tertiary)] cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {!mounted ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">🛒</p>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-[var(--text-tertiary)] mb-4">
                    Add some delicious dishes to get started
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors cursor-pointer"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.food.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className="flex gap-3 p-3 rounded-2xl bg-[var(--bg-card)] shadow-[var(--shadow-sm)]"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={
                              item.food.images?.find((img) => img.is_primary)
                                ?.image_url ||
                              item.food.images?.[0]?.image_url ||
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"
                            }
                            alt={item.food.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center ${
                                    item.food.is_veg
                                      ? "border-[var(--success)]"
                                      : "border-[var(--danger)]"
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      item.food.is_veg
                                        ? "bg-[var(--success)]"
                                        : "bg-[var(--danger)]"
                                    }`}
                                  />
                                </span>
                                <h4 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                                  {item.food.name}
                                </h4>
                              </div>
                              <p className="text-sm font-bold text-[var(--primary)] mt-1">
                                {formatPrice(
                                  (item.food.discount_price || item.food.price) *
                                    item.quantity
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.food.id)}
                              className="p-1.5 rounded-lg hover:bg-[var(--danger)]/10 text-[var(--text-tertiary)] hover:text-[var(--danger)] transition-colors cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2.5 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.food.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold text-[var(--text-primary)] w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.food.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white hover:bg-[var(--primary-dark)] transition-colors cursor-pointer"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Coupon & Summary */}
            {mounted && items.length > 0 && (
              <div className="border-t border-[var(--glass-border)] px-5 py-4 space-y-3">
                {/* Coupon */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                    />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponApplied(false);
                      }}
                      placeholder="Coupon code"
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-[var(--bg-elevated)] border border-dashed border-[var(--glass-border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] uppercase"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    disabled={!couponCode}
                    className="px-4 h-10 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-[var(--success)] font-medium">
                    ✅ Coupon FIRST50 applied — you save {formatPrice(discount)}!
                  </p>
                )}

                {/* Bill Summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>GST (5%)</span>
                    <span>{formatPrice(gst)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Delivery</span>
                    <span className={deliveryCharge === 0 ? "text-[var(--success)]" : ""}>
                      {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[var(--success)]">
                      <span>Discount</span>
                      <span>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-[var(--text-primary)] text-base pt-2 border-t border-dashed border-[var(--glass-border)]">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-dark)] transition-all active:scale-[0.98] shadow-[var(--shadow-md)]"
                >
                  Proceed to Checkout
                  <ChevronRight size={18} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
