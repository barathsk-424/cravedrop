"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Star, MapPin, Clock, Utensils, Calendar,
  Users, ChevronRight, ArrowLeft, Percent, Heart,
  Flame, Sparkles, Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Dineout Categories ─── */
const dineoutCategories = [
  { id: "fine-dining", name: "Fine Dining", icon: "🥂" },
  { id: "cafes", name: "Cafes & Bistros", icon: "☕" },
  { id: "buffet", name: "Luxury Buffets", icon: "🍲" },
  { id: "rooftop", name: "Rooftop Places", icon: "🏙️" },
  { id: "bars", name: "Bars & Pubs", icon: "🍺" },
  { id: "casual", name: "Casual Dining", icon: "🍔" },
  { id: "family", name: "Family Style", icon: "👨‍👩‍👧‍👦" },
];

/* ─── Dineout Restaurants ─── */
const dineoutRestaurants = [
  {
    id: "d1",
    name: "The Grand Pavilion",
    category: "fine-dining",
    rating: 4.8,
    reviews: 1200,
    cuisine: "Continental • Italian",
    location: "Anna Nagar, Chennai",
    distance: "2.4 km",
    priceForTwo: 2500,
    offer: "Flat 25% Off on Total Bill",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    isFastFiller: true,
  },
  {
    id: "d2",
    name: "Skyline Rooftop",
    category: "rooftop",
    rating: 4.6,
    reviews: 850,
    cuisine: "North Indian • Barbecue",
    location: "Nungambakkam, Chennai",
    distance: "4.1 km",
    priceForTwo: 1800,
    offer: "1+1 on Drinks",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&auto=format&fit=crop",
    isFastFiller: false,
  },
  {
    id: "d3",
    name: "The Buffet King",
    category: "buffet",
    rating: 4.4,
    reviews: 2100,
    cuisine: "Multi-Cuisine • Desserts",
    location: "T. Nagar, Chennai",
    distance: "1.8 km",
    priceForTwo: 1200,
    offer: "Flat 20% Off on Pre-booking",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
    isFastFiller: true,
  },
  {
    id: "d4",
    name: "Beanstalk Cafe",
    category: "cafes",
    rating: 4.7,
    reviews: 640,
    cuisine: "Cafe • Desserts • Fast Food",
    location: "Adyar, Chennai",
    distance: "5.2 km",
    priceForTwo: 800,
    offer: "Complimentary Dessert",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
    isFastFiller: false,
  },
  {
    id: "d5",
    name: "Vintage Bar & Kitchen",
    category: "bars",
    rating: 4.5,
    reviews: 920,
    cuisine: "Finger Food • Continental",
    location: "Velachery, Chennai",
    distance: "3.5 km",
    priceForTwo: 2200,
    offer: "Flat 15% Off on Food",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop",
    isFastFiller: false,
  },
  {
    id: "d6",
    name: "Saffron Spice",
    category: "family",
    rating: 4.3,
    reviews: 1500,
    cuisine: "South Indian • Mughlai",
    location: "Mylapore, Chennai",
    distance: "0.9 km",
    priceForTwo: 1000,
    offer: "Happy Hours: 20% Off",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop",
    isFastFiller: true,
  },
];

