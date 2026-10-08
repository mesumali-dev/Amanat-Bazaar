import React from "react";
import Link from "next/link";
import { Smartphone, Shirt, Home as HomeIcon, HeartPulse, ShoppingBasket, Dumbbell, Gamepad2, Grid, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { name: "Electronics", icon: Smartphone, bg: "bg-blue-50" },
  { name: "Fashion", icon: Shirt, bg: "bg-amber-50" },
  { name: "Home & Living", icon: HomeIcon, bg: "bg-purple-50" },
  { name: "Beauty & Personal Care", icon: HeartPulse, bg: "bg-pink-50" },
  { name: "Grocery & Food", icon: ShoppingBasket, bg: "bg-emerald-50" },
  { name: "Sports & Outdoors", icon: Dumbbell, bg: "bg-orange-50" },
  { name: "Toys & Games", icon: Gamepad2, bg: "bg-indigo-50" },
  { name: "More Categories", icon: Grid, bg: "bg-slate-100" },
];

export default function CategoryGrid() {
  return (
    <section className="space-y-4">
      <div className="pb-3 border-b border-slate-200/70 relative">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Find your favorite products from our top categories</p>
          </div>

          <Link href="/categories" className="text-xs sm:text-sm font-medium text-[#F67D1D] hover:underline flex items-center gap-1 shrink-0 pb-0.5">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-[#F67D1D] rounded-full" />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i} className="flex flex-col items-center justify-center cursor-pointer group text-center py-1">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${cat.bg} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6 stroke-[1.8] text-black" />
              </div>
              <span className="text-xs font-medium text-slate-700 group-hover:text-[#F67D1D] transition-colors line-clamp-1 w-full">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
