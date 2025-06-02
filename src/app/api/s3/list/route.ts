import { redis } from "@/lib/redis";
import { refreshS3Cache } from "@/lib/refresh-s3-cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get("refresh") === "true";

  const cacheKey = "s3:documents";

  try {
    if (!forceRefresh) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const documents = await refreshS3Cache();
    return NextResponse.json({ documents: documents });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to list documents" },
      { status: 500 }
    );
  }
}
