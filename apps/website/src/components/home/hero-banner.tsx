import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// <======< Hero Banner Component >======>
export default function HeroBanner() {
  return (
    <div className="w-full">
      {/* HERO BANNER SECTION */}
      <section className="relative w-full overflow-hidden border-b border-orange-100/80 bg-[#FFF9F5] min-h-95 sm:min-h-110 lg:min-h-120 flex items-center">
        {/* Background Banner Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image src="/home/banner.avif" alt="Amanat Bazaar Banner" fill priority sizes="100vw" className="object-cover object-right pointer-events-none mix-blend-multiply" />
          {/* Responsive Gradient Overlay for Optimal Text Contrast */}
          <div className="absolute inset-0 bg-linear-to-r from-[#FFF9F5] via-[#FFF9F5]/90 to-transparent w-full md:w-3/4 lg:w-3/5 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">
          <div className="max-w-md sm:max-w-lg lg:max-w-xl space-y-4 sm:space-y-5">
            {/* Subheading Tagline */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#F67D1D] rounded-full"></span>
              <span className="text-[#F67D1D] font-bold text-xs sm:text-sm tracking-wider uppercase">AMANAT BAZAAR</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              Behtareen Cheezein <br />
              <span className="text-[#F67D1D]">Behtar Daamon Par</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
              Fashion, Electronics, Home & Living, Beauty, Baby Care <br className="hidden sm:inline" />
              aur aur bhi bohat kuch – sab kuch ek hi jagah.
            </p>

            {/* Shop Now CTA */}
            <div className="pt-2 sm:pt-3">
              <Link href="/shop" className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#F67D1D] hover:bg-[#e0650e] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Shop Now <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
