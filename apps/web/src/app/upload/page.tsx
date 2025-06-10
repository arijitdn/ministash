import { SideIcons } from "@/components/SideIcons";
import { Uploader } from "@/components/web/Uploader";
import { auth } from "@/lib/auth";
import { db } from "@repo/db";
import { plans } from "@/lib/plans";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  const userData = await db.user.findFirst({
    where: {
      email: session!.user?.email!,
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
  const maxFilesAllowedAtATime =
    userData?.plan === "CUSTOM"
      ? userData.fileUploadLimit === -1
        ? -1
        : userData.fileUploadLimit
      : plans[userData?.plan ?? "FREE"].uploadLimit;

  const maxFilesAllowed =
    userData?.plan === "CUSTOM"
      ? userData.filesLimit === -1
        ? -1
        : userData.filesLimit
      : plans[userData?.plan ?? "FREE"].filesLimit;

  const storageLimitInBytes =
    userData?.plan === "CUSTOM"
      ? userData.storageLimit === -1
        ? -1
        : userData.storageLimit * 1024 * 1024
      : plans[userData?.plan ?? "FREE"].storageLimit * 1024 * 1024;

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
          userId={userData?.userId ?? session!.user?.id ?? ""}
          maxLimit={maxFilesAllowed}
          maxFilesUploadLimit={maxFilesAllowedAtATime}
          currentUsedFiles={totalFiles}
          currentUsedStorage={totalUsageMB}
          storageLimitInBytes={storageLimitInBytes}
        />
      </div>
    </>
  );
}
