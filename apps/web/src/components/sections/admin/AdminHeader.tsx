import { Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/icon.svg"
                alt="MiniStash Logo"
                width={40}
                height={40}
                className="relative z-10"
              />
            </div>
            <div>
              <h1 className="lg:text-xl text-sm font-bold text-white">
                MiniStash Admin
              </h1>
              <p className="hidden md:block text-xs text-gray-400">
                System Control Panel
              </p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-gray-300 text-sm">Admin Access</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
