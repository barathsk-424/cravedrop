"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, Clock, Zap, Plus, Minus, Star,
  ChevronRight, Loader2, Truck, Shield, Percent, ArrowLeft
} from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

/* ─── Instamart Categories ─── */
const instamartCategories = [
  { id: "vegetables", name: "Fresh Vegetables", icon: "🥦", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop" },
  { id: "fruits", name: "Fresh Fruits", icon: "🍎", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop" },
  { id: "dairy", name: "Dairy & Eggs", icon: "🥛", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop" },
  { id: "beverages", name: "Cold Drinks & Juices", icon: "🥤", image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&auto=format&fit=crop" },
  { id: "snacks", name: "Snacks & Munchies", icon: "🍿", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&auto=format&fit=crop" },
  { id: "staples", name: "Rice, Atta & Dals", icon: "🌾", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop" },
  { id: "household", name: "Household Essentials", icon: "🧹", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&auto=format&fit=crop" },
  { id: "personal", name: "Personal Care", icon: "🧴", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop" },
  { id: "bakery", name: "Bakery & Breads", icon: "🍞", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop" },
  { id: "masala", name: "Masalas & Spices", icon: "🌶️", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop" },
];

/* ─── Instamart Products ─── */
const instamartProducts: InstamartProduct[] = [
  // Fresh Vegetables
  { id: "v1", name: "Fresh Tomatoes", category: "vegetables", price: 40, discountPrice: 32, unit: "500g", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },
  { id: "v2", name: "Onion", category: "vegetables", price: 35, discountPrice: 28, unit: "1 kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop", rating: 4.3, isVeg: true },
  { id: "v3", name: "Potato", category: "vegetables", price: 30, discountPrice: 24, unit: "1 kg", image: "https://images.unsplash.com/photo-1518977676601-b53f82ber67?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },
  { id: "v4", name: "Green Capsicum", category: "vegetables", price: 45, unit: "250g", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop", rating: 4.2, isVeg: true },
  { id: "v5", name: "Carrot", category: "vegetables", price: 38, discountPrice: 30, unit: "500g", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&auto=format&fit=crop", rating: 4.4, isVeg: true },

  // Fresh Fruits
  { id: "f1", name: "Banana — Robusta", category: "fruits", price: 45, discountPrice: 38, unit: "1 dozen", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop", rating: 4.7, isVeg: true },
  { id: "f2", name: "Apple — Shimla", category: "fruits", price: 180, discountPrice: 149, unit: "1 kg", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },
  { id: "f3", name: "Watermelon", category: "fruits", price: 50, discountPrice: 39, unit: "1 pc", image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },
  { id: "f4", name: "Orange — Nagpur", category: "fruits", price: 120, unit: "1 kg", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&auto=format&fit=crop", rating: 4.4, isVeg: true },

  // Dairy & Eggs
  { id: "d1", name: "Amul Toned Milk", category: "dairy", price: 32, unit: "500 ml", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop", rating: 4.8, isVeg: true },
  { id: "d2", name: "Farm Fresh Eggs", category: "dairy", price: 85, discountPrice: 72, unit: "12 pcs", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&auto=format&fit=crop", rating: 4.5, isVeg: false },
  { id: "d3", name: "Amul Butter", category: "dairy", price: 56, unit: "100g", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop", rating: 4.7, isVeg: true },
  { id: "d4", name: "Fresh Paneer", category: "dairy", price: 90, discountPrice: 79, unit: "200g", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },
  { id: "d5", name: "Curd — Plain", category: "dairy", price: 35, unit: "400g", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop", rating: 4.4, isVeg: true },

  // Cold Drinks & Juices
  { id: "b1", name: "Coca-Cola", category: "beverages", price: 40, discountPrice: 35, unit: "750 ml", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&auto=format&fit=crop", rating: 4.3, isVeg: true },
  { id: "b2", name: "Tropicana Orange Juice", category: "beverages", price: 90, discountPrice: 75, unit: "1 L", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },
  { id: "b3", name: "Sprite", category: "beverages", price: 40, unit: "750 ml", image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&auto=format&fit=crop", rating: 4.2, isVeg: true },
  { id: "b4", name: "Bisleri Water", category: "beverages", price: 20, unit: "1 L", image: "https://images.unsplash.com/photo-1560023907-5f339617ea55?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },

  // Snacks & Munchies
  { id: "s1", name: "Lay's Classic Salted", category: "snacks", price: 20, unit: "52g", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop", rating: 4.4, isVeg: true },
  { id: "s2", name: "Haldiram's Namkeen", category: "snacks", price: 55, discountPrice: 45, unit: "200g", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },
  { id: "s3", name: "Oreo Biscuits", category: "snacks", price: 30, unit: "120g", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },
  { id: "s4", name: "Kurkure Masala Munch", category: "snacks", price: 20, unit: "80g", image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400&auto=format&fit=crop", rating: 4.3, isVeg: true },

  // Rice, Atta & Dals
  { id: "st1", name: "India Gate Basmati Rice", category: "staples", price: 320, discountPrice: 279, unit: "5 kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop", rating: 4.7, isVeg: true },
  { id: "st2", name: "Aashirvaad Whole Wheat Atta", category: "staples", price: 260, discountPrice: 229, unit: "5 kg", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },
  { id: "st3", name: "Toor Dal", category: "staples", price: 145, discountPrice: 125, unit: "1 kg", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },

  // Household Essentials
  { id: "h1", name: "Vim Dishwash Gel", category: "household", price: 99, discountPrice: 85, unit: "500 ml", image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&auto=format&fit=crop", rating: 4.4, isVeg: true },
  { id: "h2", name: "Surf Excel Detergent", category: "household", price: 195, discountPrice: 169, unit: "1 kg", image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },
  { id: "h3", name: "Harpic Toilet Cleaner", category: "household", price: 85, unit: "500 ml", image: "https://images.unsplash.com/photo-1584813539929-b1a462add8f0?w=400&auto=format&fit=crop", rating: 4.3, isVeg: true },

  // Personal Care
  { id: "p1", name: "Dove Soap Bar", category: "personal", price: 55, discountPrice: 45, unit: "100g", image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },
  { id: "p2", name: "Colgate MaxFresh", category: "personal", price: 95, discountPrice: 82, unit: "150g", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop", rating: 4.4, isVeg: true },

  // Bakery & Breads
  { id: "bk1", name: "Britannia White Bread", category: "bakery", price: 40, unit: "400g", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop", rating: 4.3, isVeg: true },
  { id: "bk2", name: "Pav Buns", category: "bakery", price: 30, unit: "6 pcs", image: "https://images.unsplash.com/photo-1586444248879-bc604bc77dba?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },

  // Masalas & Spices
  { id: "m1", name: "MDH Chana Masala", category: "masala", price: 65, discountPrice: 55, unit: "100g", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop", rating: 4.6, isVeg: true },
  { id: "m2", name: "Everest Turmeric Powder", category: "masala", price: 45, unit: "100g", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&auto=format&fit=crop", rating: 4.5, isVeg: true },
];

interface InstamartProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  unit: string;
  image: string;
  rating: number;
  isVeg: boolean;
}

/* ─── Product Card ─── */
function GroceryCard({ product }: { product: InstamartProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      discount_price: product.discountPrice ?? product.price,
      is_veg: product.isVeg,
      category_id: product.category,
      description: product.unit,
      is_available: true,
      stock_quantity: -1,
      preparation_time: "10 mins",
      rating_avg: product.rating,
      rating_count: 0,
      created_at: "",
      updated_at: "",
      images: [{ id: "1", food_id: product.id, image_url: product.image, is_primary: true, sort_order: 0 }],
    } as any, 1, []);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[var(--bg-elevated)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hasDiscount && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--primary)] text-white text-[10px] font-black rounded-lg uppercase">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Star size={11} className="text-[var(--accent)]" fill="currentColor" />
          <span className="text-[11px] font-bold text-[var(--text-tertiary)]">{product.rating}</span>
        </div>
        <h3 className="text-sm font-black text-[var(--text-primary)] line-clamp-2 leading-tight mb-1">{product.name}</h3>
        <p className="text-[11px] font-bold text-[var(--text-tertiary)] mb-3">{product.unit}</p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-sm font-black text-[var(--text-primary)]">
              {formatPrice(product.discountPrice ?? product.price)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-[var(--text-tertiary)] line-through ml-1.5">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-1.5 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary-50)] text-[var(--primary)] text-xs font-black uppercase tracking-wider hover:bg-[var(--primary)] hover:text-white transition-all active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function InstamartPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    let items = [...instamartProducts];

    if (selectedCategory) {
      items = items.filter((p) => p.category === selectedCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    return items;
  }, [selectedCategory, search]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, InstamartProduct[]> = {};
    filteredProducts.forEach((p) => {
      const cat = instamartCategories.find((c) => c.id === p.category);
      const catName = cat?.name || "Other";
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(p);
    });
    return groups;
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="container-app py-12 md:py-16 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-bold mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/20 text-xs font-black text-white uppercase tracking-widest mb-4">
                <Zap size={14} fill="currentColor" /> Delivery in 10 minutes
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">Instamart</h1>
              <p className="text-white/70 font-bold text-lg">Groceries & essentials delivered at lightning speed</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-white/80">
                <Truck size={18} />
                <span className="text-sm font-bold">Free delivery over ₹149</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Shield size={18} />
                <span className="text-sm font-bold">Best prices guaranteed</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-xl relative">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <input
              type="text"
              placeholder="Search for groceries, essentials, snacks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white text-sm font-bold text-gray-900 border-none outline-none shadow-xl placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="container-app py-8 border-b border-[var(--border-light)]">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-black transition-all border",
              !selectedCategory
                ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-emerald-400"
            )}
          >
            All Items
          </button>
          {instamartCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-black transition-all border flex items-center gap-2",
                selectedCategory === cat.id
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-emerald-400"
              )}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="container-app py-12 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-60 shrink-0 sticky top-32 h-fit space-y-1 border-r border-[var(--border-light)] pr-6">
          <h4 className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-6">Categories</h4>
          {instamartCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-3 group",
                selectedCategory === cat.id
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-[var(--text-secondary)] hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10"
              )}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {Object.keys(groupedProducts).length > 0 ? (
            <div className="space-y-14 pb-32">
              {Object.entries(groupedProducts).map(([catName, items]) => (
                <section key={catName}>
                  <div className="flex items-center gap-4 mb-6 sticky top-24 bg-[var(--bg)]/80 backdrop-blur-md py-3 z-20 border-b border-[var(--border-light)]">
                    <h2 className="text-xl font-black text-[var(--text-primary)]">{catName}</h2>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest dark:bg-emerald-900/20 dark:text-emerald-400">
                      {items.length} Items
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {items.map((product) => (
                      <GroceryCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-[var(--text-tertiary)]" />
              </div>
              <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">No products found</h3>
              <p className="text-[var(--text-secondary)]">Try adjusting your search or browse categories.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
