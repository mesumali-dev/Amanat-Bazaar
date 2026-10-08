import React from "react";
import Navbar from "@/components/layouts/Navbar";
import { HeroBanner, CategoryGrid, FlashDeals, PromoBanners, ProductFeed } from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      {/* 2-Tier Navbar */}
      <Navbar />

      <main className="flex-1 w-full space-y-10 pb-10">
        <HeroBanner />
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <CategoryGrid />
          <FlashDeals />
          <PromoBanners />
          <ProductFeed />
        </div>
      </main>
    </div>
  );
}
