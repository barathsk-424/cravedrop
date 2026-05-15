"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronRight, 
  Info,
  ShieldCheck,
  CreditCard,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "General",
    icon: <Info size={20} />,
    questions: [
      {
        q: "What is CraveDrop?",
        a: "CraveDrop is a premium food and grocery delivery platform that connects you with the best restaurants and stores in your city, delivering extraordinary flavors right to your doorstep."
      },
      {
        q: "How do I place an order?",
        a: "Simply browse our categories or search for your favorite restaurant, add items to your cart, and proceed to checkout. Choose your delivery address and payment method to finalize the order."
      }
    ]
  },
  {
    category: "Orders & Delivery",
    icon: <Truck size={20} />,
    questions: [
      {
        q: "How can I track my order?",
        a: "Once your order is confirmed, you can track it in real-time through the 'Orders' section in your profile. You'll see the status from preparation to delivery."
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 60 seconds of placement. After that, cancellation depends on whether the restaurant has started preparing your food."
      }
    ]
  },
  {
    category: "Payments",
    icon: <CreditCard size={20} />,
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. Cash on delivery is also available for select locations."
      },
      {
        q: "My payment failed but money was debited.",
        a: "Don't worry! In case of payment failures where money is debited, the amount is usually refunded automatically within 3-5 business days. Contact support if it takes longer."
      }
    ]
  },
  {
    category: "Safety & Privacy",
    icon: <ShieldCheck size={20} />,
    questions: [
      {
        q: "Is my personal data safe?",
        a: "We take your privacy seriously. All your personal information and payment details are encrypted and stored securely following industry-standard protocols."
      }
    ]
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-28 pb-32">
      <div className="container-app">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-3xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mx-auto mb-8"
          >
            <HelpCircle size={40} strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-tight tracking-tight mb-6"
          >
            How can we <span className="text-[var(--primary)]">help?</span>
          </motion.h1>
          
          {/* Search Bar */}
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-[var(--primary)] transition-colors" />
            <input 
              type="text"
              placeholder="Search for topics, orders, or issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 md:h-20 pl-16 pr-8 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border)] focus:border-[var(--primary)] text-lg font-bold text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] shadow-xl transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-6">Categories</h3>
            <div className="flex flex-col gap-2">
              {faqs.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => {
                    setActiveCategory(cat.category);
                    setOpenIndex(0);
                  }}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-left font-black tracking-tight",
                    activeCategory === cat.category 
                      ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 translate-x-2" 
                      : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                  )}
                >
                  {cat.icon}
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark,var(--primary))] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle size={120} />
               </div>
               <h4 className="text-xl font-black mb-3 relative z-10">Still need help?</h4>
               <p className="text-white/80 text-sm font-bold mb-6 relative z-10 leading-relaxed">Our support team is available 24/7 to assist you.</p>
               <button className="w-full py-4 rounded-2xl bg-white text-[var(--primary)] font-black text-sm tracking-wide shadow-xl hover:bg-gray-100 transition-all relative z-10">
                  Chat With Us
               </button>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-8 flex items-center gap-3">
              {faqs.find(f => f.category === activeCategory)?.icon}
              {activeCategory} FAQs
            </h2>

            <div className="space-y-4">
              {filteredFaqs.find(f => f.category === activeCategory)?.questions.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[var(--bg-elevated)] transition-all"
                  >
                    <span className="text-lg font-black text-[var(--text-primary)] pr-8">{item.q}</span>
                    <ChevronDown 
                      className={cn(
                        "text-[var(--primary)] transition-transform duration-300 shrink-0",
                        openIndex === idx ? "rotate-180" : ""
                      )} 
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-8 text-[var(--text-secondary)] font-medium leading-relaxed">
                          <div className="w-full h-px bg-[var(--border)] mb-6 opacity-50" />
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Support Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
               <div className="bg-[var(--bg-card)] p-8 rounded-[2rem] border border-[var(--border)] group hover:border-[var(--primary)]/50 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                     <Mail size={24} />
                  </div>
                  <h4 className="text-xl font-black text-[var(--text-primary)] mb-2">Email Support</h4>
                  <p className="text-[var(--text-tertiary)] font-bold text-sm mb-6">Send us an email and we'll get back to you within 24 hours.</p>
                  <a href="mailto:support@cravedrop.com" className="text-[var(--primary)] font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                     support@cravedrop.com <ChevronRight size={16} />
                  </a>
               </div>

               <div className="bg-[var(--bg-card)] p-8 rounded-[2rem] border border-[var(--border)] group hover:border-[var(--primary)]/50 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                     <Phone size={24} />
                  </div>
                  <h4 className="text-xl font-black text-[var(--text-primary)] mb-2">Call Support</h4>
                  <p className="text-[var(--text-tertiary)] font-bold text-sm mb-6">Speak directly with our customer happiness team.</p>
                  <a href="tel:+1234567890" className="text-[var(--primary)] font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                     +1 (234) 567-890 <ChevronRight size={16} />
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
