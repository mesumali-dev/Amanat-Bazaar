"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Star, Heart, ShieldCheck, ShoppingCart, ChevronRight, ChevronDown, Loader2, LayoutGrid } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  origPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  seller: string;
  image: string;
}

const INITIAL_CATALOG: Product[] = [
  {
    id: "p1",
    title: "Wireless Studio Headphones",
    price: 3499,
    origPrice: 4899,
    discount: "-28%",
    rating: 4.8,
    reviews: 210,
    seller: "Gadget Hub",
    image: "/home/products/headphones.avif",
  },
  {
    id: "p2",
    title: "Classic Polarized Sunglasses",
    price: 1299,
    origPrice: 1999,
    discount: "-35%",
    rating: 4.5,
    reviews: 142,
    seller: "Style Hub",
    image: "/home/products/sunglasses.avif",
  },
  {
    id: "p3",
    title: "Luxury Floral Perfume (100ml)",
    price: 2499,
    origPrice: 3499,
    discount: "-28%",
    rating: 4.7,
    reviews: 96,
    seller: "Beauty Corner",
    image: "/home/products/perfume.avif",
  },
  {
    id: "p4",
    title: "Smart Watch Series 8 Pro",
    price: 7999,
    origPrice: 9999,
    discount: "-20%",
    rating: 4.6,
    reviews: 188,
    seller: "Gadget Hub",
    image: "/home/products/smartwatch.avif",
  },
  {
    id: "p5",
    title: "Flagship Smartphone Pro 256GB",
    price: 149999,
    origPrice: 169999,
    discount: "-12%",
    rating: 4.9,
    reviews: 342,
    seller: "Mobile Zone",
    image: "/home/products/iphone.avif",
  },
  {
    id: "p6",
    title: "Speed Running Athletic Shoes",
    price: 4199,
    origPrice: 5999,
    discount: "-30%",
    rating: 4.5,
    reviews: 76,
    seller: "Fashion Point",
    image: "/home/products/shoes.avif",
  },
  {
    id: "p7",
    title: "Ergonomic Laptop Backpack",
    price: 3499,
    origPrice: 5399,
    discount: "-35%",
    rating: 4.6,
    reviews: 89,
    seller: "Style Hub",
    image: "/home/products/backpack.avif",
  },
  {
    id: "p8",
    title: "Wireless Earbuds with Case",
    price: 2999,
    origPrice: 3899,
    discount: "-25%",
    rating: 4.7,
    reviews: 124,
    seller: "Tech World",
    image: "/home/products/airpods.avif",
  },
  {
    id: "p9",
    title: "Fast Boiling Electric Kettle",
    price: 3499,
    origPrice: 4499,
    discount: "-20%",
    rating: 4.8,
    reviews: 112,
    seller: "Home Essentials",
    image: "/home/products/kettle.avif",
  },
  {
    id: "p10",
    title: "Sport Wireless Bluetooth Pods",
    price: 2699,
    origPrice: 3499,
    discount: "-22%",
    rating: 4.6,
    reviews: 88,
    seller: "Tech World",
    image: "/home/products/airpods.avif",
  },
];

const MORE_PRODUCTS_POOL: Product[] = [
  {
    id: "p11",
    title: "Active Fit Smart Fitness Band",
    price: 3299,
    origPrice: 4299,
    discount: "-23%",
    rating: 4.6,
    reviews: 95,
    seller: "Gadget Hub",
    image: "/home/products/smartwatch.avif",
  },
  {
    id: "p12",
    title: "UV400 Aviator Sunglasses",
    price: 1599,
    origPrice: 2299,
    discount: "-30%",
    rating: 4.7,
    reviews: 160,
    seller: "Style Hub",
    image: "/home/products/sunglasses.avif",
  },
  {
    id: "p13",
    title: "Eau De Parfum Signature Spray",
    price: 3199,
    origPrice: 4199,
    discount: "-24%",
    rating: 4.8,
    reviews: 74,
    seller: "Beauty Corner",
    image: "/home/products/perfume.avif",
  },
  {
    id: "p14",
    title: "Pro Runner Cushion Sneakers",
    price: 4599,
    origPrice: 6299,
    discount: "-27%",
    rating: 4.6,
    reviews: 118,
    seller: "Fashion Point",
    image: "/home/products/shoes.avif",
  },
  {
    id: "p15",
    title: "Water Resistant Travel Backpack",
    price: 3799,
    origPrice: 4999,
    discount: "-24%",
    rating: 4.7,
    reviews: 104,
    seller: "Style Hub",
    image: "/home/products/backpack.avif",
  },
];

export default function ProductFeed() {
  const [products, setProducts] = useState<Product[]>(INITIAL_CATALOG);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadCount, setLoadCount] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      // Append next batch with unique keys
      const nextBatch = MORE_PRODUCTS_POOL.map((item, index) => ({
        ...item,
        id: `${item.id}-load-${loadCount}-${index}`,
      }));

      setProducts((prev) => [...prev, ...nextBatch]);
      setLoadCount((prev) => prev + 1);
      setIsLoading(false);

      // Stop after 3 extra batches to avoid infinite memory growth
      if (loadCount >= 3) {
        setHasMore(false);
      }
    }, 600);
  }, [isLoading, hasMore, loadCount]);

  // Infinite Scroll IntersectionObserver
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="pb-3 border-b border-slate-200/70 relative">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-[#F67D1D]" />
              <span>More Products</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Explore more products from our top sellers</p>
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
          <div key={product.id} className="bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group">
            {/* Top Image Container (Flush with top, left, and right) */}
            <div className="relative aspect-10/9 w-full bg-[#F8F9FA] overflow-hidden flex items-center justify-center p-4 sm:p-5">
              {/* Floating Discount Badge */}
              {product.discount && <span className="absolute top-2.5 left-2.5 bg-[#F67D1D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md z-10 shadow-2xs leading-tight">{product.discount}</span>}

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
