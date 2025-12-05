"use client";

import { deleteLink } from "@/app/dashboard/actions";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteButton({ linkId }: { linkId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Simple confirmation
    if (!confirm("آیا از حذف این لینک مطمئن هستید؟")) return;

    setIsDeleting(true);
    const result = await deleteLink(linkId);

    if (result?.error) {
      toast.error(result.error);
      setIsDeleting(false);
    } else {
      toast.success("لینک با موفقیت حذف شد.");
      // No need to set false, the page will refresh and this component will disappear
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
      title="حذف لینک"
    >
      {isDeleting ? (
        <span className="loading loading-spinner loading-xs">...</span>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
    </button>
  );
}