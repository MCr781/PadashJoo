"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ServiceResult = {
  id: string;
  name_farsi: string;
  slug: string;
  categories: {
    slug: string;
  };
};

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ServiceResult[]>([]);
  const [allServices, setAllServices] = useState<ServiceResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 1. Fetch all services once when the component loads
  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("services")
        .select("id, name_farsi, slug, categories(slug)");
      
      if (data) {
        // @ts-ignore - Supabase types can be tricky with joins, ignoring for MVP speed
        setAllServices(data);
      }
    };
    fetchServices();
  }, []);

  // 2. Filter as the user types
  useEffect(() => {
    if (query.length > 1) {
      const filtered = allServices.filter((s) =>
        s.name_farsi.includes(query) || s.slug.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, allServices]);

  return (
    <div className="relative w-full max-w-lg mx-auto mt-8">
      {/* Input Field */}
      <div className="relative group">
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
          type="text"
          placeholder="جستجوی سرویس (مثلاً: نوبیتکس، اسنپ...)"
          className="w-full py-4 pr-12 pl-4 bg-white border-2 border-surface-200 rounded-2xl shadow-sm text-surface-900 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all text-right"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay closing so clicks register
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-surface-200 overflow-hidden z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length > 0 ? (
            <ul>
              {results.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${service.categories.slug}`} // Note: Ideally we'd scroll to the service, but linking to category is fine for MVP
                    className="block px-6 py-3 hover:bg-surface-50 transition border-b border-surface-100 last:border-0 text-right flex justify-between items-center"
                  >
                    <div>
                        <span className="font-bold text-surface-900">{service.name_farsi}</span>
                        <span className="text-xs text-gray-400 mr-2">({service.slug})</span>
                    </div>
                    <span className="text-primary-500 text-sm">مشاهده ←</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-400 text-sm">
              موردی یافت نشد.
            </div>
          )}
        </div>
      )}
    </div>
  );
}