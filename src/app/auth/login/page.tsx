"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ChefHat, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] relative overflow-hidden p-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-[var(--primary)] rounded-full blur-[150px] opacity-10" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[var(--secondary)] rounded-full blur-[150px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Brand Showcase */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-[2rem] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-2xl mb-6 group"
          >
            <ChefHat size={48} className="text-white group-hover:scale-110 transition-transform" />
          </motion.div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] font-[family-name:var(--font-poppins)] uppercase tracking-tighter">
            Royal Access
          </h1>
          <p className="text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-[0.3em] mt-2">
            Login to your Culinary Haven
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[var(--bg-card)]/80 backdrop-blur-2xl rounded-[3rem] p-10 shadow-[var(--shadow-xl)] border border-[var(--glass-border)]">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center uppercase tracking-widest">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] ml-1">
                Identity / Email
              </label>
              <div className="relative group">
                <Mail
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-[var(--primary)] transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@haven.com"
                  required
                  className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[var(--bg-elevated)] border border-transparent focus:border-[var(--primary)]/30 text-[var(--text-primary)] font-bold placeholder:text-[var(--text-tertiary)]/50 text-base shadow-inner focus:bg-[var(--bg-card)] transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                <label className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] ml-1">
                  Secret Key
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-[var(--primary)] transition-colors"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-16 pl-14 pr-14 rounded-2xl bg-[var(--bg-elevated)] border border-transparent focus:border-[var(--primary)]/30 text-[var(--text-primary)] font-bold placeholder:text-[var(--text-tertiary)]/50 text-base shadow-inner focus:bg-[var(--bg-card)] transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-2xl bg-[var(--primary)] text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-[var(--primary-dark)] hover:scale-[1.02] transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer mt-8"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={18} strokeWidth={3} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-[var(--glass-border)]" />
            <span className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em]">Social Connect</span>
            <div className="flex-1 h-px bg-[var(--glass-border)]" />
          </div>

          {/* Social Login */}
          <button className="group w-full h-16 rounded-2xl border-2 border-[var(--glass-border)] bg-[var(--bg-card)] text-[var(--text-primary)] font-black text-[10px] uppercase tracking-[0.2em] hover:border-[var(--primary)] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-95">
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.2em] mt-10">
            First time at the haven?{" "}
            <Link
              href="/auth/register"
              className="text-[var(--primary)] hover:scale-110 inline-block transition-transform ml-1"
            >
              Request Access
            </Link>
          </p>
        </div>

        {/* Guest Action */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="text-[10px] font-black text-[var(--text-tertiary)] uppercase tracking-[0.4em] hover:text-[var(--primary)] transition-colors"
          >
            ← Back to Guest Lounge
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
