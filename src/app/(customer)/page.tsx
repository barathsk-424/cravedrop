import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight,
  Flame,
  Star
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { CategorySlider } from "@/components/home/CategorySlider";
import { getCategories, getFeaturedFoods } from "@/lib/data-access";

export default async function HomePage() {
  const categories = await getCategories();
  const foods = await getFeaturedFoods();

  return (
    <div className="bg-[var(--bg)] flex flex-col gap-20 sm:gap-24 md:gap-32 lg:gap-40 pb-24 md:pb-32">
      <Hero />
      <ServiceGrid />
      <CategorySlider categories={categories} foods={foods} />
      <InstamartSlider />
      <DineoutSection />
      <AppBanner />
    </div>
  );
}

/* ─── Shared Components ─── */
function ServiceGrid() {
  return (
    <section className="container-app -mt-24 md:-mt-32 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <ServiceCard 
          title="FOOD DELIVERY"
          subtitle="BEST RESTAURANTS"
          offer="UPTO 60% OFF"
          image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
          href="/menu"
        />
        <ServiceCard 
          title="INSTAMART"
          subtitle="INSTANT GROCERY"
          offer="UPTO 50% OFF"
          image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop"
          href="/instamart"
        />
        <ServiceCard 
          title="DINEOUT"
          subtitle="EAT OUT & SAVE"
          offer="UPTO 40% OFF"
          image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop"
          href="/dineout"
        />
      </div>
    </section>
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

function ServiceCard({ title, subtitle, offer, image, href }: { title: string, subtitle: string, offer: string, image: string, href: string }) {
  return (
    <Link href={href} className="group relative rounded-[3rem] p-8 md:p-10 text-left overflow-hidden shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 flex flex-col justify-between h-[360px] md:h-[400px] border border-white/10 perspective-1000">
      <div className="tilt-3d h-full flex flex-col justify-between">
        <div className="absolute inset-0 w-full h-full tilt-3d-image">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 tilt-3d-content">
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{title}</h3>
          <p className="text-[13px] font-bold text-gray-300 mt-1 uppercase tracking-wider">{subtitle}</p>
          <p className="text-[11px] font-black text-white mt-4 uppercase tracking-tighter bg-[var(--primary)] inline-block px-3 py-1 rounded-lg shadow-lg">{offer}</p>
        </div>
        
        <div className="mt-8 relative z-10 tilt-3d-content">
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <ArrowRight size={20} strokeWidth={3} />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Instamart Slider (Static for now) ─── */
const groceryCategories = [
  { name: "Fresh Vegetables", image: "/images/3d/vegetables.png" },
  { name: "Fresh Fruits", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop" },
  { name: "Dairy, Bread and Eggs", image: "/images/3d/dairy.png" },
  { name: "Rice, Atta and Dals", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop" },
  { name: "Masalas and Dry Fruits", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop" },
  { name: "Oils and Ghee", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop" },
];

function InstamartSlider() {
  return (
    <section className="container-app">
      <div className="flex items-end justify-between mb-10 md:mb-14 gap-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight max-w-[80%]">Shop groceries on Mart</h2>
        <div className="flex gap-3 pb-1 md:pb-2">
          <SliderButton icon={<ArrowRight className="rotate-180" size={20} />} />
          <SliderButton icon={<ArrowRight size={20} />} />
        </div>
      </div>

      <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-6">
        {groceryCategories.map((cat, i) => (
          <Link key={i} href="/instamart" className="flex-shrink-0 group flex flex-col items-center gap-5 w-[140px] md:w-[180px] perspective-1000">
            <div className="w-full aspect-[4/5] rounded-[2.5rem] bg-[var(--bg-elevated)] overflow-hidden relative border border-[var(--border-light)] transition-all duration-300 tilt-3d">
              <div className="absolute inset-0 p-6 tilt-3d-content">
                <Image src={cat.image} alt={cat.name} fill className="object-contain p-8 tilt-3d-image" />
              </div>
            </div>
            <span className="text-[13px] md:text-sm font-black text-[var(--text-secondary)] text-center leading-tight tracking-tight px-1 group-hover:text-[var(--text-primary)] transition-all group-hover:translate-y-1">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Dineout Section ─── */
const dineoutRestaurants = [
  { name: "Amora", rating: 4.3, cuisines: "Continental • Italian", location: "Anna Nagar, Chennai", price: 1000, distance: "7.5 km", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop" },
  { name: "Rasoee Veg", rating: 4.0, cuisines: "North Indian • Chinese", location: "George Town, Chennai", price: 400, distance: "0.8 km", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop" },
  { name: "Dosa.In", rating: 5.0, cuisines: "South Indian • Chinese", location: "George Town, Chennai", price: 250, distance: "0.9 km", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop" },
  { name: "The Grill House", rating: 4.5, cuisines: "Continental • Grill", location: "Teynampet, Chennai", price: 1200, distance: "3.2 km", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop" },
];

function DineoutSection() {
  return (
    <section className="container-app">
      <div className="flex items-end justify-between mb-10 md:mb-14 gap-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight max-w-[80%]">Discover best restaurants on Dineout</h2>
        <div className="flex gap-3 pb-1 md:pb-2">
          <SliderButton icon={<ArrowRight className="rotate-180" size={20} />} />
          <SliderButton icon={<ArrowRight size={20} />} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {dineoutRestaurants.map((res, i) => (
          <div 
            key={i}
            className="group cursor-pointer perspective-1000"
          >
            <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5 shadow-sm border border-[var(--border-light)] tilt-3d">
              <Image src={res.image} alt={res.name} fill className="object-cover tilt-3d-image" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded-lg text-xs font-black shadow-lg tilt-3d-content">
                {res.rating} <Star size={10} fill="currentColor" />
              </div>
            </div>
            
            <div className="px-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[17px] font-black text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                  {res.name}
                </h3>
              </div>
              <div className="text-[13px] font-bold text-[var(--text-secondary)] line-clamp-1">
                {res.cuisines}
              </div>
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[var(--text-secondary)]">
                <span>{res.location}</span>
                <span>•</span>
                <span>{res.distance}</span>
              </div>
              <div className="pt-3">
                 <div className="flex items-center gap-1.5 bg-[var(--success-light)] text-[var(--success)] px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider border border-[var(--success)]/10">
                    <span className="w-4 h-4 bg-[var(--success)] text-white rounded-full flex items-center justify-center text-[10px]">%</span>
                    Flat 20% off on pre-booking
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── App Banner ─── */
function AppBanner() {
  return (
    <section className="container-app">
      <div className="relative bg-[#02060C] rounded-[3rem] lg:rounded-[4rem] p-10 md:p-14 lg:p-20 overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-16 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <div className="relative z-10 flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest text-[var(--primary)]">
             <Flame size={14} fill="currentColor" /> CraveDrop App
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight max-w-2xl">
            Get the <br /> <span className="text-[var(--primary)]">CraveDrop App</span> now!
          </h2>
          <p className="text-lg md:text-xl font-bold text-white/50 max-w-xl">
             For best offers and discounts curated specially for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-4 justify-center md:justify-start">
             <div className="bg-[var(--bg-card)] p-3 rounded-2xl shadow-2xl flex items-center gap-4">
                <div className="w-24 h-24 bg-[var(--bg-elevated)] rounded-lg relative overflow-hidden flex items-center justify-center p-2">
                   <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-contain bg-no-repeat bg-center opacity-90 invert-0 dark:invert" />
                </div>
                <div className="pr-4">
                   <p className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Scan to</p>
                   <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-tighter">Download</p>
                </div>
             </div>
             
             <div className="flex gap-4">
                <button className="h-14 px-8 rounded-2xl bg-[#111] border border-white/10 flex items-center gap-3 hover:bg-[#222] transition-all">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={110} height={36} />
                </button>
                <button className="h-14 px-8 rounded-2xl bg-[#111] border border-white/10 flex items-center gap-3 hover:bg-[#222] transition-all">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" width={125} height={36} />
                </button>
             </div>
          </div>
        </div>

         <div className="relative w-full md:w-[450px] aspect-[4/5] md:aspect-square flex items-center justify-center perspective-1000">
            <div className="absolute inset-0 bg-[var(--primary)]/20 blur-[120px] rounded-full scale-125" />
            <div className="relative z-10 w-[280px] h-[580px] bg-[#111] rounded-[3rem] border-[8px] border-white/10 shadow-2xl overflow-hidden tilt-3d">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
               <Image 
                 src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" 
                 alt="App Screenshot" 
                 fill 
                 className="object-cover opacity-80 tilt-3d-image" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
               <div className="absolute bottom-10 left-6 right-6 space-y-2 tilt-3d-content">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
                     <Flame size={24} className="text-white" />
                  </div>
                  <p className="text-2xl font-black text-white">Your favorite <br /> meals, one tap away.</p>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
