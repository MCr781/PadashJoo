import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-surface-50">
      <div className="w-full max-w-5xl">
        
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            {/* Title */}
            <Skeleton className="h-10 w-48 mb-2" /> 
            {/* Email */}
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-3">
            {/* Buttons */}
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Skeleton className="h-40 rounded-2xl" /> {/* Stat Card */}
            <Skeleton className="h-40 rounded-2xl" /> {/* Add Button */}
        </div>

        {/* Links List Title */}
        <Skeleton className="h-8 w-48 mb-6" />
        
        {/* Links List Skeletons */}
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-surface-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex-1 space-y-2 w-full">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-full max-w-md" />
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32 rounded-xl" />
                        <Skeleton className="h-10 w-10 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}