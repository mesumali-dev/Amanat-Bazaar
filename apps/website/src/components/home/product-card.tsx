import Image from "next/image";
import { Star, ShieldCheck, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

// <======< Product Card Component (Reusable across FlashDeals & ProductFeed) >======>
export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group">
      {/* Top Image Container with transparent product cutout */}
      <div className="relative aspect-10/9 w-full bg-[#F8F9FA] overflow-hidden flex items-center justify-center p-4 sm:p-5">
        {/* Floating Discount Badge */}
        {product.discount && <span className="absolute top-2.5 left-2.5 bg-[#F67D1D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md z-10 shadow-2xs leading-tight">{product.discount}</span>}

        {/* Floating Wishlist Button */}
        <button type="button" aria-label="Add to wishlist" className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500 transition-colors p-1 z-10">
          <Heart className="w-4 h-4" />
        </button>

        <div className="relative w-full h-full">
          <Image src={product.image} alt={product.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-md" />
        </div>
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
            {product.origPrice && <span className="text-[11px] text-slate-400 line-through">Rs. {product.origPrice.toLocaleString()}</span>}
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
  );
}

export default ProductCard;
