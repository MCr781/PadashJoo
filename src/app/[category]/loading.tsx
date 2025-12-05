import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-surface-50">
      <div className="w-full max-w-3xl">
        {/* Back Button Skeleton */}
        <Skeleton className="h-6 w-32 mb-8" />

        {/* Title Skeleton */}
        <Skeleton className="h-12 w-64 mb-8" />

        <div className="grid gap-6">
          {/* Service Card Skeletons - 3 fake rows */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl border border-surface-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Logo Box */}
                <Skeleton className="w-16 h-16 rounded-xl" />
                
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              {/* Button Skeleton */}
              <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}