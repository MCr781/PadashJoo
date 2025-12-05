import Skeleton from "@/components/Skeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-surface-50">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center flex flex-col items-center">
            {/* Back Button */}
            <Skeleton className="h-4 w-24 mb-4" />
            {/* Title */}
            <Skeleton className="h-12 w-64 mb-2" />
            {/* Subtitle */}
            <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-6">
          {/* Article Card Skeletons */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-surface-200 shadow-sm">
                <Skeleton className="h-8 w-3/4 mb-3" /> {/* Title */}
                <Skeleton className="h-3 w-24 mb-4" />  {/* Date */}
                <div className="space-y-2 mb-6">        {/* Content Preview */}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-4 w-24" />       {/* Read More */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}