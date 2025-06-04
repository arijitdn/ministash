import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  const reqUserId = session?.user?.id;

  const user = await db.user.findFirst({
    where: {
      userId: reqUserId,
    },
  });

  if (!user) {
    return NextResponse.json({
      found: false,
    });
  } else {
    return NextResponse.json({
      found: true,
    });
  }
}
