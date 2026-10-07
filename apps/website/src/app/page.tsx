"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Smartphone, Shirt, Home as HomeIcon, HeartPulse, ShoppingBasket, Dumbbell, Gamepad2, Grid, Star, ShoppingCart, Heart, ArrowRight, Truck, ShieldCheck, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-slate-800">
      {/* 2-Tier Navbar matching reference image */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* HERO BANNER SECTION */}
        <section className="relative rounded-3xl overflow-hidden bg-linear-to-r from-orange-50/80 via-white to-orange-100/60 border border-orange-100/70 p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-block text-[11px] font-bold text-[#F67D1D] uppercase tracking-wider bg-orange-100/80 px-3 py-1 rounded-full">YOUR TRUSTED MARKETPLACE</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#282F3D] tracking-tight leading-tight">
                Quality Products <br />
                <span className="text-[#F67D1D]">at Better Prices</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-md">Everything you need, from top sellers, all in one place.</p>
              <div className="pt-2">
                <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F67D1D] hover:bg-[#e0650e] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all hover:gap-3">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column Product Showcase Image Visual */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="relative w-full max-w-lg aspect-4/3 flex items-center justify-center">
                {/* Background Orange Glow Circle */}
                <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#F67D1D] opacity-90 z-0 translate-x-8"></div>
                {/* Showcase Mockup Image */}
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" alt="Quality Electronics Showcase" className="relative z-10 w-4/5 h-auto object-contain drop-shadow-2xl rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Dots pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F67D1D]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
          </div>
        </section>

        {/* SHOP BY CATEGORY SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">Shop by Category</h2>
              <p className="text-xs text-slate-500">Find your favorite products from our top categories</p>
            </div>
            <Link href="/categories" className="text-xs font-bold text-[#F67D1D] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {[
              { name: "Electronics", icon: Smartphone, bg: "bg-blue-50 text-blue-600" },
              { name: "Fashion", icon: Shirt, bg: "bg-amber-50 text-amber-600" },
              { name: "Home & Living", icon: HomeIcon, bg: "bg-purple-50 text-purple-600" },
              { name: "Beauty & Care", icon: HeartPulse, bg: "bg-pink-50 text-pink-600" },
              { name: "Grocery & Food", icon: ShoppingBasket, bg: "bg-emerald-50 text-emerald-600" },
              { name: "Sports & Outdoors", icon: Dumbbell, bg: "bg-orange-50 text-[#F67D1D]" },
              { name: "Toys & Games", icon: Gamepad2, bg: "bg-indigo-50 text-indigo-600" },
              { name: "More Categories", icon: Grid, bg: "bg-slate-100 text-slate-700" },
            ].map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group text-center">
                  <div className={`w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 stroke-2" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 group-hover:text-[#F67D1D] truncate w-full">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* FLASH DEALS SECTION */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-orange-100 text-[#F67D1D]">
                <span className="font-bold text-xs">⚡</span>
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800">Flash Deals</h2>
                <p className="text-xs text-slate-500">Limited time offers. Don't miss out!</p>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Ends in:</span>
              <div className="flex items-center gap-1 font-bold text-xs">
                <span className="bg-[#F67D1D] text-white px-2 py-1 rounded-md">02</span> :<span className="bg-[#F67D1D] text-white px-2 py-1 rounded-md">14</span> :<span className="bg-[#F67D1D] text-white px-2 py-1 rounded-md">36</span>
              </div>
              <Link href="/flash-deals" className="text-xs font-bold text-[#F67D1D] hover:underline ml-4">
                View All →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Wireless Earbuds Pro",
                price: 2999,
                origPrice: 3999,
                discount: "-25%",
                rating: 4.7,
                reviews: 124,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
              },
              {
                title: "Smart Watch Series 8",
                price: 7999,
                origPrice: 11499,
                discount: "-30%",
                rating: 4.6,
                reviews: 98,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
              },
              {
                title: "Running Shoes (Men)",
                price: 4199,
                origPrice: 5299,
                discount: "-20%",
                rating: 4.5,
                reviews: 76,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
              },
              {
                title: "Food Processor",
                price: 5499,
                origPrice: 6499,
                discount: "-15%",
                rating: 4.8,
                reviews: 112,
                image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=400&q=80",
              },
              {
                title: "Laptop Backpack",
                price: 3499,
                origPrice: 5399,
                discount: "-35%",
                rating: 4.6,
                reviews: 89,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
              },
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative group">
                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-[#F67D1D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full z-10">{product.discount}</span>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 z-10 p-1">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Image */}
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 relative">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-[#F67D1D]">Rs. {product.price.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 line-through">Rs. {product.origPrice.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 block">Free Delivery</span>
                </div>

                <button className="w-full mt-3 py-2 rounded-xl bg-[#F67D1D] hover:bg-[#e0650e] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST BANNER CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-orange-100 p-6 rounded-2xl flex items-center justify-between">
            <div className="space-y-2 max-w-[65%]">
              <div className="p-2 w-9 h-9 rounded-xl bg-orange-100 text-[#F67D1D] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">Fast & Reliable Delivery</h3>
              <p className="text-xs text-slate-500">Get your orders delivered right to your doorstep.</p>
              <button className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Learn More →</button>
            </div>
            <div className="w-28 h-20 bg-orange-100/60 rounded-xl flex items-center justify-center text-3xl">🚚</div>
          </div>

          <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between">
            <div className="space-y-2 max-w-[65%]">
              <div className="p-2 w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">Secure Payments</h3>
              <p className="text-xs text-slate-500">Shop with confidence with multiple payment options.</p>
              <button className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Learn More →</button>
            </div>
            <div className="w-28 h-20 bg-blue-100/60 rounded-xl flex items-center justify-center text-3xl">🛡️</div>
          </div>
        </section>
      </main>

      {/* FOOTER matching reference image */}
      <footer className="mt-16 bg-[#101C2C] text-slate-300 text-xs py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Image src="/logo.svg" alt="Amanat Bazaar Logo" width={160} height={36} className="h-8 w-auto brightness-200 contrast-200" />
              <p className="text-xs text-slate-400">Amanat Bazaar - Your trusted marketplace for authentic quality products.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-white">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/complaints" className="hover:text-white">
                    Complaints
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Customer Service</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/account" className="hover:text-white">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Subscribe to Newsletter</h4>
              <p className="text-xs text-slate-400 mb-3">Get the latest updates and offers.</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <input type="email" placeholder="Your email address" className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#F67D1D]" />
                <button type="submit" className="w-full py-2 rounded-lg bg-[#F67D1D] hover:bg-[#e0650e] text-white font-bold transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>© 2026 Amanat Bazaar. All rights reserved.</span>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-slate-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-400">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
