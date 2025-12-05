import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default async function Dashboard() {
  const supabase = await createClient();

  // 1. Check Login
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  // 2. Fetch Links & Calculate Stats
  const { data: links } = await supabase
    .from("links")
    .select("id, bonus_description, is_active, upvotes, downvotes, views, clicks, services(name_farsi, slug)")
    .eq("user_id", user.id);

  const totalLinks = links?.length || 0;
  const totalViews = links?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;
  const totalClicks = links?.reduce((acc, curr) => acc + (curr.clicks || 0), 0) || 0;
  // Simple Trust Score: 100 base + 5 per upvote + 2 per click
  const trustScore = 100 + (links?.reduce((acc, curr) => acc + (curr.upvotes || 0), 0) || 0) * 5 + totalClicks * 2;

  return (
    <main className="min-h-screen bg-surface-50 pb-20">
      
      {/* --- SECTION 1: IDENTITY HEADER (The "Profile" Part) --- */}
      <div className="bg-white border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-3xl text-primary-600 font-black border-4 border-surface-50 shadow-sm">
                    {user.email?.[0].toUpperCase()}
                </div>
                
                {/* User Info */}
                <div>
                    <h1 className="text-2xl font-black text-surface-900">{user.email}</h1>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>عضویت: {new Date(user.created_at).toLocaleDateString('fa-IR')}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-primary-600 font-bold flex items-center gap-1">
                            💎 امتیاز اعتماد: {trustScore}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <Link href="/" className="px-5 py-2.5 border border-surface-200 bg-white text-gray-600 font-bold rounded-xl hover:bg-surface-50 transition text-sm">
                    مشاهده سایت
                </Link>
                <form action="/auth/signout" method="post">
                    <button className="px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition text-sm">
                        خروج
                    </button>
                </form>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        
        {/* --- SECTION 2: HIGH-LEVEL STATS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm text-center">
                <span className="block text-gray-400 text-xs mb-1 font-bold">لینک‌های فعال</span>
                <span className="text-2xl font-black text-surface-900">{totalLinks}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm text-center">
                <span className="block text-gray-400 text-xs mb-1 font-bold">بازدید کل</span>
                <span className="text-2xl font-black text-surface-900">{totalViews}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm text-center">
                <span className="block text-gray-400 text-xs mb-1 font-bold">کلیک‌ها</span>
                <span className="text-2xl font-black text-action-600">{totalClicks}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm text-center">
                <span className="block text-gray-400 text-xs mb-1 font-bold">نرخ تبدیل</span>
                <span className="text-2xl font-black text-primary-600">
                    {totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0}%
                </span>
            </div>
        </div>

        {/* --- SECTION 3: LINK MANAGEMENT (The "Dashboard" Part) --- */}
        <div className="flex justify-between items-end mb-6 border-b border-surface-200 pb-4">
            <h2 className="text-2xl font-black text-surface-900">مدیریت لینک‌ها</h2>
            <Link 
                href="/dashboard/submit"
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-600/20 text-sm"
            >
                <span>+</span> ثبت لینک جدید
            </Link>
        </div>

        {!links || links.length === 0 ? (
            <div className="text-center p-16 border-2 border-dashed border-surface-200 rounded-3xl bg-white text-gray-400">
                <div className="text-4xl mb-4">📭</div>
                هنوز لینکی ثبت نکرده‌اید.
                <br />
                <span className="text-sm mt-2 block font-medium">همین الان اولین درآمد خود را بسازید!</span>
            </div>
        ) : (
            <div className="grid gap-4">
                {links.map((link: any) => (
                    <div key={link.id} className="group p-6 bg-white rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1 text-right w-full">
                            <span className="font-bold text-lg text-surface-900 block mb-1">
                                {link.services?.name_farsi}
                            </span>
                            <p className="text-sm text-gray-500 max-w-md truncate">
                                {link.bonus_description}
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                            {/* Stats Pill */}
                            <div className="flex items-center gap-4 bg-surface-50 px-4 py-2 rounded-xl border border-surface-100">
                                <div className="text-center px-2">
                                    <span className="block text-[10px] text-gray-400 font-bold">بازدید</span>
                                    <span className="font-bold text-surface-900">{link.views}</span>
                                </div>
                                <div className="w-px h-8 bg-surface-200"></div>
                                <div className="text-center px-2">
                                    <span className="block text-[10px] text-gray-400 font-bold">کلیک</span>
                                    <span className="font-bold text-primary-600">{link.clicks}</span>
                                </div>
                                <div className="w-px h-8 bg-surface-200"></div>
                                <div className="text-center px-2">
                                    <span className="block text-[10px] text-gray-400 font-bold">وضعیت</span>
                                    <span className={`text-xs font-bold ${link.is_active ? 'text-action-500' : 'text-red-500'}`}>
                                        {link.is_active ? 'فعال' : 'غیرفعال'}
                                    </span>
                                </div>
                            </div>

                            <DeleteButton linkId={link.id} />
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </main>
  );
}