"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { Search, ChevronDown, User, ShoppingBag, Heart, Menu, X, Smartphone, Shirt, Home as HomeIcon, ShoppingBasket, HeartPulse, Dumbbell, Gamepad2, LayoutGrid, ChevronRight, ArrowRight, TrendingUp, Clock, Check } from "lucide-react";

// Mega Menu Categories Data
interface CategoryItem {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
  subcategories: {
    title: string;
    items: string[];
  }[];
  featured?: {
    title: string;
    subtitle: string;
    tag: string;
    image: string;
  };
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "electronics",
    name: "Electronics & Tech",
    icon: Smartphone,
    description: "Gadgets, Phones & Smart Devices",
    badge: "Hot",
    subcategories: [
      {
        title: "Mobile & Accessories",
        items: ["Smartphones", "iPhones", "Cases & Covers", "Power Banks", "Wireless Chargers"],
      },
      {
        title: "Audio & Headphones",
        items: ["Noise Cancelling", "True Wireless Earbuds", "Bluetooth Speakers", "Headsets"],
      },
      {
        title: "Computers & Gaming",
        items: ["Laptops", "Gaming Consoles", "Monitors", "Keyboards & Mice", "Storage & SSDs"],
      },
    ],
    featured: {
      title: "Next-Gen Wireless Audio",
      subtitle: "Up to 40% OFF top audio brands",
      tag: "Mega Sale",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: Shirt,
    description: "Men's, Women's & Kids' Style",
    subcategories: [
      {
        title: "Men's Wear",
        items: ["Jackets & Coats", "Casual Shirts", "Denim & Jeans", "Activewear", "Footwear"],
      },
      {
        title: "Women's Fashion",
        items: ["Dresses", "Tops & Blouses", "Ethnic Wear", "Handbags & Totes", "Jewelry"],
      },
      {
        title: "Watches & Accessories",
        items: ["Luxury Watches", "Smartwatches", "Sunglasses", "Belts & Wallets"],
      },
    ],
  },
  {
    id: "home",
    name: "Home & Living",
    icon: HomeIcon,
    description: "Furniture, Decor & Appliances",
    subcategories: [
      {
        title: "Home Decor",
        items: ["Wall Art", "Lighting & Lamps", "Rugs & Carpets", "Vases & Plants"],
      },
      {
        title: "Kitchen & Dining",
        items: ["Cookware Sets", "Coffee Makers", "Air Fryers", "Dinnerware"],
      },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: HeartPulse,
    description: "Skincare, Makeup & Care",
    subcategories: [
      {
        title: "Skincare",
        items: ["Serums & Oils", "Moisturizers", "Sunscreens", "Face Masks"],
      },
    ],
  },
  {
    id: "grocery",
    name: "Grocery & Food",
    icon: ShoppingBasket,
    description: "Daily Essentials & Fresh Foods",
    subcategories: [
      {
        title: "Pantry Staples",
        items: ["Gourmet Oils", "Spices", "Pasta & Grains", "Snacks"],
      },
    ],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: Dumbbell,
    description: "Fitness Equipment & Gear",
    subcategories: [
      {
        title: "Fitness Gear",
        items: ["Dumbbells", "Yoga Mats", "Resistance Bands"],
      },
    ],
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: Gamepad2,
    description: "Board Games, Toys & Hobbies",
    subcategories: [
      {
        title: "Games & Toys",
        items: ["Board Games", "Action Figures", "Puzzles"],
      },
    ],
  },
];

const POPULAR_SEARCHES = ["Wireless Earbuds Pro", "Smart Watch Series 8", "Running Shoes", "Food Processor", "Laptop Backpack", "Classic T-Shirt"];

const RECENT_SEARCHES = ["Noise Cancelling Headphones", "Skincare Set", "Fitness Tracker"];

const INITIAL_CART = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    price: 2999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "2",
    name: "Smart Watch Series 8",
    price: 7999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80",
  },
];

