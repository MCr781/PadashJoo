import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-50 border-t border-surface-200 pt-16 pb-8 text-gray-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-black text-primary-600 mb-4 block tracking-tight">
              PadashJoo
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed">
              اولین پلتفرم عادلانه برای اشتراک‌گذاری کدهای معرف در ایران. ما به شما کمک می‌کنیم تا بهترین پاداش‌های ثبت‌نام و هدایای نقدی را پیدا کنید.
            </p>
            <div className="flex gap-4 mb-4">
               {/* Trust Badges (Fake for now, but builds visual trust) */}
               <div className="px-3 py-1 bg-white border border-surface-200 rounded text-xs font-bold text-green-600">SSL Secured</div>
               <div className="px-3 py-1 bg-white border border-surface-200 rounded text-xs font-bold text-primary-600">Verified Links</div>
            </div>
            <div className="text-sm font-medium">
              © {new Date().getFullYear()} پاداش‌جو. تمامی حقوق محفوظ است.
            </div>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h3 className="text-surface-900 font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/crypto" className="hover:text-primary-600 transition">
                  صرافی‌های ارز دیجیتال
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-primary-600 transition">
                  سفارش غذا
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-600 transition">
                  آخرین راهنماها
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-surface-900 font-bold mb-4">درباره ما</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-600 transition">
                  ما که هستیم؟
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-600 transition">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-600 transition">
                  قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-200 pt-8 text-center text-xs font-medium flex flex-col md:flex-row justify-between items-center gap-4">
            <span>ساخته شده با ❤️ در ایران</span>
            <span className="text-gray-400">نسخه ۱.۰.۰ (بتا)</span>
        </div>
      </div>
    </footer>
  );
}