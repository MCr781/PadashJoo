import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryBar from "@/components/CategoryBar";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*");
  
  const { data: featuredServices } = await supabase
    .from("services")
    .select("*, categories(slug)")
    .limit(6);

  return (
    <main className="min-h-screen">
      
      <Hero />

      <div className="max-w-5xl mx-auto px-4 mt-12 pb-24">
        
        {/* Navigation - Clean & Simple */}
        <div className="mb-16">
            <CategoryBar categories={categories || []} />
        </div>

        {/* Featured Offers */}
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-primary-600 rounded-full"></div>
                <h2 className="text-2xl font-black text-surface-900">پیشنهادهای ویژه امروز</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredServices?.map((service) => (
                    <Link 
                        key={service.id} 
                        href={`/${service.categories.slug}`}
                        className="group bg-white p-5 rounded-2xl border border-surface-200 shadow-sm hover:shadow-xl hover:shadow-primary-900/5 hover:border-primary-200 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Subtle background flash on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                        <div className="relative flex items-start gap-4">
                            {/* Logo: Elevated with shadow */}
                            <div className="w-16 h-16 rounded-2xl bg-white border border-surface-100 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition duration-300">
                                 {service.logo_url ? (
                                    <Image src={service.logo_url} alt={service.name_farsi} width={64} height={64} className="object-cover" />
                                 ) : (
                                    <span className="text-3xl">🎁</span>
                                 )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-surface-900 truncate">
                                    {service.name_farsi}
                                </h3>
                                <p className="text-sm text-gray-400 font-medium mb-3">
                                    کد معرف و پاداش
                                </p>
                                {/* The "Value" Tag - Looks like money */}
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-action-50 text-action-700 text-xs font-bold rounded-lg border border-action-100">
                                    <span>💰</span>
                                    <span>دریافت هدیه نقدی</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        {/* How it Works - Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "جستجو کنید", icon: "🔍", desc: "سرویس مورد نظر را پیدا کنید" },
                { title: "لینک بگیرید", icon: "🔗", desc: "یک لینک سالم دریافت کنید" },
                { title: "پاداش بگیرید", icon: "💎", desc: "ثبت‌نام کنید و لذت ببرید" }
            ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-surface-200 text-center shadow-sm">
                    <div className="w-12 h-12 bg-surface-50 rounded-full flex items-center justify-center text-xl mx-auto mb-4 border border-surface-100">
                        {item.icon}
                    </div>
                    <h3 className="font-bold text-surface-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}