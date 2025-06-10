"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const LoadingProfile = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full bg-background" />
          <Skeleton className="h-6 w-24 bg-background" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full bg-background" />
          <Skeleton className="h-8 w-20 bg-background" />
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-[320px] p-6 border-r border-zinc-800">
          <div className="flex flex-col items-center mb-6">
            <Skeleton className="h-20 w-20 rounded-full bg-background mb-4" />
            <Skeleton className="h-6 w-40 bg-background mb-2" />
            <Skeleton className="h-4 w-48 bg-background mb-3" />
            <Skeleton className="h-8 w-24 rounded-md bg-zinc-700" />
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-zinc-700" />
              <Skeleton className="h-5 w-20 bg-zinc-700" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-zinc-700" />
              <Skeleton className="h-5 w-32 bg-zinc-700" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-zinc-700" />
              <Skeleton className="h-5 w-16 bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-zinc-800 pb-2">
            <Skeleton className="h-6 w-20 bg-zinc-700" />
            <Skeleton className="h-6 w-20 bg-zinc-700" />
            <Skeleton className="h-6 w-24 bg-zinc-700" />
          </div>

          {/* Storage Usage */}
          <div className="mb-8 bg-zinc-800/50 rounded-lg p-6">
            <Skeleton className="h-6 w-32 bg-background mb-2" />
            <Skeleton className="h-4 w-48 bg-background mb-4" />

            <div className="flex justify-between mb-2">
              <Skeleton className="h-4 w-16 bg-zinc-700" />
              <Skeleton className="h-4 w-16 bg-zinc-700" />
            </div>
            <Skeleton className="h-2 w-full bg-background mb-6" />

            <div className="flex justify-between mb-2">
              <Skeleton className="h-4 w-12 bg-zinc-700" />
              <Skeleton className="h-4 w-12 bg-zinc-700" />
            </div>
            <Skeleton className="h-2 w-full bg-zinc-700" />
          </div>

          {/* Current Plan */}
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <Skeleton className="h-6 w-28 bg-background mb-2" />
            <Skeleton className="h-4 w-56 bg-background mb-6" />

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 bg-zinc-700" />
                <Skeleton className="h-6 w-24 bg-zinc-700" />
              </div>
              <Skeleton className="h-10 w-28 rounded-md bg-zinc-700" />
            </div>

            <Skeleton className="h-4 w-32 bg-background mb-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full bg-zinc-700" />
                <Skeleton className="h-4 w-32 bg-zinc-700" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full bg-zinc-700" />
                <Skeleton className="h-4 w-24 bg-zinc-700" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full bg-zinc-700" />
                <Skeleton className="h-4 w-40 bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
