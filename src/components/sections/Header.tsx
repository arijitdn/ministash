"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="MiniStash"
            height={1000}
            width={1000}
            className="w-8 h-8"
          />
          <span className="text-xl font-bold">MiniStash</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            About
          </a>
          <Button
            variant="outline"
            className="border-zinc-700 text-white hover:bg-zinc-800 cursor-pointer"
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};
