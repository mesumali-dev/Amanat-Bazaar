"use client";

import Link from "next/link";
import { Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { useProductFeed } from "./logic";
import { ProductCard } from "./product-card";

// <======< Product Feed Component (Markup only, state in logic.ts) >======>
export default function ProductFeed() {
  const { products, isLoading, hasMore, observerRef, loadMore } = useProductFeed();

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="pb-3 border-b border-slate-200/70 relative">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">More Products</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Explore our daily curated selections</p>
          </div>

          <Link href="/shop" className="text-xs sm:text-sm font-medium text-[#F67D1D] hover:underline flex items-center gap-1 shrink-0 pb-0.5">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-[#F67D1D] rounded-full" />
      </div>

      {/* Infinite Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Sentinel & Load Indicator */}
      {isLoading || hasMore ? (
        <div ref={observerRef} className="py-6 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="flex items-center gap-2 text-[#F67D1D] font-medium text-xs">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading more products...</span>
            </div>
          ) : (
            <button type="button" onClick={loadMore} className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 text-slate-700 hover:text-[#F67D1D] text-xs font-medium shadow-2xs transition-all">
              <span>Load More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
}
