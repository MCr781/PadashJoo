"use client";

import { useEffect, useState } from "react";

// In the future, we fetch this from the database!
const EVENTS = [
  "💰 علی همین الان لینک نوبیتکس را دریافت کرد",
  "🚀 سارا یک کد معرف جدید برای اسنپ ثبت کرد",
  "🎁 کاربر ۸۹۳۴ موفق به دریافت ۵۰،۰۰۰ تومان شد",
  "🔥 لینک تپسی توسط ۱۰۰ نفر تایید شد",
  "💎 محمد لینک بلو بانک را کپی کرد",
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // Fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % EVENTS.length);
        setVisible(true); // Fade in new message
      }, 500);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface-900 text-white text-xs py-2 overflow-hidden relative z-40">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-bold text-green-400">زنده:</span>
        </div>

        {/* The Animated Message */}
        <div className={`transition-opacity duration-500 flex-1 text-right mr-4 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {EVENTS[index]}
        </div>

      </div>
    </div>
  );
}