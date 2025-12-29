"use client";

import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { voteLink } from "@/app/vote_actions"; 
import { useReliableTrack } from "@/hooks/useReliableTrack";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// تعریف تایپ دقیق برای دیتای دریافتی
type LinkData = {
  id: string;
  url: string;
  desc: string;
  serviceName: string;
  isRecommendation: boolean;
};

export default function LinkRotator({ serviceSlug }: { serviceSlug: string }) {
  const trackLink = useReliableTrack();
  // آپدیت استیت برای نگهداری آبجکت کامل
  const [link, setLink] = useState<LinkData | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voted, setVoted] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const [visitorId, setVisitorId] = useState<string>("");

  useEffect(() => {
    const setFp = async () => {
      try {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        setVisitorId(visitorId);
      } catch (e) { console.error(e); }
    };
    setFp();
  }, []);

  const handleGetLink = async () => {
    setLoading(true);
    setError("");
    const supabase = createClient();
    
    // فراخوانی نسخه جدید تابع SQL
    const { data, error } = await supabase.rpc("get_random_link_v2", {
      service_slug_input: serviceSlug,
      user_identifier_input: visitorId 
    });

    if (error) {
      console.error(error); 
      setError("Error finding a link.");
    } else if (data && data.length > 0) {
      const result = data[0];
      
      setLink({ 
          id: result.id, 
          url: result.referral_url, 
          desc: result.bonus_description,
          // فیلدهای جدید
          serviceName: result.service_name,
          isRecommendation: result.is_recommendation
      });
      
      setVoted(false);
      setLinkClicked(false);
      
      // اگر لینک پیشنهادی بود، یک Toast هم بدهیم بد نیست
      if (result.is_recommendation) {
        toast("لینک‌های این بخش تمام شد. این یک پیشنهاد از بخش‌های دیگر است!", {
            icon: '💡',
            duration: 4000
        });
      }

    } else {
      // این یعنی کل دیتابیس را شخم زدیم و هیچ لینکی نمانده!
      setError("شگفت‌انگیز است! شما تمام لینک‌های فعال کل سایت را دیده‌اید. فردا سر بزنید.");
    }
    setLoading(false);
  };

  const handleVote = async (isUp: boolean) => {
    if (!link) return;
    if (!visitorId) { toast.error("Wait for ID..."); return; }

    const result = await voteLink(link.id, isUp, visitorId);
    
    if (result.success) {
        setVoted(true);
        if (isUp) toast.success("نظر شما ثبت شد! 🎉");
        else toast.error("گزارش خرابی ثبت شد.");
    } else {
        toast.error(result.message || "خطا در ثبت رای");
    }
  };

  return (
    <div className="flex flex-col items-end gap-2 w-full">
      {!link ? (
        <button
          onClick={handleGetLink}
          disabled={loading}
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {loading ? "در حال جستجو..." : "دریافت لینک شانسی"}
        </button>
      ) : (
        <div className="flex flex-col items-end animate-in fade-in zoom-in duration-300 w-full">
            
            {/* 💡 بخش جدید: نمایش بنر اگر لینک پیشنهادی است */}
            {link.isRecommendation && (
                <div className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full mb-2 border border-blue-100 flex items-center gap-1">
                    <span>💡 پیشنهاد از سرویس <b>{link.serviceName}</b></span>
                </div>
            )}

            <div className="text-green-500 font-bold mb-1 text-right" dir="rtl">
                {link.desc}
            </div>
            
            <div className="flex flex-col items-end gap-2">
                <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                        setLinkClicked(true);
                        trackLink(link.id);
                    }}
                    className={`px-6 py-2 font-bold rounded-xl text-white transition shadow-lg flex items-center gap-2
                        ${link.isRecommendation ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 'bg-action-500 hover:bg-action-600 shadow-action-500/20'}
                    `}
                >
                    {link.isRecommendation ? `دریافت پاداش (${link.serviceName})` : 'دریافت پاداش'} ↗
                </a>
                
                {linkClicked && !voted && (
                    <div className="flex gap-2 animate-in slide-in-from-top-2 duration-300">
                        <span className="text-xs text-gray-400 self-center">سالم بود؟</span>
                        <button onClick={() => handleVote(true)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-green-100 dark:hover:bg-green-900 text-lg transition">👍</button>
                        <button onClick={() => handleVote(false)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-red-100 dark:hover:bg-red-900 text-lg transition">👎</button>
                    </div>
                )}
                 {voted && <span className="text-gray-400 text-xs">ممنون بابت نظر شما!</span>}
            </div>
            
            {/* دکمه دریافت لینک بعدی (برای راحتی کاربر) */}
            <button 
                onClick={handleGetLink}
                className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
            >
                شانس بعدی ↻
            </button>
        </div>
      )}
      {error && <p className="text-red-400 text-sm bg-red-50 p-2 rounded">{error}</p>}
    </div>
  );
}