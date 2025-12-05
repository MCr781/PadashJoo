"use client";

import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    // Added: A soft gradient fade at the bottom to blend into the grid
    <div className="relative bg-gradient-to-b from-white to-surface-50/50 border-b border-surface-200 pt-20 pb-24">
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Badge: Updated to look like a 'Chip' */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-white border border-surface-200 rounded-full shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-surface-900 text-xs font-bold tracking-wide">پلتفرم اشتراک‌گذاری پاداش</span>
        </div>

        {/* Headline: Tighter tracking, heavier font */}
        <h1 className="text-4xl md:text-6xl font-black text-surface-900 mb-6 tracking-tighter leading-tight">
          بانک کدهای <span className="text-primary-600 relative">
            پاداش و هدیه
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-warmth-400 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
          </span>
        </h1>

        <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl mx-auto font-medium">
          بدون هزینه، کدهای معرف معتبر سرویس‌های ایرانی را پیدا کنید و 
          <span className="text-surface-900 font-bold mx-1">درآمد نقد</span>
          کسب کنید.
        </p>

        {/* The Search Tool: Added Glow & Shadow */}
        <div className="max-w-lg mx-auto mb-10 relative group">
            {/* The Glow Effect behind the search */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-200 to-action-200 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
                <HeroSearch />
            </div>
        </div>

        {/* Trust Signals: Cleaned up */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500 font-bold">
            <span className="flex items-center gap-2">
                <span className="text-action-500">✓</span> کاملا رایگان
            </span>
            <span className="flex items-center gap-2">
                <span className="text-action-500">✓</span> لینک‌های تست شده
            </span>
            <span className="flex items-center gap-2">
                <span className="text-action-500">✓</span> بدون تبلیغات
            </span>
        </div>
      </div>
    </div>
  );
}