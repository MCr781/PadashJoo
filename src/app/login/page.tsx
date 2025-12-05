import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-surface-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-surface-200 shadow-xl">
            <h1 className="text-3xl font-black text-center mb-2 text-primary-600 tracking-tight">PadashJoo</h1>
            <p className="text-gray-500 text-center mb-8">
              برای شروع کسب درآمد وارد شوید
            </p>

            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="email">ایمیل</label>
                    <input 
                        className="p-3 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-surface-900 transition"
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="shoma@example.com" 
                        required 
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="password">رمز عبور</label>
                    <input 
                        className="p-3 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-surface-900 transition"
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                    />
                </div>

                <div className="flex flex-col gap-3 mt-6">
                    <button 
                        formAction={login} 
                        className="w-full py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-600/20"
                    >
                        ورود به حساب
                    </button>
                    <button 
                        formAction={signup} 
                        className="w-full py-3.5 bg-white text-gray-700 font-bold rounded-xl border border-surface-200 hover:bg-surface-50 transition"
                    >
                        ثبت‌نام جدید
                    </button>
                </div>
            </form>
        </div>
    </main>
  )
}