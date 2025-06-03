import { FileBrowser } from "@/components/sections/FileBrowser";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Files() {
  const session = await auth();

  const user = await db.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user || !user.userId) {
    redirect("/auth/error");
  }

  return <FileBrowser />;
}
