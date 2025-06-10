import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({
      found: false,
      error: "No session",
    });
  }

  const sessionId = session?.sessionId;

  const validSession = await db.session.findFirst({
    where: {
      sessionId,
    },
  });

  if (!validSession) {
    return NextResponse.json({
      found: false,
    });
  } else {
    return NextResponse.json({
      found: true,
    });
  }
}
