"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  
  if (!referral_url || referral_url.length > 200) {
      return { error: "Link is too long or empty.", success: false };
  }

  if (!referral_url.startsWith("https://")) {
      return { error: "Only secure (https://) links are allowed.", success: false };
  }

  try {
      new URL(referral_url);
  } catch (e) {
      return { error: "Please enter a valid URL.", success: false };
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
    if (error.code === '23505') { 
        if (error.message.includes('unique_user_per_service')) {
            return { error: "You already have a link for this service! Check your dashboard.", success: false };
        }
        if (error.message.includes('unique_referral_url')) {
            return { error: "This link is already registered by another user.", success: false };
        }
    }
    
    console.log("Error submitting link:", error);
    return { error: "Database Error: Failed to submit link.", success: false };
  }

  // 5. Success
  revalidatePath("/dashboard");
  return { error: "", success: true };
}