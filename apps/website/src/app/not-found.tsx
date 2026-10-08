import Link from "next/link";
import { Search, Home } from "lucide-react";

// <======< Route-level 404 Not Found Page >======>
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-orange-50 text-[#F67D1D] mx-auto flex items-center justify-center">
          <Search className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <span className="text-4xl font-extrabold text-[#F67D1D] tracking-tight">404</span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Page Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-500">The page or product you are looking for doesn&apos;t exist or might have been relocated.</p>
        </div>

        <div className="pt-2">
          <Link href="/" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F67D1D] hover:bg-[#e0650e] text-white text-xs font-semibold shadow-2xs transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
