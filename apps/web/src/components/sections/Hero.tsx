"use client";

import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
          Secure File Storage
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Store, Share & Secure Your Files
        </h1>
        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          MiniStash provides secure file storage with seamless sharing
          capabilities. Upload, organize, and access your files from anywhere in
          the world with file browser or our own SDK.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-lg px-8 cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Start Free Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 text-white hover:bg-zinc-800 text-lg px-8 cursor-pointer"
            onClick={() => toast("Coming soon!")}
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
