"use client";

import { useEffect, useState } from "react";

// Fake data generator for the MVP (You can replace with real DB data later)
const ACTIVITIES = [
  "علی یک لینک نوبیتکس ثبت کرد",
  "سارا ۵۰،۰۰۰ تومان پاداش گرفت",
  "کاربر جدیدی به اسنپ‌فود پیوست",
  "محمد یک کد تپسی دریافت کرد",
  "لینک بلو بانک تایید شد ✅",
];

export default function LiveActivity() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-surface-200 shadow-sm text-sm text-gray-600 animate-in fade-in slide-in-from-top-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-action-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-action-500"></span>
      </span>
      <span className="font-medium" key={index}>
        {ACTIVITIES[index]}
      </span>
    </div>
  );
}