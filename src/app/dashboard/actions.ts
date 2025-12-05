"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // Crucial for trackClick

// --- 1. SUBMIT LINK ACTION ---
export async function submitLink(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const service_id = formData.get("service_id") as string;
  const referral_url = formData.get("referral_url") as string;
  const bonus_description = formData.get("bonus_description") as string;

  // --- Security Shield ---
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
  // ----------------------

  const { error } = await supabase.from("links").insert({
    user_id: user.id,
    service_id: service_id,
    referral_url: referral_url,
    bonus_description: bonus_description,
    is_active: true,
  });

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

  // Only count if shield allows it
  if (!error) {
      await supabase.rpc('increment_click', { row_id: linkId });
  } else {
      console.log("Duplicate click filtered.");
  }
}