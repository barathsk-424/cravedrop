"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Package, Clock, ChevronRight, RotateCcw, Star, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useOrders } from "@/hooks/useSupabase";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50" },
  confirmed: { label: "Confirmed", color: "text-blue-600", bg: "bg-blue-50" },
  preparing: { label: "Preparing", color: "text-amber-600", bg: "bg-amber-50" },
  out_for_delivery: { label: "On the way", color: "text-blue-600", bg: "bg-blue-50" },
  delivered: { label: "Delivered", color: "text-[var(--success)]", bg: "bg-green-50" },
  cancelled: { label: "Cancelled", color: "text-[var(--danger)]", bg: "bg-red-50" },
};

const tabs = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrders() as any;
  const [activeTab, setActiveTab] = useState("all");

  const filtered = (orders || []).filter((o: any) => {
    if (activeTab === "active") return ["pending", "confirmed", "preparing", "out_for_delivery"].includes(o.status || "");
    if (activeTab === "completed") return ["delivered", "cancelled"].includes(o.status || "");
    return true;
  });

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)] mb-5">
        Your Orders
      </h1>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--bg-elevated)] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer",
              activeTab === tab.id
                ? "bg-white text-[var(--text-primary)] shadow-[var(--shadow-sm)] dark:bg-[var(--bg-card)]"
                : "text-[var(--text-tertiary)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
            <p className="text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Retrieving your culinary history...</p>
          </div>
        ) : filtered.map((order: any, i: number) => {
          const sc = statusConfig[order.status || "pending"];
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)] overflow-hidden border border-[var(--glass-border)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-2.5">
                  <Package size={16} className="text-[var(--primary)]" />
                  <span className="text-sm font-bold text-[var(--text-primary)]">#{order.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", sc.color, sc.bg)}>
                  {sc.label}
                </span>
              </div>

              {/* Items */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 3).map((item: any, j: number) => (
                      <div
                        key={j}
                        className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[var(--bg-card)] relative bg-[var(--bg-elevated)]"
                      >
                        {item.food?.images?.[0]?.image_url && (
                          <Image src={item.food.images[0].image_url} alt={item.food_name} fill className="object-cover" sizes="40px" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                      {order.items?.map((item: any) => `${item.food_name} x${item.quantity}`).join(", ")}
                    </p>
                    <p className="text-[11px] font-bold text-[var(--text-tertiary)] flex items-center gap-1 mt-0.5">
                      <Clock size={12} />
                      {new Date(order.created_at || "").toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[var(--glass-border)]">
                  <span className="text-sm font-black text-[var(--text-primary)]">
                    {formatPrice(order.total_amount)}
                  </span>
                  <div className="flex gap-2">
                    {order.status === "delivered" && (
                      <>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer">
                          <Star size={12} />
                          Rate
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors cursor-pointer">
                          <RotateCcw size={12} />
                          Reorder
                        </button>
                      </>
                    )}
                    {(order.status === "pending" || order.status === "confirmed" || order.status === "preparing" || order.status === "out_for_delivery") && (
                      <Link 
                        href={`/orders/details?id=${order.id}`}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors cursor-pointer"
                      >
                        Track
                        <ChevronRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
              <Package size={32} className="text-[var(--text-tertiary)]" />
            </div>
            <h3 className="text-xl font-black text-[var(--text-primary)]">No orders here</h3>
            <p className="text-sm font-bold text-[var(--text-tertiary)] mt-2">
              {activeTab === "active" ? "No active orders right now" : "Start ordering delicious food!"}
            </p>
            <Link href="/menu" className="inline-block mt-8 px-8 py-3 rounded-2xl bg-[var(--primary)] text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
              Explore Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
