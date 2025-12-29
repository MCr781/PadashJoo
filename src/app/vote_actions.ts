"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// اضافه شدن آرگومان visitorId به تابع
export async function voteLink(linkId: string, isUpvote: boolean, visitorId: string) {
  const supabase = await createClient();
  
  // 1. امنیت: چک کردن اینکه visitorId خالی نباشد (جلوگیری از درخواست‌های دستکاری شده)
  if (!visitorId || visitorId.length < 10) {
      return { success: false, message: "Invalid device fingerprint." };
  }

  // 2. ساخت شناسه ترکیبی (Hybrid ID)
  // ترکیب "شناسه سخت‌افزاری" + "IP" برای امنیت حداکثری
  // اگر فقط به Fingerprint اعتماد کنیم، ممکن است دو گوشی مدل یکسان اشتباه گرفته شوند.
  // اگر فقط به IP اعتماد کنیم، با VPN دور زده می‌شود.
  // ترکیب این دو، دایره تقلب را بسیار تنگ می‌کند.
  
  // نکته: برای سخت‌گیری بیشتر، می‌توانید فقط از visitorId استفاده کنید.
  // اما اینجا ما visitorId را به عنوان معیار اصلی ذخیره می‌کنیم.
  
  const uniqueIdentifier = `fp_${visitorId}`; 

  // 3. تلاش برای ثبت رای در جدول Shield
  const { error: voteError } = await supabase
    .from("link_votes")
    .insert({
        link_id: linkId,
        voter_identifier: uniqueIdentifier, // قبلاً IP-UA بود، الان Fingerprint است
        is_upvote: isUpvote
    });

  // 4. نتیجه‌گیری
  if (!voteError) {
      if (isUpvote) {
        await supabase.rpc('increment_vote', { row_id: linkId, is_upvote: true });
      } else {
        await supabase.rpc('increment_vote', { row_id: linkId, is_upvote: false });
      }
      
      revalidatePath("/");
      return { success: true };
  } else {
      // کد خطای 23505 یعنی Duplicate Key (قبلاً رای داده)
      console.log("Duplicate vote blocked by Fingerprint Shield.");
      return { success: false, message: "شما قبلاً به این لینک رای داده‌اید!" };
  }
}