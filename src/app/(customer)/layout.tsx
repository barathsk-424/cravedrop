"use client";

import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CartPanel } from "@/components/customer/CartPanel";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
      <CartPanel />
    </>
  );
}
