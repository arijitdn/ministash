export default function DashboardLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        {/* Logo Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full animate-pulse" />
          <div className="w-32 h-8 bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Header Actions Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-700 rounded-full animate-pulse" />
          <div className="w-20 h-9 bg-gray-700 rounded-md animate-pulse" />
          <div className="w-20 h-9 bg-primary rounded-md animate-pulse" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-6">
        {/* File Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {/* File Card Skeletons */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              {/* Private Tag Skeleton */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <div className="w-16 h-6 bg-primary rounded-full animate-pulse" />
                </div>

                {/* File Preview Area Skeleton */}
                <div className="aspect-square bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded animate-pulse" />
                </div>
              </div>

              {/* File Info Section */}
              <div className="p-4">
                {/* File Name Skeleton */}
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse mb-4" />

                {/* Action Buttons Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
                    <div className="w-20 h-6 bg-gray-300 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-red-400 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Left Navigation Icon Skeleton */}
      <div className="fixed bottom-6 left-6">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
      </div>

      {/* Additional floating skeleton elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-700 rounded-full animate-pulse opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gray-600 rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-gray-700 rounded-full animate-pulse opacity-10" />
    </div>
  );
}
