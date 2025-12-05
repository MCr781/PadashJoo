import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface-50 flex flex-col items-center p-8 md:p-24">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl border border-surface-200 shadow-sm text-center">
        
        <div className="mb-8">
            <span className="text-4xl">📬</span>
        </div>

        <h1 className="text-3xl font-black text-surface-900 mb-4">تماس با پاداش‌جو</h1>
        <p className="text-gray-600 mb-12 leading-8">
          پیشنهادی برای بهتر شدن سایت دارید؟ <br />
          یک دسته‌بندی جدید می‌خواهید؟ <br />
          یا مشکلی در سایت پیدا کرده‌اید؟
        </p>

        <div className="grid gap-6">
            {/* Email Option - UPDATED */}
            <a 
                href="mailto:support@padashjoo.ir" 
                className="group flex items-center justify-between p-6 rounded-2xl border border-surface-200 hover:border-primary-200 hover:bg-primary-50 transition"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">
                        ✉️
                    </div>
                    <div className="text-right">
                        <h3 className="font-bold text-surface-900">ارسال ایمیل</h3>
                        <p className="text-sm text-gray-500">support@padashjoo.ir</p>
                    </div>
                </div>
                <span className="text-primary-600 font-bold group-hover:translate-x-1 transition">ارسال پیام</span>
            </a>

            {/* Telegram Option */}
            <a 
                href="https://t.me/YOUR_TELEGRAM_ID" 
                target="_blank"
                className="group flex items-center justify-between p-6 rounded-2xl border border-surface-200 hover:border-action-200 hover:bg-action-50 transition"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-action-100 text-action-600 rounded-full flex items-center justify-center text-xl">
                        ✈️
                    </div>
                    <div className="text-right">
                        <h3 className="font-bold text-surface-900">پشتیبانی تلگرام</h3>
                        <p className="text-sm text-gray-500">ارتباط مستقیم و سریع</p>
                    </div>
                </div>
                <span className="text-action-600 font-bold group-hover:translate-x-1 transition">ارسال پیام</span>
            </a>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-100">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition text-sm">
                ← بازگشت به صفحه اصلی
            </Link>
        </div>

      </div>
    </main>
  );
}