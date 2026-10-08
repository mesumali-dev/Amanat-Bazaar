"use client";

import { useState } from "react";

// <======< Newsletter Form Leaf Client Component >======>
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  }

  if (subscribed) {
    return <div className="p-3 bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg animate-in fade-in duration-200">Thank you for subscribing! You will receive our latest updates soon.</div>;
  }

  return (
    <form onSubmit={handleSubscribe} className="space-y-3">
      <div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" required className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#F67D1D] font-normal shadow-xs" />
      </div>
      <button type="submit" className="w-full bg-[#F67D1D] hover:bg-[#e0650e] active:scale-[0.99] text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-lg transition-all duration-150 shadow-sm">
        Subscribe
      </button>
    </form>
  );
}

export default NewsletterForm;
