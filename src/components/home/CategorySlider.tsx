"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category, Food } from "@/types";
import { FoodCard } from "@/components/customer/FoodCard";

interface CategorySliderProps {
  categories: Category[];
  foods?: Food[];
}

export function CategorySlider({ categories, foods = [] }: CategorySliderProps) {
  return (
    <section className="container-app">
      <div className="flex items-end justify-between mb-10 md:mb-14 gap-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight max-w-[80%]">Order our best food options</h2>
        <div className="flex gap-3 pb-1 md:pb-2">
          <SliderButton icon={<ChevronLeft size={20} />} />
          <SliderButton icon={<ChevronRight size={20} />} />
        </div>
      </div>

      <div className="flex flex-col gap-16 overflow-hidden">
        {/* Categories */}
        <div className="flex flex-col gap-12">
          <div className="flex gap-10 md:gap-14 overflow-x-auto no-scrollbar pb-2">
            {categories.slice(0, Math.ceil(categories.length / 2)).map((cat) => (
              <CategoryItem key={cat.id} cat={cat} />
            ))}
          </div>
          <div className="flex gap-10 md:gap-14 overflow-x-auto no-scrollbar pb-2">
            {categories.slice(Math.ceil(categories.length / 2)).map((cat) => (
              <CategoryItem key={cat.id} cat={cat} />
            ))}
          </div>
        </div>

        {/* Top Foods Grid/Slider */}
        {foods.length > 0 && (
          <div className="pt-8 border-t border-[var(--border-light)]">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-black text-[var(--text-primary)]">Trending Near You</h3>
               <Link href="/menu" className="text-sm font-black text-[var(--primary)] hover:underline">View All →</Link>
             </div>
             <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
               {foods.map((food, idx) => (
                 <div key={food.id} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] shrink-0 snap-start">
                   <FoodCard food={food} index={idx} />
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryItem({ cat }: { cat: Category }) {
  return (
    <Link href={`/menu?category=${cat.slug}`} className="flex-shrink-0 group flex flex-col items-center gap-5 transition-all duration-300 perspective-1000">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-500 bg-[var(--bg-elevated)] tilt-3d">
        {cat.image_url && (
          <Image src={cat.image_url} alt={cat.name} fill className="object-cover tilt-3d-image" />
        )}
      </div>
      <span className="text-sm font-black text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-all tracking-tight text-center group-hover:translate-y-1">{cat.name}</span>
    </Link>
  );
}

function SliderButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button 
      className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-[var(--border-light)]"
    >
      {icon}
    </button>
  );
}
