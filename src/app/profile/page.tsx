import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. Get User
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");

  // 2. Get User Stats (We use the 'links' table to calculate reputation)
  const { data: links } = await supabase
    .from("links")
    .select("upvotes, downvotes, views, clicks")
    .eq("user_id", user.id);

  // Calculate Stats
  const totalLinks = links?.length || 0;
  const totalViews = links?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;
  const totalClicks = links?.reduce((acc, curr) => acc + (curr.clicks || 0), 0) || 0;
  const totalUpvotes = links?.reduce((acc, curr) => acc + (curr.upvotes || 0), 0) || 0;
  
  // Fake "Trust Score" Logic (Simple version for now)
  const trustScore = 100 + (totalUpvotes * 5) + (totalClicks * 2);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-surface-50">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="mb-8">
            <Link href="/dashboard" className="text-gray-500 hover:text-primary-600 font-bold text-sm mb-4 inline-block">
                ← بازگشت به داشبورد
            </Link>
            <h1 className="text-3xl font-black text-surface-900">پروفایل کاربری</h1>
        </div>

        {/* Identity Card */}
        <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-4xl text-primary-600 font-bold border-4 border-white shadow-lg">
                {user.email?.[0].toUpperCase()}
            </div>
            <div className="text-center md:text-right flex-1">
                <h2 className="text-xl font-bold text-surface-900">{user.email}</h2>
                <p className="text-gray-500 text-sm mt-1">
                    تاریخ عضویت: {new Date(user.created_at).toLocaleDateString('fa-IR')}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-warmth-100 text-warmth-600 rounded-full text-sm font-bold">
                    <span>💎 امتیاز اعتماد: {trustScore}</span>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-surface-200 text-center">
                <span className="block text-gray-400 text-xs mb-1">لینک‌ها</span>
                <span className="text-xl font-bold text-surface-900">{totalLinks}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-surface-200 text-center">
                <span className="block text-gray-400 text-xs mb-1">بازدید کل</span>
                <span className="text-xl font-bold text-surface-900">{totalViews}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-surface-200 text-center">
                <span className="block text-gray-400 text-xs mb-1">کلیک‌ها</span>
                <span className="text-xl font-bold text-action-600">{totalClicks}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-surface-200 text-center">
                <span className="block text-gray-400 text-xs mb-1">تاییدیه (👍)</span>
                <span className="text-xl font-bold text-primary-600">{totalUpvotes}</span>
            </div>
        </div>

        {/* Security Section (Placeholder for now) */}
        <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm">
            <h3 className="text-lg font-bold text-surface-900 mb-4 border-b border-surface-100 pb-4">
                امنیت حساب
            </h3>
            <div className="flex justify-between items-center">
                <div>
                    <span className="block font-medium text-surface-900">رمز عبور</span>
                    <span className="text-sm text-gray-500">*************</span>
                </div>
                <button className="px-4 py-2 text-sm border border-surface-200 rounded-lg hover:bg-surface-50 text-gray-600 transition">
                    تغییر رمز (به زودی)
                </button>
            </div>
        </div>

      </div>
    </main>
  );
}