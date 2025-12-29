"use client";

import { useCallback } from "react";

export function useReliableTrack() {
  const track = useCallback((linkId: string) => {
    // استفاده از fetch با keepalive
    // این قابلیت باعث می‌شود حتی اگر صفحه بسته شود، مرورگر درخواست را در پس‌زمینه ادامه دهد
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId }),
      keepalive: true, 
    }).catch((err) => console.error("Tracking failed:", err));
  }, []);

  return track;
}