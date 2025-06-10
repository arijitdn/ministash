"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const CTA = () => {
  const router = useRouter();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust MiniStash with their files. Start
          your free account today.
        </p>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-lg px-8 cursor-pointer"
          onClick={() => router.push("/auth/signin")}
        >
          Start Free Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
