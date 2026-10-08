"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, ShieldCheck, RotateCcw, Users } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full font-sans">
      {/* 1. TOP VALUE PROPOSITIONS BAR */}
      <div className="bg-[#F8FAFC] border-y border-slate-200/80 py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Feature 1: Fast Delivery */}
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/70 flex items-center justify-center shrink-0 text-slate-800 shadow-2xs">
              <Truck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">Fast Delivery</h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5">Delivered right to your doorstep</p>
            </div>
          </div>

          {/* Feature 2: Secure Payment */}
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/70 flex items-center justify-center shrink-0 text-slate-800 shadow-2xs">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">Secure Payment</h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5">100% secure transactions</p>
            </div>
          </div>

          {/* Feature 3: Easy Returns */}
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/70 flex items-center justify-center shrink-0 text-slate-800 shadow-2xs">
              <RotateCcw className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">Easy Returns</h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5">Within 7 days</p>
            </div>
          </div>

          {/* Feature 4: Trusted Sellers */}
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200/70 flex items-center justify-center shrink-0 text-slate-800 shadow-2xs">
              <Users className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">Trusted Sellers</h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5">Verified and reliable</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT (DARK NAVY) */}
      <div className="bg-[#0B132A] text-slate-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
            {/* Column 1: Brand Info & Socials */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block focus:outline-none">
                <Image src="/logo-white.svg" alt="Amanat Bazaar Logo" width={195} height={44} className="h-10 w-auto object-contain" />
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">Amanat Bazar is your trusted online marketplace connecting you with verified sellers nationwide, offering quality products, unbeatable deals, and reliable service.</p>
              {/* Social Media Links */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#182138] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F67D1D] hover:border-[#F67D1D] transition-all duration-200" aria-label="Facebook">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#182138] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F67D1D] hover:border-[#F67D1D] transition-all duration-200" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#182138] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F67D1D] hover:border-[#F67D1D] transition-all duration-200" aria-label="YouTube">
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#182138] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#F67D1D] hover:border-[#F67D1D] transition-all duration-200" aria-label="TikTok">
                  <FaTiktok className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white text-sm font-semibold tracking-wide">Quick Links</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/best-sellers" className="hover:text-white transition-colors">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/sell" className="hover:text-white transition-colors">
                    Sell on Amanat Bazar
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-white text-sm font-semibold tracking-wide">Customer Service</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li>
                  <Link href="/account" className="hover:text-white transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-white transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/complaints" className="hover:text-white transition-colors">
                    Complaints
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter Subscription */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-white text-sm font-semibold tracking-wide">Subscribe to our newsletter</h3>
              <p className="text-xs sm:text-sm text-slate-400">Get the latest updates and offers.</p>

              {subscribed ? (
                <div className="p-3 bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg animate-in fade-in duration-200">Thank you for subscribing! You will receive our latest updates soon.</div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" required className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#F67D1D] font-normal shadow-xs" />
                  </div>
                  <button type="submit" className="w-full bg-[#F67D1D] hover:bg-[#e0650e] active:scale-[0.99] text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-lg transition-all duration-150 shadow-sm">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 3. BOTTOM SUB-FOOTER / COPYRIGHT BAR */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2025 Amanat Bazar. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-slate-200 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
