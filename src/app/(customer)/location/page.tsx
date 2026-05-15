"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Navigation, Clock, Star, ChevronRight, Home, Briefcase, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SAVED_ADDRESSES = [
  { id: 1, label: "Home", address: "Apt 4B, Skyview Towers, Chennai", icon: Home, type: "primary" },
  { id: 2, label: "Work", address: "Floor 12, Tech Park, OMR, Chennai", icon: Briefcase, type: "secondary" },
  { id: 3, label: "Gym", address: "FitLife Hub, Anna Nagar, Chennai", icon: Heart, type: "accent" },
];

const POPULAR_AREAS = [
  "Adyar", "Besant Nagar", "T. Nagar", "Mylapore", "Velachery", "Nungambakkam"
];

export default function LocationPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[var(--bg)] overflow-hidden">
      {/* Interactive Map Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&auto=format&fit=crop"
          alt="Map Background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-transparent to-[var(--bg)]" />
      </div>

      <div className="container-app relative z-10 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter mb-4">
              Where should we <span className="text-[var(--primary)]">deliver?</span>
            </h1>
            <p className="text-[var(--text-tertiary)] font-medium">Select your location to see restaurants and stores near you.</p>
          </motion.div>

          {/* Main Search Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--bg-card)]/80 backdrop-blur-2xl rounded-[2.5rem] border border-[var(--glass-border)] shadow-2xl overflow-hidden mb-8"
          >
            <div className="p-8 md:p-10">
              {/* Search Input */}
              <div className="relative group mb-8">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--primary)] group-focus-within:scale-110 transition-transform" size={24} />
                <input 
                  type="text"
                  placeholder="Search for your area, street or landmark..."
                  className="w-full h-18 pl-16 pr-32 bg-[var(--bg-elevated)] rounded-2xl border-2 border-transparent focus:border-[var(--primary)] text-lg font-bold text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all outline-none"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white text-sm font-black rounded-xl hover:shadow-[var(--shadow-primary)] transition-all active:scale-95">
                  <Navigation size={16} />
                  Locate Me
                </button>
              </div>

              {/* Saved Addresses Section */}
              <div className="space-y-6">
                <h3 className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] flex items-center gap-3">
                  <Star size={14} className="text-[var(--primary)]" />
                  Saved Addresses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SAVED_ADDRESSES.map((addr) => (
                    <button 
                      key={addr.id}
                      onClick={() => router.push("/")}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--primary)] transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[var(--bg)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors shrink-0">
                        <addr.icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[var(--text-primary)] mb-1">{addr.label}</h4>
                        <p className="text-xs text-[var(--text-tertiary)] line-clamp-1">{addr.address}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Suggestions */}
            <div className="bg-[var(--primary)]/5 p-8 border-t border-[var(--glass-border)]">
              <h3 className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-6">Popular Nearby</h3>
              <div className="flex flex-wrap gap-3">
                {POPULAR_AREAS.map((area) => (
                  <button 
                    key={area}
                    onClick={() => router.push("/")}
                    className="px-6 py-3 rounded-xl bg-[var(--bg)] text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--primary)] hover:shadow-md transition-all border border-[var(--border)]"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Back Action */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 mx-auto text-sm font-black text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors uppercase tracking-widest"
          >
            ← Back to browsing
          </motion.button>
        </div>
      </div>
    </div>
  );
}
