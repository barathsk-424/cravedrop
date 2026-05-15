"use client";

import { motion } from "framer-motion";
import { Copy, Percent, Tag, Clock, Flame, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function OffersPage() {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    // A toast could be added here in a real implementation
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-28 pb-32">
      <div className="container-app">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-xs font-black uppercase tracking-widest text-[var(--primary)] mb-6">
             <Tag size={14} fill="currentColor" /> Exclusive Deals
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-tight tracking-tight mb-4">
            Offers & <span className="text-[var(--primary)]">Discounts</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-medium max-w-2xl">
            Save big on your favorite meals with our curated list of exclusive promo codes and restaurant discounts.
          </p>
        </motion.div>

        {/* Promo Codes Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-[var(--text-primary)] mb-8 flex items-center gap-3">
            <Percent className="text-[var(--primary)]" />
            Active Promo Codes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PromoCard 
              code="CRAVE50" 
              title="50% OFF up to ₹100" 
              desc="Valid on orders above ₹199. Applicable on select restaurants." 
              expires="Valid till 11:59 PM today"
              onCopy={() => handleCopy("CRAVE50")}
            />
            <PromoCard 
              code="WELCOME" 
              title="Flat ₹150 OFF" 
              desc="Welcome offer for your first 3 orders on CraveDrop." 
              expires="Valid for new users"
              onCopy={() => handleCopy("WELCOME")}
            />
            <PromoCard 
              code="FREEDEL" 
              title="Free Delivery" 
              desc="Enjoy zero delivery fee on all orders above ₹299." 
              expires="Valid till Sunday"
              onCopy={() => handleCopy("FREEDEL")}
            />
          </div>
        </div>

        {/* Top Offers on Restaurants */}
        <div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] mb-8 flex items-center gap-3">
            <Flame className="text-[var(--danger)]" />
            Trending Restaurant Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RestaurantOfferCard 
              name="Burger King"
              image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop"
              offer="60% OFF up to ₹120"
              rating="4.2"
              time="25-30 min"
            />
            <RestaurantOfferCard 
              name="Pizza Hut"
              image="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop"
              offer="Flat ₹150 OFF"
              rating="4.0"
              time="35-40 min"
            />
            <RestaurantOfferCard 
              name="Paradise Biryani"
              image="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&auto=format&fit=crop"
              offer="Buy 1 Get 1 Free"
              rating="4.5"
              time="30-35 min"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PromoCard({ code, title, desc, expires, onCopy }: { code: string, title: string, desc: string, expires: string, onCopy: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
            <Percent size={24} />
          </div>
          <button 
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--primary)] text-xs font-bold transition-colors"
          >
            <Copy size={14} /> Copy
          </button>
        </div>
        <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">{title}</h3>
        <p className="text-sm font-medium text-[var(--text-tertiary)] leading-relaxed mb-6">
          {desc}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)]">
          <Clock size={14} /> {expires}
        </div>
        <div className="px-3 py-1 rounded-lg border border-[var(--primary)] border-dashed bg-[var(--primary)]/5 text-[var(--primary)] font-black text-sm tracking-wider uppercase">
          {code}
        </div>
      </div>
    </motion.div>
  );
}

function RestaurantOfferCard({ name, image, offer, rating, time }: { name: string, image: string, offer: string, rating: string, time: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer perspective-1000"
    >
      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 shadow-sm tilt-3d">
        <Image src={image} alt={name} fill className="object-cover tilt-3d-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 tilt-3d-content">
          <div className="bg-[var(--primary)] text-white px-3 py-1.5 rounded-xl text-sm font-black uppercase tracking-wider inline-flex shadow-lg mb-2">
            {offer}
          </div>
          <h3 className="text-2xl font-black text-white">{name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-green-700/20 text-green-500 px-2 py-1 rounded-lg text-xs font-black">
            {rating} <Flame size={12} fill="currentColor" />
          </div>
          <div className="text-sm font-bold text-[var(--text-secondary)]">
            {time}
          </div>
        </div>
        <ChevronRight size={20} className="text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors" />
      </div>
    </motion.div>
  );
}
