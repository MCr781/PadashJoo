"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export default function MobileMenu({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const menuContent = (
    <div className="relative z-[9999]">
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <span className="text-xl font-bold text-primary-600">PadashJoo</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6 text-right">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-surface-900 hover:text-primary-600 transition">
              خانه
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="text-lg font-medium text-surface-900 hover:text-primary-600 transition">
              بلاگ
            </Link>
            
            {/* Quick Links */}
            <div className="flex flex-col gap-3 pl-4 border-r-2 border-surface-100">
                <Link href="/crypto" onClick={() => setIsOpen(false)} className="text-base text-gray-500 hover:text-primary-600 transition">
                صرافی ارز دیجیتال
                </Link>
                <Link href="/food" onClick={() => setIsOpen(false)} className="text-base text-gray-500 hover:text-primary-600 transition">
                سفارش غذا
                </Link>
            </div>

            <div className="h-px bg-gray-100 my-2"></div>

            {user ? (
              <>
                {/* Unified Dashboard Link (Includes Profile) */}
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-bold text-primary-600 flex items-center justify-end gap-2">
                  <span>حساب کاربری من</span>
                  <span>👤</span>
                </Link>
                
                <form action="/auth/signout" method="post" className="mt-auto">
                  <button className="w-full py-3 text-center font-bold text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition">
                    خروج از حساب
                  </button>
                </form>
              </>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-primary-600 text-white text-center font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition mt-auto"
              >
                ورود / ثبت‌نام
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-surface-900 focus:outline-none"
        aria-label="Open Menu"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
}