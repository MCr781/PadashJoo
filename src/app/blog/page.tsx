import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 3600;

export default async function BlogIndex() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, created_at, content")
    .order("created_at", { ascending: false });

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-surface-50">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
            <Link href="/" className="text-gray-500 hover:text-primary-600 mb-4 inline-block text-sm font-bold transition">← بازگشت به خانه</Link>
            <h1 className="text-4xl font-black text-surface-900 mb-2">بلاگ پاداش‌جو</h1>
            <p className="text-gray-500">راهنمای جامع کسب درآمد رایگان و تخفیف‌های واقعی</p>
        </div>

        <div className="grid gap-6">
          {!posts || posts.length === 0 ? (
            <p className="text-center text-gray-400">هنوز مقاله‌ای منتشر نشده است.</p>
          ) : (
            posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="p-8 bg-white rounded-2xl border border-surface-200 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 group">
                  <h2 className="text-2xl font-bold mb-3 text-surface-900 group-hover:text-primary-600 transition">{post.title}</h2>
                  <div className="text-gray-400 text-xs mb-4 font-medium">
                    {new Date(post.created_at).toLocaleDateString('fa-IR')}
                  </div>
                  <p className="text-gray-600 line-clamp-2 leading-relaxed">
                    {post.content.substring(0, 150)}...
                  </p>
                  <span className="text-primary-600 text-sm font-bold mt-6 inline-block group-hover:translate-x-1 transition-transform">ادامه مطلب ←</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}