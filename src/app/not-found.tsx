import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Big Background Number */}
      <h1 className="text-9xl font-black text-primary-100 select-none">404</h1>
      
      <div className="relative -mt-12">
        <h2 className="text-3xl font-black text-surface-900 mb-4">
          صفحه مورد نظر پیدا نشد!
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto leading-7">
          متاسفانه آدرسی که وارد کرده‌اید اشتباه است یا این صفحه حذف شده است.
          <br />
          اما نگران نباشید، پاداش‌ها هنوز منتظر شما هستند.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition shadow-xl shadow-primary-600/20"
        >
          <span>🏠</span>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}