"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin, CreditCard, Wallet, ChevronRight, ArrowLeft,
  Check, Plus, Clock, Shield, Loader2
} from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useAddresses } from "@/hooks/useSupabase";
import { createOrder } from "@/app/actions/orders";
import { toast } from "sonner";

const paymentMethods = [
  { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: "💳" },
  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: "💳" },
  { id: "wallet", label: "Wallet", desc: "Balance: ₹0.00", icon: "👛" },
  { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive", icon: "💵" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { data: addresses, isLoading: isAddressesLoading } = useAddresses() as any;
  
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [tip, setTip] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Set default address when loaded
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0].id);
    }
  }, [addresses, selectedAddress]);

  const deliveryCharge = subtotal() >= 499 ? 0 : 40;
  const gst = Math.round(subtotal() * 0.05 * 100) / 100;
  const grandTotal = subtotal() + deliveryCharge + gst + tip;

  const handlePlaceOrder = async () => {
    if (!selectedAddress && addresses && addresses.length > 0) {
      toast.error("Please select a delivery address");
      return;
    }

    setIsProcessing(true);
    try {
      const order: any = await createOrder({
        address_id: selectedAddress,
        payment_method: selectedPayment,
        subtotal: subtotal(),
        gst_amount: gst,
        delivery_charge: deliveryCharge,
        discount: 0,
        tip: tip,
        total_amount: grandTotal,
        notes: instructions,
        items: items.map(item => ({
          food_id: item.food.id,
          food_name: item.food.name,
          quantity: item.quantity,
          unit_price: item.food.discount_price || item.food.price,
          total_price: item.itemTotal,
          special_instructions: item.specialInstructions,
        }))
      });

      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-7xl mb-6">🛒</p>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Cart is empty
        </h2>
        <p className="text-[var(--text-tertiary)] mb-6">
          Add items to proceed to checkout
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold"
        >
          <ArrowLeft size={16} />
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-6">
      {/* Back */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] mb-4 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Cart
      </Link>

      <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)] mb-6">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Delivery Address */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-[var(--shadow-sm)] border border-[var(--glass-border)]"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Delivery Address
              </h2>
            </div>
            <div className="space-y-3">
              {isAddressesLoading ? (
                <div className="space-y-3">
                  <div className="h-20 bg-[var(--bg-elevated)] rounded-xl animate-pulse" />
                  <div className="h-20 bg-[var(--bg-elevated)] rounded-xl animate-pulse" />
                </div>
              ) : addresses && addresses.length > 0 ? (
                addresses.map((addr: any) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer",
                      selectedAddress === addr.id
                        ? "border-[var(--primary)] bg-[var(--primary-50)]"
                        : "border-[var(--glass-border)] hover:border-[var(--primary)]/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-[var(--text-primary)]">
                        {addr.address_line1} {addr.is_default && <span className="ml-2 px-1.5 py-0.5 rounded-md bg-[var(--primary-50)] text-[var(--primary)] text-[10px] uppercase font-black tracking-widest">Default</span>}
                      </span>
                      {selectedAddress === addr.id && (
                        <Check size={16} className="text-[var(--primary)]" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] font-bold">{addr.address_line2}, {addr.city}, {addr.pincode}</p>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-[var(--glass-border)] rounded-xl">
                   <p className="text-sm font-bold text-[var(--text-tertiary)] mb-4">No saved addresses found</p>
                   <Link href="/profile/addresses" className="text-xs font-black text-[var(--primary)] uppercase tracking-widest hover:underline">Add New Address</Link>
                </div>
              )}
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[var(--glass-border)] text-[10px] font-black uppercase tracking-widest text-[var(--primary)] hover:bg-[var(--primary-50)] transition-colors cursor-pointer">
                <Plus size={16} />
                Add New Address
              </button>
            </div>
          </motion.section>

          {/* Payment */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-[var(--shadow-sm)] border border-[var(--glass-border)]"
          >
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={18} className="text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Payment Method
              </h2>
            </div>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer",
                    selectedPayment === method.id
                      ? "border-[var(--primary)] bg-[var(--primary-50)]"
                      : "border-[var(--glass-border)] hover:border-[var(--primary)]/50"
                  )}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {method.label}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">{method.desc}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <Check size={16} className="text-[var(--primary)]" />
                  )}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Tip */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-[var(--shadow-sm)] border border-[var(--glass-border)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wallet size={18} className="text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Tip your delivery partner
              </h2>
            </div>
            <div className="flex gap-2">
              {[0, 10, 20, 30, 50].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTip(amount)}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border cursor-pointer",
                    tip === amount
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--glass-border)]"
                  )}
                >
                  {amount === 0 ? "No tip" : `₹${amount}`}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Instructions */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-[var(--shadow-sm)] border border-[var(--glass-border)]"
          >
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Special Instructions
            </h2>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Any special requests? (e.g., less spicy, no onions)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] resize-none"
            />
          </motion.section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-[var(--shadow-sm)] border border-[var(--glass-border)] sticky top-20">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 font-[family-name:var(--font-poppins)]">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-2.5 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.food.id} className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)] truncate mr-2">
                    {item.food.name} x{item.quantity}
                  </span>
                  <span className="text-[var(--text-primary)] font-medium flex-shrink-0">
                    {formatPrice((item.food.discount_price || item.food.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill */}
            <div className="space-y-2 text-sm border-t border-[var(--glass-border)] pt-4">
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
              {tip > 0 && (
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Tip</span>
                  <span>{formatPrice(tip)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[var(--text-primary)] text-lg pt-3 border-t border-dashed border-[var(--glass-border)]">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* ETA */}
            <div className="flex items-center gap-2 mt-4 py-2.5 px-3 rounded-xl bg-[var(--primary-50)]">
              <Clock size={16} className="text-[var(--primary)]" />
              <span className="text-xs font-medium text-[var(--primary)]">
                Estimated delivery: 25-35 min
              </span>
            </div>

            {/* Place Order */}
            <button 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full h-12 mt-4 rounded-2xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-dark)] transition-all active:scale-[0.98] shadow-[var(--shadow-md)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Place Order — {formatPrice(grandTotal)}
                  <ChevronRight size={18} />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[var(--text-tertiary)]">
              <Shield size={12} />
              Secure payment powered by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
