import Link from "next/link";
import { Zap, ChevronRight } from "lucide-react";
import { FLASH_DEALS_DATA } from "@/data/home-data";
import { ProductCard } from "./product-card";

// <======< Flash Deals Section Component >======>
export default function FlashDeals() {
  return (
    <section className="space-y-4">
      <div className="pb-3 border-b border-slate-200/70 relative">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F67D1D] fill-[#F67D1D]" />
              <span>Flash Deals</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Top-rated marketplace picks at exclusive discounts</p>
          </div>

          <Link href="/deals" className="text-xs sm:text-sm font-medium text-[#F67D1D] hover:underline flex items-center gap-1 shrink-0 pb-0.5">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-[#F67D1D] rounded-full" />
      </div>

      {/* 5-Column Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {FLASH_DEALS_DATA.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
