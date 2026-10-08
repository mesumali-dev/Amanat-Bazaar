"use client";

import { useState, useRef, useEffect } from "react";
import type { Product } from "@/types";
import { INITIAL_FEED_DATA, MORE_FEED_DATA } from "@/data/home-data";

// <======< Custom Hook for Home Product Feed State & Infinite Scroll >======>
export function useProductFeed() {
  const [products, setProducts] = useState<Product[]>(INITIAL_FEED_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadCount, setLoadCount] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // <======< Load More Next Batch (React Compiler handles memoization automatically) >======>
  function loadMore() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      // Append a set of products from the pool
      const newItems = MORE_FEED_DATA.map((item, idx) => ({
        ...item,
        id: `${item.id}-${Date.now()}-${idx}`,
      }));

      setProducts((prev) => [...prev, ...newItems]);
      setLoadCount((prev) => prev + 1);
      setIsLoading(false);

      // Stop after 3 extra batches to avoid infinite memory growth
      if (loadCount >= 3) {
        setHasMore(false);
      }
    }, 600);
  }

  // <======< Infinite Scroll IntersectionObserver >======>
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
  }, [hasMore, isLoading, loadCount]);

  return {
    products,
    isLoading,
    hasMore,
    observerRef,
    loadMore,
  };
}
