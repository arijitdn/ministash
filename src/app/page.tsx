import { SideIcons } from "@/components/SideIcons";
import { Uploader } from "@/components/web/Uploader";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { plans } from "@/lib/plans";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) redirect("/api/auth/signin");

  const userData = await db.billing.findFirst({
    where: {
      email: session.user.email!,
    },
  });
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/s3/usage`, {
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
  });
  const { totalUsageMB, totalFiles } = await res.json();
  const maxFilesAllowedAtATime = plans[userData?.plan ?? "FREE"].uploadLimit;
  const maxFilesAllowed = plans[userData?.plan ?? "FREE"].filesLimit;

  return (
    <>
      <SideIcons />
      <div className="max-w-2xl mx-auto flex min-h-screen flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold pb-10 flex items-center gap-4">
          <Image
            src="/icon.svg"
            alt="MiniStash"
            className="object-contain w-20"
            height={1000}
            width={1000}
          />
          MiniStash
        </h1>
        <Uploader
          userId={userData?.userId ?? session.user.id ?? ""}
          maxLimit={maxFilesAllowed}
          maxFilesUploadLimit={maxFilesAllowedAtATime}
          currentPlan={userData?.plan ?? "FREE"}
          currentUsedFiles={totalFiles}
          currentUsedStorage={totalUsageMB}
        />
      </div>
    </>
  );
}
