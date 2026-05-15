"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { useAdminStats, useRecentOrders } from "@/hooks/useSupabase";

export default function AdminDashboardPage() {
  const { data: statsData, isLoading: isStatsLoading } = useAdminStats() as any;
  const { data: orders, isLoading: isOrdersLoading } = useRecentOrders() as any;

  const stats = [
    {
      title: "Total Revenue",
      value: statsData?.totalRevenue || 0,
      isCurrency: true,
      trend: "+12.5%",
      isPositive: true,
      icon: IndianRupee,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Active Orders",
      value: statsData?.activeOrders || 0,
      isCurrency: false,
      trend: "+4.2%",
      isPositive: true,
      icon: ShoppingCart,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Customers",
      value: statsData?.totalCustomers || 0,
      isCurrency: false,
      trend: "+18.2%",
      isPositive: true,
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Avg. Order Value",
      value: Math.round(statsData?.avgOrderValue || 0),
      isCurrency: true,
      trend: "-2.4%",
      isPositive: false,
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  if (isStatsLoading || isOrdersLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
        <p className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em]">Synching Neural HQ...</p>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">
          Dashboard Overview
        </h1>
        <p className="text-[var(--text-tertiary)] mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--bg-card)] p-6 rounded-[2rem] shadow-[var(--shadow-sm)] border border-[var(--glass-border)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-black text-[var(--text-primary)]">
                {stat.isCurrency ? formatPrice(stat.value) : stat.value}
              </h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Chart / List */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-[2rem] shadow-[var(--shadow-sm)] border border-[var(--glass-border)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Recent Orders</h2>
            <button className="text-sm font-bold text-[var(--primary)] hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--glass-border)] text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                  <th className="pb-3 font-bold">Order ID</th>
                  <th className="pb-3 font-bold">Customer</th>
                  <th className="pb-3 font-bold">Items</th>
                  <th className="pb-3 font-bold">Total</th>
                  <th className="pb-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders?.map((order: any) => (
                  <tr key={order.id} className="border-b border-[var(--glass-border)] last:border-0 hover:bg-[var(--bg-elevated)] transition-colors">
                    <td className="py-4 font-bold text-[var(--text-primary)]">#{order.id.slice(0, 8).toUpperCase()}</td>
                    <td className="py-4 font-medium text-[var(--text-secondary)]">{order.profile?.full_name || "Guest"}</td>
                    <td className="py-4 text-[var(--text-tertiary)] max-w-[200px] truncate">
                       {order.items?.map((item: any) => item.food_name).join(", ") || "No items"}
                    </td>
                    <td className="py-4 font-bold text-[var(--text-primary)]">{formatPrice(order.total_amount)}</td>
                    <td className="py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        order.status === 'preparing' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      )}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Items / Kitchen Queue */}
        <div className="bg-[var(--bg-card)] rounded-[2rem] shadow-[var(--shadow-sm)] border border-[var(--glass-border)] p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Kitchen Queue</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--primary)]/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-black text-lg">
                  #{i}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Table {i + 4} / Takeaway</h4>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">3 items • Pending</p>
                </div>
                <div className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                  4m wait
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
