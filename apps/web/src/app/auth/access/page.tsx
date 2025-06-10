import { Button } from "@/components/ui/button";
import { signOutAndRedirect } from "@/actions/signOutandRedirect";
import { auth, signIn } from "@/lib/auth";
import { db } from "@repo/db";
import { ShieldUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MagicAccess({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;

  if (!token) {
    return notFound();
  }

  const data = await db.oAuthToken.findFirst({
    where: {
      token,
    },
  });

  if (!data) {
    return notFound();
  }

  const oAuthUser = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!oAuthUser) {
    return notFound();
  }

  const currentSession = await auth();

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
              <ShieldUser className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold mb-3">{oAuthUser.name}</h1>
        <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
          You are about to access your account with{" "}
          <span className="font-bold">{oAuthUser.email}</span>. Please confirm
          your access to continue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {currentSession ? (
            <form
              action={async () => {
                "use server";
                await signOutAndRedirect(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/auth/access?token=${token}`
                );
              }}
            >
              <Button className="bg-red-700 hover:bg-red-800 cursor-pointer">
                Sign Out First
              </Button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("credentials", {
                  oauth: token,
                  redirectTo: "/profile",
                });
              }}
            >
              <Button className="bg-orange-700 hover:bg-orange-800 flex items-center gap-2 cursor-pointer">
                Gain Access
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
