"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX, LogOut } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Error() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <Image
            src="/icon.svg"
            alt="MiniStash"
            height={1000}
            width={1000}
            className="h-10 w-10"
          />
          <span className="text-2xl font-bold">MiniStash</span>
        </Link>

        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-zinc-800/70 flex items-center justify-center">
              <FileX className="h-12 w-12 text-red-500" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold">500</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold mb-3">Internal Server Error</h1>
        <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
          Due to a technical issue, an internal server error has occured. Please
          signout and re-login to fix this issue!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-zinc-500">
          Need help?{" "}
          <Link href="/support" className="text-red-400 hover:text-red-300">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
