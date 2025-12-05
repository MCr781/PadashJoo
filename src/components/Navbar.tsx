import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-surface-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* 1. Logo (Always Visible) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="relative w-10 h-10 shadow-md rounded-xl overflow-hidden bg-surface-50 border border-surface-100">
             <Image 
               src="/logo.png" 
               alt="PadashJoo Logo" 
               fill
               className="object-cover"
             />
          </div>
          <span className="text-2xl font-black text-surface-900 tracking-tight">
            PadashJoo
          </span>
        </Link>

        {/* 2. DESKTOP Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/blog" className="text-gray-600 font-medium hover:text-primary-600 transition">
            بلاگ
          </Link>

          {user ? (
            // LOGGED IN STATE
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-surface-100 text-surface-900 font-bold rounded-xl hover:bg-surface-200 transition"
              >
                <span>👤</span>
                <span>حساب کاربری</span>
              </Link>
            </div>
          ) : (
            // GUEST STATE
            <Link 
              href="/login"
              className="px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition transform hover:-translate-y-0.5"
            >
              ورود / ثبت‌نام
            </Link>
          )}
        </div>

        {/* 3. MOBILE Menu (Visible only on Mobile) */}
        <MobileMenu user={user} />

      </div>
    </nav>
  );
}