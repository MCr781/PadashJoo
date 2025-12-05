import { createClient } from "@/utils/supabase/server";
import SubmitForm from "@/components/SubmitForm";

export default async function SubmitPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("id, name_farsi").order("name_farsi");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-surface-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl border border-surface-200 shadow-xl">
        <h1 className="text-2xl font-black mb-6 text-surface-900">ثبت لینک جدید</h1>
        
        {/* We pass the data to the Client Component */}
        <SubmitForm services={services || []} />
        
      </div>
    </main>
  );
}