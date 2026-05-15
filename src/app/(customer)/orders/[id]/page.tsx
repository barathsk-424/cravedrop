"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  MapPin, 
  ChefHat, 
  Bike, 
  CheckCircle2, 
  Clock, 
  PhoneCall,
  MessageSquare
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

// Mock data for the tracking view
const orderData = {
  id: "FH-1234",
  status: "out_for_delivery", // "preparing", "out_for_delivery", "delivered"
  estimatedTime: "2:45 PM",
  total: 458,
  restaurant: {
    name: "CraveDrop Central",
    address: "123 Culinary Avenue, Food District",
  },
  delivery: {
    name: "Alex",
    phone: "+91 98765 43210",
    rating: 4.8,
  },
  items: [
    { name: "Hyderabadi Chicken Biryani", qty: 1, price: 320 },
    { name: "Butter Naan", qty: 2, price: 69 },
  ]
};

const steps = [
  { id: "accepted", label: "Order Accepted", icon: CheckCircle2, time: "2:05 PM" },
  { id: "preparing", label: "Preparing Food", icon: ChefHat, time: "2:10 PM" },
  { id: "out_for_delivery", label: "Out for Delivery", icon: Bike, time: "2:30 PM" },
  { id: "delivered", label: "Delivered", icon: MapPin, time: null },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(2); // 0: accepted, 1: preparing, 2: out_for_delivery, 3: delivered

  // Simulate real-time updates for demo purposes
  useEffect(() => {
    if (orderData.status === "preparing") setCurrentStep(1);
    if (orderData.status === "out_for_delivery") setCurrentStep(2);
    if (orderData.status === "delivered") setCurrentStep(3);
  }, []);

  return (
    <div className="container-app py-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/orders" className="p-2 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Track Order</h1>
          <p className="text-sm text-[var(--text-tertiary)] font-medium">{params.id}</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-64 bg-[var(--bg-elevated)] rounded-[2rem] mb-8 overflow-hidden relative border border-[var(--glass-border)] shadow-[var(--shadow-md)]">
        <Image 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
          alt="Map tracking" 
          fill 
          className="object-cover opacity-60 mix-blend-luminosity"
        />
        
        {/* Map UI Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
        
        {/* Estimated Time Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
          <p className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-wider">Estimated Arrival</p>
          <p className="text-lg font-black text-[var(--primary)]">{orderData.estimatedTime}</p>
        </div>

        {/* Mock Map Markers */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/3 left-1/4 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center text-[var(--primary)]"
        >
          <ChefHat size={16} />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="absolute top-1/2 left-1/2 w-10 h-10 bg-[var(--primary)] rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] flex items-center justify-center text-white z-10 border-2 border-white"
        >
          <Bike size={20} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tracking Timeline */}
        <div className="bg-[var(--bg-card)] rounded-[2rem] p-6 shadow-[var(--shadow-sm)] border border-[var(--glass-border)]">
          <h2 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-wider mb-6">Order Status</h2>
          
          <div className="space-y-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[var(--bg-elevated)]" />
            <div 
              className="absolute left-[19px] top-4 w-0.5 bg-[var(--primary)] transition-all duration-1000 ease-out"
              style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, index) => {
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="relative flex gap-4 z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500",
                    isActive ? "bg-[var(--primary)] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-tertiary)]",
                    isCurrent && "shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] ring-4 ring-[var(--primary)]/20"
                  )}>
                    <StepIcon size={18} />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className={cn(
                      "font-bold text-sm",
                      isActive ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"
                    )}>
                      {step.label}
                    </h3>
                    {step.time && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5 font-medium flex items-center gap-1">
                        <Clock size={10} /> {step.time}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Delivery Info */}
        <div className="space-y-6">
          {/* Delivery Partner (if out for delivery) */}
          {currentStep >= 2 && (
            <div className="bg-[var(--bg-card)] rounded-[2rem] p-5 shadow-[var(--shadow-sm)] border border-[var(--glass-border)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] overflow-hidden relative">
                  <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Delivery Partner" fill />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{orderData.delivery.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)] font-medium">Delivery Partner • ★ {orderData.delivery.rating}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                  <MessageSquare size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 hover:bg-green-500/20 transition-colors">
                  <PhoneCall size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Receipt Summary */}
          <div className="bg-[var(--bg-card)] rounded-[2rem] p-6 shadow-[var(--shadow-sm)] border border-[var(--glass-border)]">
            <h2 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-wider mb-4">Receipt</h2>
            
            <div className="space-y-3 mb-4">
              {orderData.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-md">
                      {item.qty}x
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-dashed border-[var(--glass-border)] flex justify-between items-center">
              <span className="text-sm font-bold text-[var(--text-primary)]">Total Paid</span>
              <span className="text-lg font-black text-[var(--text-primary)]">{formatPrice(orderData.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
