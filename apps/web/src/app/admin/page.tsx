import AdminPanel from "@/components/sections/admin/AdminPanel";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user;

  if (!user || !session || !user.email) {
    return notFound();
  }

  const isAdmin = await db.user.findFirst({
    where: {
      email: user.email,
      role: "ADMIN",
    },
  });

  if (!isAdmin) {
    return notFound();
  }

  const users = await db.user.findMany();
  const sessions = await db.session.findMany();

  return <AdminPanel users={users} sessions={sessions} />;
}
