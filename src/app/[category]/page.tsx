import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image"; // 1. Import Image
import { notFound } from "next/navigation";
import LinkRotator from "@/components/LinkRotator";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase.from("categories").select("name_farsi").eq("slug", slug).single();

  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name_farsi} Rewards | PadashJoo`,
    description: `Best referral codes and bonuses for ${category.name_farsi} services in Iran.`,
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
    .select("id, name_farsi")
    .eq("slug", slug)
    .single();

  if (categoryError || !categoryData) return notFound();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", categoryData.id);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-surface-50 text-surface-900">
      <div className="w-full max-w-3xl">
        <Link href="/" className="text-gray-500 hover:text-primary-600 mb-8 inline-flex items-center gap-2 transition font-medium">
          → بازگشت به خانه
        </Link>

        <h1 className="text-4xl font-black mb-8 text-surface-900 border-r-4 border-primary-500 pr-4">
          {categoryData.name_farsi}
        </h1>

        <div className="grid gap-6">
          {services && services.length > 0 ? (
            services.map((service) => (
              <div
                key={service.id}
                className="p-6 bg-white rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-center gap-6"
              >
                {/* 2. Logo & Name Section */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  {/* Logo Container */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-surface-100 bg-surface-50 flex-shrink-0">
                    {service.logo_url ? (
                        <Image 
                            src={service.logo_url}
                            alt={service.name_farsi}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        // Fallback if no logo: A colored box with the first letter
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-xl">
                            {service.name_farsi[0]}
                        </div>
                    )}
                  </div>
                  
                  {/* Text Info */}
                  <div>
                    <h2 className="text-2xl font-bold text-surface-900">{service.name_farsi}</h2>
                    <p className="text-primary-600 text-sm font-medium mt-1">/{service.slug}</p>
                  </div>
                </div>

                {/* The Smart Button */}
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