import Hero from "@/components/Hero";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-surface-50">
      
      {/* We keep the Hero visible so the layout doesn't jump! */}
      <Hero />

      <div className="flex flex-col items-center justify-center p-8 md:p-24">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-48 mb-12" />

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Skeletons - Showing 4 fake cards */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-surface-200 shadow-sm flex justify-between items-center">
              <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}