import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// <======< Promo Banners Component >======>
export default function PromoBanners() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="pb-3 border-b border-slate-200/70 relative">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Brand Spotlight</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Featured brand partners and exclusive promotional offers</p>
          </div>

          <Link href="/brands" className="text-xs sm:text-sm font-medium text-[#F67D1D] hover:underline flex items-center gap-1 shrink-0 pb-0.5">
            All Brands <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-[#F67D1D] rounded-full" />
      </div>

      {/* 2-Column Minimalist Promo Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Banner 1: Audio / Tech Brand */}
        <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-amber-50/90 via-orange-50/60 to-orange-100/50 border border-orange-200/70 p-6 sm:p-7 flex items-center justify-between group hover:shadow-md transition-all duration-300">
          {/* Left Content */}
          <div className="space-y-2 max-w-[60%] z-10">
            <span className="text-[11px] font-bold text-[#F67D1D] tracking-wider uppercase">Official Brand Store</span>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Studio Acoustics & Gadgets</h3>

            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Up to 40% OFF <span className="text-slate-400 font-normal">| 1-Year Warranty</span>
            </p>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-0.5">High-fidelity sound engineering with express doorstep delivery.</p>

            <div className="pt-2">
              <Link href="/shop?category=electronics" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F67D1D] hover:bg-[#e0650e] text-white text-xs font-medium shadow-2xs transition-colors">
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center relative">
            <Image src="/home/products/headphones.avif" alt="Studio Acoustics" fill sizes="(max-width: 640px) 144px, 176px" className="object-contain drop-shadow-lg group-hover:scale-108 transition-transform duration-500" />
          </div>
        </div>

        {/* Banner 2: Footwear & Style */}
        <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-blue-50/90 via-sky-50/60 to-indigo-50/50 border border-blue-200/70 p-6 sm:p-7 flex items-center justify-between group hover:shadow-md transition-all duration-300">
          {/* Left Content */}
          <div className="space-y-2 max-w-[60%] z-10">
            <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">Verified Brand Partner</span>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Urban Footwear & Style</h3>

            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Flat 30% OFF <span className="text-slate-400 font-normal">| New Arrivals</span>
            </p>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-0.5">Authentic designer sneakers and lifestyle apparel for daily comfort.</p>

            <div className="pt-2">
              <Link href="/shop?category=fashion" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-medium shadow-2xs transition-colors">
                <span>Explore Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center relative">
            <Image src="/home/products/shoes.avif" alt="Urban Footwear" fill sizes="(max-width: 640px) 144px, 176px" className="object-contain drop-shadow-lg group-hover:scale-108 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
