"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ChevronDown, Search, Flame } from "lucide-react";
import { useBanners, useProfile } from "@/hooks/useSupabase";

export function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: banners } = useBanners();
  const { data: profile } = useProfile() as any;

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/menu?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={banners && banners.length > 0 ? banners[0].image_url : "/images/hero-bg.png"}
          alt="Hero Background" 
          fill 
          className="object-cover scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
      </div>

      <div className="container-app relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-10 md:space-y-14"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/30 backdrop-blur-md"
            >
              <Flame size={18} className="text-[var(--primary)]" fill="currentColor" />
              <span className="text-xs md:text-sm font-black text-white uppercase tracking-[0.2em]">Premium Dining Experience</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter">
              Discover <br /> 
              <span className="text-[var(--primary)] italic">{profile?.full_name?.split(' ')[0] || "Extraordinary"}</span> <br /> 
              Flavors.
            </h1>
            
            <p className="text-lg md:text-2xl font-medium text-gray-300 max-w-2xl leading-relaxed">
              Experience gourmet cuisine from top-rated restaurants delivered with precision to your doorstep.
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 max-w-4xl">
            <div className="flex-[2] relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--primary)] group-focus-within:scale-110 transition-transform duration-500 z-10">
                <MapPin size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Chennai, Tamil Nadu"
                className="w-full h-16 md:h-20 pl-16 pr-8 text-lg font-bold text-[var(--text-primary)] bg-[var(--bg-card)] border-2 border-white/10 focus:border-[var(--primary)] rounded-[2rem] md:rounded-l-full md:rounded-r-none transition-all outline-none"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-50 hover:opacity-100 cursor-pointer transition-opacity z-10">
                <ChevronDown size={24} />
              </div>
            </div>

            <div className="flex-[3] relative group">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for restaurant, item or more"
                className="w-full h-16 md:h-20 pl-6 md:pl-8 pr-24 text-lg md:text-xl font-bold text-[var(--text-primary)] bg-[var(--bg-card)] border-2 border-white/10 md:border-l-0 focus:border-[var(--primary)] rounded-[2rem] md:rounded-r-full md:rounded-l-none transition-all outline-none"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 md:right-2 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 flex items-center justify-center text-white shadow-xl hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer z-10"
              >
                <Search size={24} strokeWidth={3} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
