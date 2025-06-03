export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background text-white relative">
      {/* Top Navigation Skeleton */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-700 rounded-full animate-pulse" />
        <div className="w-12 h-4 bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Bottom Left Icon Skeleton */}
      <div className="absolute bottom-6 left-6">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo Section Skeleton */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-primary rounded-full animate-pulse" />
          <div className="w-32 h-8 bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Upload Area Skeleton */}
        <div className="w-full max-w-2xl">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-16 text-center animate-pulse">
            {/* Upload Text Skeleton */}
            <div className="space-y-4 mb-6">
              <div className="w-80 h-5 bg-gray-700 rounded mx-auto animate-pulse" />
            </div>

            {/* Button Skeleton */}
            <div className="w-32 h-11 bg-primary rounded-md mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Additional skeleton elements for a more dynamic feel */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-gray-700 rounded-full animate-pulse opacity-30" />
      <div className="absolute top-1/3 right-12 w-1 h-1 bg-gray-600 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-1/4 right-8 w-3 h-3 bg-gray-700 rounded-full animate-pulse opacity-20" />
    </div>
  );
}
