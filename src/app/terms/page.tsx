export default function TermsPage() {
  return (
    <main className="min-h-screen bg-surface-50">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-black text-surface-900 mb-8">قوانین و مقررات</h1>
        
        <div className="prose prose-lg text-gray-600 leading-8 space-y-6">
          <p>استفاده از پاداش‌جو به معنی پذیرش قوانین زیر است:</p>
          
          <section>
            <h3 className="text-xl font-bold text-surface-900">۱. مسئولیت لینک‌ها</h3>
            <p>کاربران مسئول صحت لینک‌های خود هستند. پاداش‌جو هیچ مسئولیتی در قبال تغییر سیاست‌های پاداش‌دهی سرویس‌های ثالث (مثل نوبیتکس یا اسنپ) ندارد.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-surface-900">۲. ممنوعیت تقلب</h3>
            <p>هرگونه تلاش برای دستکاری سیستم رأی‌دهی، ثبت اکانت‌های فیک، یا استفاده از ربات باعث مسدود شدن دائمی حساب کاربری خواهد شد.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-surface-900">۳. حریم خصوصی</h3>
            <p>ما اطلاعات شما (ایمیل) را با هیچ شخص ثالثی به اشتراک نمی‌گذاریم.</p>
          </section>
        </div>
      </div>
    </main>
  );
}