/* ─── Restaurant Card Component ─── */
function RestaurantCard({ res, onBook }: { res: typeof dineoutRestaurants[0], onBook: (res: typeof dineoutRestaurants[0]) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-[var(--bg-card)] rounded-[2rem] border border-[var(--border-light)] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={res.image}
          alt={res.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 shadow-lg">
          <Star size={12} className="text-orange-500" fill="currentColor" />
          <span className="text-xs font-black text-black">{res.rating}</span>
        </div>

        {/* Offer Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-orange-600 text-white px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-2 shadow-xl border border-white/10">
            <Percent size={14} strokeWidth={3} />
            {res.offer}
          </div>
        </div>
        
        {res.isFastFiller && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-lg animate-pulse">
            <Flame size={12} fill="currentColor" /> Filling Fast
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-xl font-black text-[var(--text-primary)] leading-tight group-hover:text-orange-500 transition-colors">
            {res.name}
          </h3>
          <button className="text-[var(--text-tertiary)] hover:text-red-500 transition-colors">
            <Heart size={20} />
          </button>
        </div>

        <p className="text-sm font-bold text-[var(--text-secondary)] mb-4">{res.cuisine}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <MapPin size={14} />
            <span className="text-xs font-bold">{res.location} • {res.distance}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <Utensils size={14} />
            <span className="text-xs font-bold">₹{res.priceForTwo} for two</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-card)] overflow-hidden">
                <Image src={`https://i.pravatar.cc/100?u=${res.id}${i}`} alt="user" width={32} height={32} />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--bg-card)] flex items-center justify-center text-[10px] font-black text-[var(--text-tertiary)]">
              +{Math.floor(res.reviews / 10)}
            </div>
          </div>
          
          <button 
            onClick={() => onBook(res)}
            className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Book Table
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Booking Modal ─── */
function BookingModal({ res, onClose }: { res: typeof dineoutRestaurants[0], onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("2026-05-15");
  const [time, setTime] = useState("19:00");

  const handleBooking = () => {
    setStep(2);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[var(--bg-card)] w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-3xl border border-[var(--border-light)]"
      >
        {step === 1 ? (
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[var(--text-primary)]">Reserve a Table</h2>
              <button onClick={onClose} className="p-2 hover:bg-[var(--bg-elevated)] rounded-full transition-colors">
                <ChevronRight className="rotate-90" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8 p-4 bg-[var(--bg-elevated)] rounded-2xl">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image src={res.image} alt={res.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-black text-[var(--text-primary)]">{res.name}</h3>
                <p className="text-xs font-bold text-[var(--text-tertiary)]">{res.location}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-3 block">Number of Guests</label>
                <div className="flex gap-2">
                  {[2, 4, 6, 8, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setGuests(num)}
                      className={cn(
                        "flex-1 py-3 rounded-xl text-sm font-black transition-all border",
                        guests === num
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-orange-500/50"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-3 block">Date</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] p-3 rounded-xl text-sm font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)] mb-3 block">Time</label>
                  <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] p-3 rounded-xl text-sm font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleBooking}
              className="w-full mt-10 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-3"
            >
              Confirm Reservation <Sparkles size={18} fill="currentColor" />
            </button>
          </div>
        ) : (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Star size={40} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-black text-[var(--text-primary)]">Booking Confirmed!</h2>
            <p className="text-[var(--text-secondary)] font-bold">
              Your table for {guests} at {res.name} is reserved for {date} at {time}.
            </p>
            <div className="pt-4">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Redirecting you back...</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function DineoutPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [bookingRes, setBookingRes] = useState<typeof dineoutRestaurants[0] | null>(null);

  const filteredRestaurants = useMemo(() => {
    let items = [...dineoutRestaurants];
    if (selectedCategory) {
      items = items.filter((r) => r.category === selectedCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
      );
    }
    return items;
  }, [selectedCategory, search]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Booking Modal */}
      <AnimatePresence>
        {bookingRes && (
          <BookingModal res={bookingRes} onClose={() => setBookingRes(null)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600" 
          alt="Dineout Hero" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--bg)]" />
        
        <div className="container-app relative z-10 text-center space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-bold mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">
                <Sparkles size={16} fill="currentColor" /> Premium Dining Experience
             </div>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none">
               DINEOUT <span className="text-orange-500">EXCLUSIVES</span>
             </h1>
             <p className="text-xl md:text-2xl font-bold text-white/70 max-w-2xl mx-auto">
               Book tables at the finest restaurants and save up to 50% on your bill.
             </p>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 pl-16 pr-8 rounded-2xl bg-white/10 backdrop-blur-2xl text-white text-lg font-bold border border-white/10 outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white/20 transition-all placeholder:text-white/30"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-app -mt-20 relative z-20 pb-32">
        {/* Category Carousel */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "flex-shrink-0 px-8 py-4 rounded-2xl text-sm font-black transition-all border flex items-center gap-3 shadow-xl",
              !selectedCategory
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-orange-500/50"
            )}
          >
             🍴 All Places
          </button>
          {dineoutCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "flex-shrink-0 px-8 py-4 rounded-2xl text-sm font-black transition-all border flex items-center gap-3 shadow-xl",
                selectedCategory === cat.id
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-orange-500/50"
              )}
            >
              <span className="text-xl">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filters & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                {selectedCategory ? dineoutCategories.find(c => c.id === selectedCategory)?.name : "Best Restaurants Near You"}
              </h2>
              <p className="text-[var(--text-secondary)] font-bold mt-2">Handpicked places for a perfect dining experience.</p>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="h-12 px-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-light)] text-xs font-black flex items-center gap-2 hover:bg-[var(--bg-card)] transition-all">
                <Filter size={16} /> Filters
              </button>
              <select className="h-12 px-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-light)] text-xs font-black outline-none cursor-pointer">
                <option>Most Popular</option>
                <option>Rating: High to Low</option>
                <option>Cost: Low to High</option>
                <option>Distance</option>
              </select>
           </div>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredRestaurants.map((res) => (
              <RestaurantCard key={res.id} res={res} onBook={setBookingRes} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-24 h-24 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
              <Utensils size={40} className="text-[var(--text-tertiary)] opacity-20" />
            </div>
            <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2">No restaurants found</h3>
            <p className="text-[var(--text-secondary)]">Try searching for something else or browse different categories.</p>
          </div>
        )}

        {/* Table Booking Banner */}
        <section className="mt-32">
           <div className="relative bg-[#02060C] rounded-[3rem] p-12 md:p-20 overflow-hidden text-white flex flex-col lg:flex-row items-center gap-16 shadow-3xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 blur-[120px] rounded-full translate-x-1/2" />
              
              <div className="relative z-10 flex-1 space-y-8">
                 <h2 className="text-4xl md:text-6xl font-black leading-tight">
                    Hosting a party? <br />
                    <span className="text-orange-500">Book in bulk & save.</span>
                 </h2>
                 <p className="text-xl text-white/50 font-medium max-w-xl">
                   Special corporate discounts and group booking offers for parties of 10 or more.
                 </p>
                 
                 <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                       <Calendar className="text-orange-500" />
                       <div className="text-left">
                          <p className="text-[10px] font-black uppercase text-white/30">Reservations</p>
                          <p className="text-sm font-black">24/7 Availability</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                       <Users className="text-orange-500" />
                       <div className="text-left">
                          <p className="text-[10px] font-black uppercase text-white/30">Bulk Booking</p>
                          <p className="text-sm font-black">Up to 100 Guests</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="relative z-10 w-full lg:w-[400px] aspect-square rounded-3xl overflow-hidden shadow-2xl">
                 <Image src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600" alt="Party" fill className="object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                 <div className="absolute bottom-8 left-8">
                    <button className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-orange-500 transition-all">
                       Enquire Now
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}

