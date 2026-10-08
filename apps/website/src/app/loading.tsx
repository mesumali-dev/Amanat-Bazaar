import { Loader2 } from "lucide-react";

// <======< Route-level Suspense Loading Fallback >======>
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <Loader2 className="w-8 h-8 text-[#F67D1D] animate-spin" />
      <p className="text-xs font-medium text-slate-500 tracking-wide">Loading Amanat Bazaar...</p>
    </div>
  );
}
