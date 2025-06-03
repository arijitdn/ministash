import { redis } from "@/lib/redis";
import { refreshS3Cache } from "@/lib/actions/refreshS3Cache";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userData = await db.user.findFirst({
    where: {
      email: session.user.email ?? "",
    },
  });

  if (!userData) {
    return NextResponse.json(
      { error: "Please re-login to fix this issue" },
      { status: 401 }
    );
  }

  const userId = userData.userId;

  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get("refresh") === "true";

  const cacheKey = `s3:documents:${userId}`;

  try {
    if (!forceRefresh) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const documents = await refreshS3Cache(userId);
    return NextResponse.json({ documents: documents });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to list documents" },
      { status: 500 }
    );
  }
}
