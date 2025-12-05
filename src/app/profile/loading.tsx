import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-surface-50">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="mb-8">
             <Skeleton className="h-4 w-32 mb-4" />
             <Skeleton className="h-10 w-48" />
        </div>

        {/* Identity Card */}
        <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="text-center md:text-right flex-1 w-full">
                <Skeleton className="h-6 w-48 mb-2 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
                <Skeleton className="h-8 w-40 mt-4 rounded-full mx-auto md:mx-0" />
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
        </div>

        {/* Security Section */}
        <Skeleton className="h-32 rounded-2xl" />

      </div>
    </main>
  );
}