"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function voteLink(linkId: string, isUpvote: boolean, visitorId: string) {
  const supabase = await createClient();
  
  // 1. چک کردن اینکه آیا کاربر لاگین است؟
  const { data: { user } } = await supabase.auth.getUser();

  // 2. تعیین شناسه نهایی (The Root Identifier)
  let voterIdentifier: string;
  let isRealUser = false;

  if (user) {
    // ✅ اگر لاگین بود: از ID واقعی و غیرقابل تغییر استفاده کن
    voterIdentifier = user.id;
    isRealUser = true;
  } else {
    // 🕵️ اگر مهمان بود: از Fingerprint استفاده کن (Shadow User)
    if (!visitorId || visitorId.length < 5) {
         return { success: false, message: "Invalid device fingerprint." };
    }
    voterIdentifier = `fp_${visitorId}`;
  }

  // 3. ثبت رای در جدول Shield
  // نکته: ما از همان جدول link_votes استفاده می‌کنیم اما حالا شناسه دقیق‌تر است.
  const { error: voteError } = await supabase
    .from("link_votes")
    .insert({
        link_id: linkId,
        voter_identifier: voterIdentifier, 
        is_upvote: isUpvote
        // می‌توانید در آینده یک ستون is_shadow هم اضافه کنید تا رای‌های مهمان را جدا کنید
    });

  if (!voteError) {
      // 4. اعمال تاثیر رای
      // اینجا می‌توانیم لاژیک "Shadow Vote" را اعمال کنیم
      // مثلا: اگر RealUser بود، 3 امتیاز بده، اگر Guest بود 1 امتیاز.
      // فعلا همان استاندارد را می‌رویم:
      
      const rpcName = isUpvote ? 'increment_vote' : 'increment_vote_down'; // فرض کنیم تابع down هم دارید
      
      // اگر rpc شما فقط increment_vote است و boolean می‌گیرد:
      await supabase.rpc('increment_vote', { row_id: linkId, is_upvote: isUpvote });
      
      revalidatePath("/");
      return { success: true };
  } else {
      console.log("Duplicate vote blocked.");
      return { success: false, message: "شما قبلاً به این لینک رای داده‌اید!" };
  }
}