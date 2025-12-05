"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function voteLink(linkId: string, isUpvote: boolean) {
  const supabase = await createClient();
  
  // 1. Generate the "Fingerprint"
  // We combine IP address + User Agent to make a unique ID for this user.
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for") || "unknown";
  const userAgent = headerStore.get("user-agent") || "unknown";
  
  // This string (e.g. "192.168.1.1-Chrome") identifies the voter
  const voterIdentifier = `${ip}-${userAgent}`;

  // 2. Try to record the vote in our new "Shield" table
  // If this person voted before, Supabase will throw an error automatically.
  const { error: voteError } = await supabase
    .from("link_votes")
    .insert({
        link_id: linkId,
        voter_identifier: voterIdentifier,
        is_upvote: isUpvote
    });

  // 3. IF (and only if) the shield let it through, update the main count
  if (!voteError) {
      if (isUpvote) {
        await supabase.rpc('increment_vote', { row_id: linkId, is_upvote: true });
      } else {
        await supabase.rpc('increment_vote', { row_id: linkId, is_upvote: false });
      }
      
      // Refresh the page data
      revalidatePath("/");
      return { success: true };
  } else {
      console.log("Duplicate vote blocked by Shield.");
      return { success: false, message: "You have already voted on this link!" };
  }
}