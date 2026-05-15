"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { 
  Flame, 
  MapPin,
  ChevronDown,
  Share2,
  Globe,
  Users,
  Camera
} from "lucide-react";
import { SITE_CONFIG } from "@/constants";

export function Footer() {
  const deliveryCities = [
    "Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune", "Kolkata", "Chennai", "Ahmedabad", "Chandigarh", "Jaipur", "Kochi", "Lucknow", "Nagpur", "Indore", "Coimbatore", "Dehradun", "Ludhiana", "Patna", "Surat"
  ];

  const groceryCities = [
    "Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune", "Kolkata", "Chennai", "Ahmedabad", "Chandigarh", "Jaipur"
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border)] pt-16 pb-12">
      <div className="container-app">
        {/* Main Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Copyright */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-2xl bg-[var(--text-secondary)] flex items-center justify-center">
                  <Flame size={22} className="text-[var(--bg)]" strokeWidth={3} />
               </div>
               <span className="text-3xl font-black text-[var(--text-secondary)] tracking-tighter">CraveDrop</span>
            </div>
            <p suppressHydrationWarning className="text-sm font-black text-[var(--text-secondary)] opacity-60">
              © {new Date().getFullYear()} CraveDrop Limited
            </p>
            <div className="flex gap-4 pt-4">
               {[Users, Camera, Share2, Globe].map((Icon, i) => (
                 <Link key={i} href="#" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg)] hover:text-[var(--primary)] transition-all">
                   <Icon size={18} />
                 </Link>
               ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm font-bold text-[var(--text-secondary)]">
              <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">CraveDrop Corporate</Link></li>
              <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Team</Link></li>
              <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">CraveDrop One</Link></li>
              <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">CraveDrop Instamart</Link></li>
              <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">CraveDrop Dineout</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Contact us</h4>
              <ul className="space-y-3 text-sm font-bold text-[var(--text-secondary)]">
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Help & Support</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Partner with us</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Ride with us</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Legal</h4>
              <ul className="space-y-3 text-sm font-bold text-[var(--text-secondary)]">
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Life at CraveDrop */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Life at CraveDrop</h4>
            <ul className="space-y-3 text-sm font-bold text-[var(--text-secondary)]">
               <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Explore With CraveDrop</Link></li>
               <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">CraveDrop News</Link></li>
               <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Snackables</Link></li>
            </ul>
            <div className="pt-8">
               <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-6">Available in:</h4>
               <button 
                  suppressHydrationWarning
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[var(--border)] text-xs font-black text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all"
                >
                  685+ cities <ChevronDown size={14} />
               </button>
            </div>
          </div>
        </div>

        {/* Cities with Food Delivery */}
        <div className="border-t border-[var(--border)] pt-16 mb-20">
          <div className="text-lg font-black text-[var(--text-primary)] mb-10">Cities with food delivery</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
             {deliveryCities.map((city) => (
               <Link key={city} href="#" className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors truncate">
                  Order food online in {city}
               </Link>
             ))}
             <button className="text-sm font-black text-[var(--primary)] flex items-center gap-1 hover:underline">
                Show More <ChevronDown size={14} />
             </button>
          </div>
        </div>

        {/* Cities with Grocery Delivery */}
        <div className="border-t border-[var(--border)] pt-16 mb-20">
          <div className="text-lg font-black text-[var(--text-primary)] mb-10">Cities with grocery delivery</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
             {groceryCities.map((city) => (
               <Link key={city} href="#" className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors truncate">
                  Order grocery delivery in {city}
               </Link>
             ))}
             <button className="text-sm font-black text-[var(--primary)] flex items-center gap-1 hover:underline">
                Show More <ChevronDown size={14} />
             </button>
          </div>
        </div>

        {/* Final Branding & App Info */}
        <div className="border-t border-[var(--border)] pt-12 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="text-2xl font-black text-[var(--text-primary)] text-center md:text-left leading-tight">
                For better experience, download the CraveDrop app now
              </h3>
           </div>
           <div className="flex gap-4">
              <button 
                suppressHydrationWarning
                className="h-14 px-6 rounded-2xl bg-black flex items-center gap-3 hover:scale-105 transition-transform border border-white/10"
              >
                 <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={110} height={36} />
              </button>
              <button 
                suppressHydrationWarning
                className="h-14 px-6 rounded-2xl bg-black flex items-center gap-3 hover:scale-105 transition-transform border border-white/10"
              >
                 <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" width={125} height={36} />
              </button>
           </div>
        </div>
      </div>
    </footer>
  );
}
