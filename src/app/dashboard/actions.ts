"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Note: We added 'prevState' as the first argument because useActionState sends it automatically
export async function submitLink(prevState: any, formData: FormData) {
  const supabase = await createClient();

  // 1. Check Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // If somehow a non-logged-in user submits, redirect them
    redirect("/login");
  }

  // 2. Get Data
  const service_id = formData.get("service_id") as string;
  const referral_url = formData.get("referral_url") as string;
  const bonus_description = formData.get("bonus_description") as string;

  // --- 🛡️ SECURITY SHIELD START ---
  
  // Rule A: Length Check
  if (!referral_url || referral_url.length > 200) {
      return { error: "لینک معتبر نیست یا خالی است." };
  }

  // Rule B: HTTPS Check (Crucial for security)
  if (!referral_url.startsWith("https://")) {
      return { error: "فقط لینک‌های امن (https) مجاز هستند." };
  }

  // Rule C: Structure Check
  try {
      new URL(referral_url);
  } catch (e) {
      return { error: "لطفاً یک آدرس معتبر وارد کنید." };
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
            return { error: "شما قبلاً برای این سرویس لینک ثبت کرده‌اید! به داشبورد مراجعه کنید." };
        }
        if (error.message.includes('unique_referral_url')) {
            return { error: "این لینک قبلاً توسط کاربر دیگری ثبت شده است." };
        }
    }
    
    // Generic Error
    console.log("Error submitting link:", error);
    return { error: "Database Error: Failed to submit link." };
  }

  // 5. Success
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteLink(linkId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  // Delete the link ONLY if it belongs to this user
  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", user.id); // Security check

  if (error) {
    console.error("Delete error:", error);
    return { error: "Failed to delete link." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function trackClick(linkId: string) {
  const supabase = await createClient();
  
  // 1. Generate Fingerprint (IP + User Agent)
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for") || "unknown";
  const userAgent = headerStore.get("user-agent") || "unknown";
  const clickerIdentifier = `${ip}-${userAgent}`;

  // 2. Try to record the click in the "Shield" table
  const { error } = await supabase
    .from("link_clicks")
    .insert({
        link_id: linkId,
        clicker_identifier: clickerIdentifier
    });

  // 3. ONLY if the shield lets it through (no error), count it!
  if (!error) {
      await supabase.rpc('increment_click', { row_id: linkId });
  } else {
      console.log("Duplicate click filtered.");
  }
}