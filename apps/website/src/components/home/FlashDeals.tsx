import React from "react";
import Link from "next/link";
import { ChevronRight, Star, Heart, Zap, ShieldCheck, ShoppingCart } from "lucide-react";

const PRODUCTS = [
  {
    title: "Wireless Earbuds",
    price: 2999,
    origPrice: 3899,
    discount: "-25%",
    rating: 4.7,
    reviews: 124,
    seller: "Tech World",
    image: "/home/products/airpods.avif",
  },
  {
    title: "Smart Watch",
    price: 7999,
    origPrice: 9999,
    discount: "-30%",
    rating: 4.6,
    reviews: 98,
    seller: "Gadget Hub",
    image: "/home/products/smartwatch.avif",
  },
  {
    title: "Running Shoes",
    price: 4199,
    origPrice: 5999,
    discount: "-30%",
    rating: 4.5,
    reviews: 76,
    seller: "Fashion Point",
    image: "/home/products/shoes.avif",
  },
  {
    title: "Electric Kettle",
    price: 3499,
    origPrice: 4499,
    discount: "-20%",
    rating: 4.8,
    reviews: 112,
    seller: "Home Essentials",
    image: "/home/products/kettle.avif",
  },
  {
    title: "Laptop Backpack",
    price: 3499,
    origPrice: 5399,
    discount: "-35%",
    rating: 4.6,
    reviews: 89,
    seller: "Style Hub",
    image: "/home/products/backpack.avif",
  },
];

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
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Limited time offers. Don&apos;t miss out!</p>
          </div>

          <Link href="/flash-deals" className="text-xs sm:text-sm font-medium text-[#F67D1D] hover:underline flex items-center gap-1 shrink-0 pb-0.5">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-[#F67D1D] rounded-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {PRODUCTS.map((product, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group">
            {/* Top Image Container with transparent product cutout */}
            <div className="relative aspect-10/9 w-full bg-[#F8F9FA] overflow-hidden flex items-center justify-center p-4 sm:p-5">
              {/* Floating Discount Badge */}
              <span className="absolute top-2.5 left-2.5 bg-[#F67D1D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md z-10 shadow-2xs leading-tight">{product.discount}</span>

              {/* Floating Wishlist Button */}
              <button type="button" aria-label="Add to wishlist" className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500 transition-colors p-1 z-10">
                <Heart className="w-4 h-4" />
              </button>

              <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-md" />
            </div>

            {/* Bottom Content Area */}
            <div className="p-3 pt-2 flex flex-col justify-between flex-1">
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">{product.title}</h3>

                {/* Rating & Review Count */}
                <div className="flex items-center gap-1 text-[11px]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-700">{product.rating}</span>
                  <span className="text-slate-400">({product.reviews})</span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-1.5 pt-0.5">
                  <span className="text-xs sm:text-sm font-bold text-[#F67D1D]">Rs. {product.price.toLocaleString()}</span>
                  <span className="text-[11px] text-slate-400 line-through">Rs. {product.origPrice.toLocaleString()}</span>
                </div>

                {/* Seller Row */}
                <div className="flex items-center gap-1.5 pt-2 text-[11px]">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-700 shrink-0">{product.seller.charAt(0)}</div>
                  <span className="font-normal text-black truncate">{product.seller}</span>
                  <ShieldCheck className="w-3.5 h-3.5 fill-blue-500 text-white shrink-0" />
                </div>
              </div>

              {/* Add to Cart Button */}
              <button type="button" className="w-full mt-3 py-1.5 px-2 rounded-lg bg-[#F67D1D] hover:bg-[#e0650e] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
