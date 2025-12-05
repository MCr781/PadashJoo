"use client";

import { useActionState } from "react"; // 1. Import from 'react', NOT 'react-dom'
import { useEffect } from "react";
import { toast } from "sonner";
import { submitLink } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState = {
  error: "",
  success: false
};

export default function SubmitForm({ services }: { services: any[] }) {
  // 2. Use the correct hook name: useActionState
  // Note: We are ignoring the 3rd return value (isPending) for now to avoid TS errors
  const [state, formAction] = useActionState(submitLink, initialState);
  const router = useRouter();

  // Watch for changes in state (Success or Error)
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success("Link submitted successfully! 🎉");
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">انتخاب سرویس</label>
        <select 
          name="service_id" 
          required
          className="p-3 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-surface-900 transition"
        >
          <option value="">-- انتخاب کنید --</option>
          {services?.map((service) => (
            <option key={service.id} value={service.id}>{service.name_farsi}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">لینک معرف شما</label>
        <input 
          name="referral_url" 
          type="url"
          placeholder="https://..." 
          required
          className="p-3 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-surface-900 transition text-left"
          dir="ltr"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700 text-sm">توضیحات پاداش (کوتاه)</label>
        <input 
          name="bonus_description" 
          type="text"
          placeholder="مثال: ۵۰ هزار تومان اعتبار رایگان" 
          required
          maxLength={50}
          className="p-3 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-surface-900 transition"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <Link 
          href="/dashboard"
          className="w-1/3 py-3 text-center border border-surface-200 bg-white text-gray-600 font-bold rounded-xl hover:bg-surface-50 transition"
        >
          انصراف
        </Link>
        <button 
          type="submit"
          className="w-2/3 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-600/20"
        >
          ثبت لینک
        </button>
      </div>

    </form>
  );
}