"use client";

import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
// I'm using your fixed path here!
import { voteLink } from "@/app/vote_actions"; 
import { trackClick } from "@/app/dashboard/actions";
import { useReliableTrack } from "@/hooks/useReliableTrack";

export default function LinkRotator({ serviceSlug }: { serviceSlug: string }) {
  const trackLink = useReliableTrack();
  const [link, setLink] = useState<{ id: string; url: string; desc: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voted, setVoted] = useState(false);
  
  // NEW STATE: Tracks if they actually opened the link
  const [linkClicked, setLinkClicked] = useState(false);

  const handleGetLink = async () => {
    setLoading(true);
    setError("");
    const supabase = createClient();
    
    const { data, error } = await supabase.rpc("get_random_link", {
      service_slug_input: serviceSlug,
    });

    if (error) {
      console.error(error);
      setError("Error finding a link.");
    } else if (data && data.length > 0) {
      setLink({ 
          id: data[0].link_id, 
          url: data[0].referral_url, 
          desc: data[0].bonus_description 
      });
    } else {
      setError("No links available yet!");
    }
    setLoading(false);
  };

  const handleVote = async (isUp: boolean) => {
    if (!link) return;
    setVoted(true);
    
    // Show immediate feedback
    if (isUp) {
        toast.success("Thanks! We boosted this link's score. 🎉");
    } else {
        toast.error("Thanks for reporting. We will check this link.");
    }

    await voteLink(link.id, isUp);
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {!link ? (
        <button
          onClick={handleGetLink}
          disabled={loading}
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {loading ? "Rotating..." : "Get Link"}
        </button>
      ) : (
        <div className="flex flex-col items-end animate-in fade-in zoom-in duration-300">
            <div className="text-green-400 font-bold mb-1">{link.desc}</div>
            
            <div className="flex flex-col items-end gap-2">
                <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                        setLinkClicked(true);
                        trackLink(link.id);
                    }}
                    // Changed back to Emerald Green (The "Money" Color)
                    className="px-6 py-2 bg-action-500 text-white font-bold rounded-xl hover:bg-action-600 transition shadow-lg shadow-action-500/20"
                >
                    دریافت پاداش ↗
                </a>
                
                {/* Voting Buttons - Only show AFTER clicking the link */}
                {linkClicked && !voted && (
                    <div className="flex gap-2 animate-in slide-in-from-top-2 duration-300">
                        <span className="text-xs text-gray-400 self-center">Did it work?</span>
                        <button 
                            onClick={() => handleVote(true)}
                            className="p-2 bg-gray-700 rounded hover:bg-green-800 text-lg transition"
                            title="It worked"
                        >
                            👍
                        </button>
                        <button 
                             onClick={() => handleVote(false)}
                             className="p-2 bg-gray-700 rounded hover:bg-red-800 text-lg transition"
                             title="Broken/Fake"
                        >
                            👎
                        </button>
                    </div>
                )}
                 {voted && <span className="text-gray-500 text-xs">Thanks for voting!</span>}
            </div>
        </div>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}