export function Navbar() {
  // Navigation & Dropdown states
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState("Home");
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [wishlistCount, setWishlistCount] = useState(1);

  // Refs for click outside
  const categoriesRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const currentCategoryData = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-xs font-sans">
      {/* TIER 1: MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-19 gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Menu Button & Brand Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#F67D1D] hover:bg-orange-50 focus:outline-none transition-colors" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center focus:outline-none group">
              <Image src="/logo.svg" alt="Amanat Bazaar Logo" width={195} height={44} priority className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.01]" />
            </Link>
          </div>

          {/* CENTER: SEARCH BAR (Rounded Pill Container with Orange Action Button) */}
          <div className="flex-1 max-w-lg mx-auto hidden md:block" ref={searchRef}>
            <div className="relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSearchFocused(false);
                }}
                className={`flex items-center w-full rounded-xl border bg-white transition-all duration-200 p-0.5 pl-4 ${isSearchFocused ? "border-[#F67D1D] ring-3 ring-orange-500/10 shadow-sm" : "border-slate-200 hover:border-slate-300"}`}>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setIsSearchFocused(true)} placeholder="Search for products, categories and brands..." className="w-full pr-3 py-1.5 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 font-normal placeholder:font-normal bg-transparent border-none focus:outline-none focus:ring-0" />

                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} className="p-1 mr-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button type="submit" className="bg-[#F67D1D] hover:bg-[#e0650e] text-white w-11 h-8.5 rounded-r-xl flex items-center justify-center transition-all shrink-0 shadow-xs" aria-label="Search">
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>

              {/* Search Suggestions & History Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in duration-150">
                  {searchQuery.trim() === "" ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#F67D1D]" /> Trending Searches
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {POPULAR_SEARCHES.map((term, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setSearchQuery(term);
                                setIsSearchFocused(false);
                              }}
                              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-[#F67D1D] text-xs text-slate-700 font-medium transition-colors">
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> Recent Searches
                        </div>
                        <div className="space-y-1">
                          {RECENT_SEARCHES.map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSearchQuery(item);
                                setIsSearchFocused(false);
                              }}
                              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left">
                              <span className="flex items-center gap-2">
                                <Search className="w-3 h-3 text-slate-400" /> {item}
                              </span>
                              <ChevronRight className="w-3 h-3 text-slate-300" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {[`${searchQuery} in Electronics`, `${searchQuery} in Flash Deals`, `Popular ${searchQuery}`].map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setIsSearchFocused(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F67D1D] transition-colors text-left font-medium">
                          <Search className="w-4 h-4 text-slate-400" />
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT UTILITIES: Delivery Location, Wishlist, Cart, Login */}
          <div className="flex items-center space-x-5 sm:space-x-7 lg:space-x-8 shrink-0">
            {/* Delivery Location Selector */}
            <div className="relative hidden xl:block mr-8 lg:mr-12" ref={locationRef}>
              <button onClick={() => setIsLocationOpen(!isLocationOpen)} className="flex items-center gap-2.5 text-left hover:text-[#F67D1D] transition-colors focus:outline-none">
                <SlLocationPin className="w-5 h-5 text-slate-700" />
                <div>
                  <span className="block text-[11px] font-light text-slate-700 leading-tight">Deliver to</span>
                  <span className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                    {selectedCity} <ChevronDown className="w-3 h-3 text-slate-400" />
                  </span>
                </div>
              </button>

              {isLocationOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-medium text-black tracking-wider">Select Your City</div>
                  {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar"].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between transition-colors ${selectedCity === city ? "bg-orange-50 text-[#F67D1D] font-bold" : "text-slate-700 hover:bg-slate-50"}`}>
                      {city}
                      {selectedCity === city && <Check className="w-3.5 h-3.5 text-[#F67D1D]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <Link href="/wishlist" className="relative text-slate-800 hover:text-[#F67D1D] transition-colors hidden sm:flex items-center justify-center focus:outline-none" aria-label="Wishlist">
              <Heart className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute top-0 -right-0.5 w-2 h-2 rounded-full bg-[#F67D1D]"></span>
            </Link>

            {/* Cart Button & Quick Dropdown */}
            <div className="relative" ref={cartRef}>
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-1 text-slate-700 hover:text-[#F67D1D] transition-colors flex items-center justify-center focus:outline-none" aria-expanded={isCartOpen} aria-label="Cart">
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {totalCartCount > 0 && <span className="absolute -top-1.5 -right-2 bg-[#F67D1D] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">{totalCartCount}</span>}
              </button>

              {/* Cart Quick Preview Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#F67D1D]" /> My Cart ({totalCartCount} items)
                    </h4>
                    <button onClick={() => setIsCartOpen(false)} className="text-xs text-slate-400 hover:text-slate-600 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 space-y-2 pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="pt-2.5 first:pt-0 flex items-center gap-3">
                        <Image src={item.image} alt={item.name} width={48} height={48} className="w-12 h-12 object-cover rounded-lg border border-slate-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-slate-800 truncate">{item.name}</h5>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-bold text-[#F67D1D]">Rs. {item.price.toLocaleString()}</span>
                            <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Total:</span>
                      <span className="text-[#F67D1D] text-sm">Rs. {totalCartPrice.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full text-center py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        View Cart
                      </Link>
                      <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full text-center py-2 rounded-xl bg-[#F67D1D] hover:bg-[#e0650e] text-white text-xs font-bold transition-colors shadow-xs">
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login / Sign Up Button */}
            <div className="relative" ref={accountRef}>
              <button onClick={() => setIsAccountOpen(!isAccountOpen)} className="flex items-center gap-1.5 text-xs font-medium text-slate-800 hover:text-[#F67D1D] transition-colors focus:outline-none">
                <User className="w-5 h-5 stroke-[1.8] text-slate-800" />
                <span className="hidden sm:inline">Login / Sign Up</span>
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in duration-150">
                  <div className="text-center pb-3 border-b border-slate-100 mb-2">
                    <p className="text-xs text-slate-500 mb-2">Welcome to Amanat Bazaar</p>
                    <button onClick={() => setIsAccountOpen(false)} className="w-full bg-[#F67D1D] hover:bg-[#e0650e] text-white py-2 rounded-xl font-bold text-xs transition-colors shadow-xs">
                      Login
                    </button>
                    <Link href="/register" onClick={() => setIsAccountOpen(false)} className="block text-[11px] text-slate-500 hover:text-[#F67D1D] font-semibold mt-2">
                      Don't have an account? Sign Up
                    </Link>
                  </div>
                  <div className="space-y-1 text-xs">
                    <Link href="/account/orders" onClick={() => setIsAccountOpen(false)} className="block px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-[#F67D1D]">
                      My Orders
                    </Link>
                    <Link href="/track-order" onClick={() => setIsAccountOpen(false)} className="block px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-[#F67D1D]">
                      Track Order
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="py-2.5 pb-3 md:hidden border-t border-slate-100">
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full rounded-full bg-white border border-slate-200 px-3.5 py-1.5">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full text-xs text-slate-800 bg-transparent border-none focus:outline-none placeholder-slate-400 font-normal" />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} className="text-slate-400 p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* TIER 2: SECONDARY NAVIGATION BAR ROW */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
          {/* Left: Mega Menu Category Button */}
          <div className="relative" ref={categoriesRef}>
            <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="flex items-center gap-2 text-xs sm:text-[13px] font-normal text-slate-800 hover:text-[#F67D1D] py-3 transition-colors focus:outline-none group">
              <Menu className="w-4 h-4 text-slate-700 group-hover:text-[#F67D1D]" />
              <span>All Categories</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180 text-[#F67D1D]" : ""}`} />
            </button>

            {/* Categories Dropdown Panel */}
            {isCategoriesOpen && (
              <div className="absolute top-full left-0 mt-0 w-195 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in duration-150">
                <div className="grid grid-cols-12 min-h-95">
                  {/* Left Category Tabs */}
                  <div className="col-span-4 bg-slate-50/90 p-3 border-r border-slate-100 space-y-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isActive = activeCategory === cat.id;

                      return (
                        <button key={cat.id} onMouseEnter={() => setActiveCategory(cat.id)} onClick={() => setActiveCategory(cat.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${isActive ? "bg-white text-[#F67D1D] shadow-xs border border-slate-200/80" : "text-slate-700 hover:bg-slate-200/50"}`}>
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? "text-[#F67D1D]" : "text-slate-500"}`} />
                            <span>{cat.name}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Subcategories */}
                  <div className="col-span-8 p-5 bg-white flex flex-col justify-between">
                    <div>
                      <div className="pb-3 border-b border-slate-100 mb-4">
                        <h4 className="text-sm font-bold text-slate-800">{currentCategoryData.name}</h4>
                        <p className="text-xs text-slate-400">{currentCategoryData.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {currentCategoryData.subcategories.map((sub, idx) => (
                          <div key={idx} className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{sub.title}</h5>
                            <ul className="space-y-1">
                              {sub.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link href={`/search?q=${encodeURIComponent(item)}`} onClick={() => setIsCategoriesOpen(false)} className="text-xs text-slate-600 hover:text-[#F67D1D] transition-colors block py-0.5">
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <Link href={`/categories/${currentCategoryData.id}`} onClick={() => setIsCategoriesOpen(false)} className="text-xs font-bold text-[#F67D1D] hover:underline flex items-center gap-1">
                        Explore All {currentCategoryData.name} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right/Center Navigation Links */}
          <nav className="flex items-center space-x-6 sm:space-x-8 text-xs sm:text-[13px] font-normal overflow-x-auto no-scrollbar py-3">
            {[
              { name: "Home", href: "/" },
              { name: "Categories", href: "/categories" },
              { name: "Track Order", href: "/track-order" },
              { name: "Complaints", href: "/complaints" },
              { name: "Help", href: "/help" },
            ].map((tab) => {
              const isActive = activeNavTab === tab.name;

              return (
                <Link key={tab.name} href={tab.href} onClick={() => setActiveNavTab(tab.name)} className={`relative py-1.5 transition-colors shrink-0 ${isActive ? "text-[#F67D1D] font-medium" : "text-slate-700 hover:text-[#F67D1D]"}`}>
                  {tab.name}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F67D1D] rounded-full"></span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-left duration-200">
            <div>
              <div className="p-4 bg-[#282F3D] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white/10 text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-300">Welcome to Amanat Bazaar</span>
                    <span className="block text-xs font-bold text-white">Login / Sign Up</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-300 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[calc(100vh-160px)] space-y-3 text-xs">
                {/* Nav Links */}
                <div className="space-y-1 pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1">Navigation</span>
                  {[
                    { name: "Home", href: "/" },
                    { name: "Categories", href: "/categories" },
                    { name: "Track Order", href: "/track-order" },
                    { name: "Complaints", href: "/complaints" },
                    { name: "Help", href: "/help" },
                  ].map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-[#F67D1D] font-semibold">
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Categories */}
                <div className="space-y-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1">Departments</span>
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isExpanded = mobileExpandedCat === cat.id;

                    return (
                      <div key={cat.id} className="rounded-xl border border-slate-100 overflow-hidden">
                        <button onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)} className={`w-full flex items-center justify-between p-2.5 text-left font-semibold ${isExpanded ? "bg-orange-50 text-[#F67D1D]" : "text-slate-800"}`}>
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#F67D1D]" />
                            <span>{cat.name}</span>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>

                        {isExpanded && (
                          <div className="p-2.5 bg-slate-50 border-t border-slate-100 space-y-2 text-[11px]">
                            {cat.subcategories.map((sub, idx) => (
                              <div key={idx} className="space-y-1">
                                <span className="font-bold text-slate-700 block">{sub.title}</span>
                                <ul className="pl-2 space-y-1 text-slate-600">
                                  {sub.items.map((item, i) => (
                                    <li key={i}>
                                      <Link href={`/search?q=${encodeURIComponent(item)}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-0.5 hover:text-[#F67D1D]">
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs">
              <Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-slate-700 font-bold">
                <SlLocationPin className="w-4 h-4 text-[#F67D1D]" /> Track Order Status
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
