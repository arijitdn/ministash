import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/S3Client";
import { redis } from "@/lib/redis";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const key = body.key;

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid object key." },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });

    await S3.send(command);

    // 2. Remove from Redis
    const cacheKey = "s3:documents";
    const cached = await redis.get<{ documents: any[] }>(cacheKey);

    if (cached && Array.isArray(cached.documents)) {
      const updatedDocuments = cached.documents.filter(
        (doc) => doc.key !== key
      );
      await redis.set(cacheKey, { documents: updatedDocuments }, { ex: 3600 });
    }

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete file." },
      { status: 500 }
    );
  }
}
