import { Button } from "@/components/ui/button";
import { db } from "@repo/db";
import { Check, LogIn, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function VerifyEmailAddress({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;

  if (!token) {
    return notFound();
  }

  const user = await db.user.findFirst({
    where: {
      verificationToken: token,
    },
  });

  if (!user) {
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
                <X className="h-12 w-12 text-red-500" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold mb-3">Invalid Token</h1>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            Sorry, we couldn't verify the token provided. Please recheck if you
            have opened the correct link.
          </p>

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

  const verified = await db.user.update({
    where: {
      verificationToken: token,
    },
    data: {
      verified: true,
      verificationToken: null,
    },
  });

  if (verified) {
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

          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-zinc-800/70 flex items-center justify-center">
                <Check className="h-12 w-12 text-green-500" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold mb-3">Email Address Verified</h1>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            Congratulations, your email address{" "}
            <span className="font-bold">{user.email}</span> has been verified
            successfully. Now you can proceed to login.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/signin">
              <Button className="bg-orange-700 hover:bg-orange-800 flex items-center gap-2 cursor-pointer">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
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
}
