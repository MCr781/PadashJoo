"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// --- HELPER: Check if a link is alive ---
async function checkLinkHealth(url: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(url, {
      method: 'HEAD', // Just check headers, don't download the whole page
      signal: controller.signal,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (compatible; PadashJooBot/1.0)' 
      }
    });
    
    clearTimeout(timeoutId);
    // Returns true if status is 200-299 (OK)
    return response.ok; 
  } catch (error) {
    console.error("Link health check failed:", error);
    return false; // Assume broken if fetch fails
  }
}

// --- 1. SUBMIT LINK ACTION ---
export async function submitLink(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // 1. Check Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // 2. Get Data
  const service_id = formData.get("service_id") as string;
  const referral_url = formData.get("referral_url") as string;
  const bonus_description = formData.get("bonus_description") as string;

  // --- 🛡️ SECURITY SHIELD START ---
  
  // Rule A: Syntax Checks
  if (!referral_url || referral_url.length > 200) {
      return { error: "لینک معتبر نیست یا خالی است.", success: false };
  }
  if (!referral_url.startsWith("https://")) {
      return { error: "فقط لینک‌های امن (https) مجاز هستند.", success: false };
  }
  try {
      new URL(referral_url);
  } catch (e) {
      return { error: "لطفاً یک آدرس معتبر وارد کنید.", success: false };
  }

  // Rule B: Real-World Health Check (The "Guard Dog")
  const isAlive = await checkLinkHealth(referral_url);
  if (!isAlive) {
      return { error: "این لینک در دسترس نیست یا خراب است. لطفاً لینک سالم وارد کنید.", success: false };
  }
  // --- 🛡️ SECURITY SHIELD END ---

  // 3. Database Insertion
  const { error } = await supabase.from("links").insert({
    user_id: user.id,
    service_id: service_id,
    referral_url: referral_url,
    bonus_description: bonus_description,
    is_active: true,
  });

  // 4. Handle Specific Database Errors
  if (error) {
    // Postgres Error 23505 = Unique Violation (Duplicate Data)
    if (error.code === '23505') { 
        if (error.message.includes('unique_user_per_service')) {
            return { error: "شما قبلاً برای این سرویس لینک ثبت کرده‌اید! به داشبورد مراجعه کنید.", success: false };
        }
        if (error.message.includes('unique_referral_url')) {
            return { error: "این لینک قبلاً توسط کاربر دیگری ثبت شده است.", success: false };
        }
    }
    
    // Generic Error
    console.log("Error submitting link:", error);
    return { error: "خطا در ثبت لینک.", success: false };
  }

  // 5. Success
  revalidatePath("/dashboard");
  return { error: "", success: true };
}

// --- 2. DELETE LINK ACTION ---
export async function deleteLink(linkId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Delete error:", error);
    return { error: "Failed to delete link." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

// --- 3. TRACK CLICK ACTION ---
export async function trackClick(linkId: string) {
  const supabase = await createClient();
  
  // Generate Fingerprint
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for") || "unknown";
  const userAgent = headerStore.get("user-agent") || "unknown";
  const clickerIdentifier = `${ip}-${userAgent}`;

  // Try to record in Shield table
  const { error } = await supabase
    .from("link_clicks")
    .insert({
        link_id: linkId,
        clicker_identifier: clickerIdentifier
    });

  // Only count if shield allows it (Unique click)
  if (!error) {
      await supabase.rpc('increment_click', { row_id: linkId });
  } else {
      console.log("Duplicate click filtered.");
  }
}