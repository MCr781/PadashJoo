import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import LinkRotator from "@/components/LinkRotator";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs"; // 1. Import Breadcrumbs
import Script from "next/script"; // 2. Import Script for JSON-LD

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase.from("categories").select("name_farsi").eq("slug", slug).single();

  if (!category) return { title: "دسته‌بندی پیدا نشد" };
  
  return {
    title: `کد معرف و پاداش‌های ${category.name_farsi} | پاداش‌جو`,
    description: `بهترین کدهای تخفیف، پاداش ثبت‌نام و لینک‌های معرف برای سرویس‌های ${category.name_farsi} در ایران.`,
    alternates: {
      canonical: `https://padashjoo.ir/${slug}`,
    }
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const supabase = await createClient();

  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id, name_farsi, slug")
    .eq("slug", slug)
    .single();

  if (categoryError || !categoryData) return notFound();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", categoryData.id);

  // 3. Construct JSON-LD Schema (The Secret Code for Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `کدهای معرف ${categoryData.name_farsi}`,
    "description": `لیست کامل پاداش‌ها و کدهای معرف برای ${categoryData.name_farsi}`,
    "url": `https://padashjoo.ir/${categoryData.slug}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "خانه",
          "item": "https://padashjoo.ir"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryData.name_farsi,
          "item": `https://padashjoo.ir/${categoryData.slug}`
        }
      ]
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-surface-50 text-surface-900">
      
      {/* 4. Inject JSON-LD */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-3xl">
        {/* 5. The Visual Breadcrumb */}
        <Breadcrumbs items={[{ label: categoryData.name_farsi, href: `/${categoryData.slug}` }]} />

        <h1 className="text-3xl md:text-4xl font-black mb-8 text-surface-900 border-r-4 border-primary-500 pr-4">
          {categoryData.name_farsi}
        </h1>

        <div className="grid gap-6">
          {services && services.length > 0 ? (
            services.map((service) => (
              <div
                key={service.id}
                className="p-6 bg-white rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-surface-100 bg-surface-50 flex-shrink-0">
                    {service.logo_url ? (
                        <Image 
                            src={service.logo_url}
                            alt={service.name_farsi}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-xl">
                            {service.name_farsi[0]}
                        </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-surface-900">{service.name_farsi}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-surface-100 text-gray-500 text-xs rounded-md">
                            {service.slug}
                        </span>
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-md font-bold">
                            فعال ✅
                        </span>
                    </div>
                  </div>
                </div>

                <LinkRotator serviceSlug={service.slug} />
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400">
                هنوز سرویسی در این دسته وجود ندارد.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}