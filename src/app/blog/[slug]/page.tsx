import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-surface-50">
      <article className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-surface-200 shadow-sm">
        <Link href="/blog" className="text-gray-400 hover:text-primary-600 mb-8 block text-sm font-bold transition">
          ← بازگشت به بلاگ
        </Link>

        <header className="mb-10 border-b border-surface-200 pb-10">
            <h1 className="text-3xl md:text-5xl font-black text-surface-900 mb-6 leading-tight">
            {post.title}
            </h1>
            <p className="text-gray-400 text-sm font-medium">
                تاریخ انتشار: {new Date(post.created_at).toLocaleDateString('fa-IR')}
            </p>
        </header>

        <div className="prose prose-lg prose-slate max-w-none whitespace-pre-wrap text-surface-900 leading-8">
            {post.content}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-primary-50 rounded-2xl border border-primary-100 text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary-900">آماده کسب درآمد هستید؟</h3>
            <p className="mb-8 text-primary-700">همین الان کدهای معرف معتبر را پیدا کنید و پاداش بگیرید.</p>
            <Link href="/" className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-600/20">
                جستجوی پاداش‌ها
            </Link>
        </div>
      </article>
    </main>
  );
}