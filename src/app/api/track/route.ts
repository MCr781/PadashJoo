import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { linkId } = await req.json();
  
  if (!linkId) return NextResponse.json({ error: "No Link ID" }, { status: 400 });

  const supabase = await createClient();
  
  // استخراج اطلاعات کاربر برای فینگرپرینت (ساده)
  // در فاز بعد این را با FingerprintJS جایگزین می‌کنیم
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const clickerIdentifier = `${ip}-${userAgent}`;

  // ثبت در جدول Shield (بدون منتظر ماندن برای نتیجه نهایی برای سرعت بالا)
  // Fire and Forget Logic
  const { error } = await supabase
    .from("link_clicks")
    .insert({
        link_id: linkId,
        clicker_identifier: clickerIdentifier
    });

  if (!error) {
    // فقط اگر کلیک تکراری نبود، شمارنده اصلی را بالا ببر
    await supabase.rpc('increment_click', { row_id: linkId });
  }

  return NextResponse.json({ success: true });
}